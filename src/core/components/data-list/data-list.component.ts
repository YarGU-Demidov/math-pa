import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChild,
	ContentChildren,
	DoCheck,
	EventEmitter,
	Input,
	IterableDiffer,
	IterableDiffers,
	OnInit,
	Output,
	QueryList,
	TemplateRef
} from '@angular/core';
import { EmptyDirective } from '../../directives/empty-data.directive';
import { FooterDirective } from '../../directives/footer.directive';
import { HeaderDirective } from '../../directives/header.directive';
import { TemplateDirective } from '../../directives/template.directive';
import { DataListProvider } from '../../interfasces/data-list-provider';

@Component({
	selector   : 'core-data-list',
	templateUrl: './data-list.component.html',
	styleUrls  : ['./data-list.component.sass']
})
export class DataListComponent implements OnInit, AfterViewInit, AfterContentInit, DoCheck {
	
	public items: any[] = [];
	public itemsCount: number = 0;
	
	@Input()
	public perPage: number = 10;
	
	@Input()
	public paginatorAllowed: boolean = false;
	
	@Input()
	public lazyLoad: boolean = true;
	
	@Input()
	public dataProvider: DataListProvider<any> = null;
	
	@Output()
	public onPageLoad: EventEmitter<{ offset: number, count: number }> = new EventEmitter();
	
	@ContentChild(HeaderDirective) header;
	
	@ContentChild(FooterDirective) footer;
	
	@ContentChild(EmptyDirective) empty;
	
	@ContentChildren(TemplateDirective) templates: QueryList<any>;
	
	public itemTemplate: TemplateRef<any>;
	
	private differ: IterableDiffer<Object>;
	
	public dataToRender: any[];
	public isLoading: boolean;
	
	public constructor(differs: IterableDiffers) {
		this.differ = differs.find([]).create(null);
	}
	
	public ngOnInit() {
	
	}
	
	public ngAfterContentInit(): void {
		this.templates.forEach((item: TemplateDirective) => {
			this.itemTemplate = item.template;
		});
	}
	
	public ngAfterViewInit(): void {
		this.loadDataOnInit();
	}
	
	public ngDoCheck(): void {
		const changes = this.differ.diff(this.items);
		
		if (changes) {
			this.updateDataToRender(this.items);
		}
	}
	
	private loadDataOnInit() {
		if (this.dataProvider == null) {
			throw new Error(`Data provider '[dataProvider]' can't be null.`);
		}
		
		this.dataProvider.getCount().then((count) => {
			this.itemsCount = count;
			
			this.loadPage(0);
		}, (error) => {
			console.dir(error);
		});
	}
	
	public loadData($event: { offset: number, count: number }): void {
		this.isLoading = true;
		this.dataProvider.getItems($event.offset, $event.count).then((items) => {
			this.isLoading = false;
			this.items = items;
		}, (error) => {
			this.isLoading = false;
			return error;
		});
	}
	
	public loadPage(pageNumber: number): void {
		const offset = pageNumber ? (pageNumber - 1) * this.perPage : 0,
			count = this.perPage,
			loadObject = {
				count : count,
				offset: offset
			};
		
		this.onPageLoad.emit(loadObject);
		
		this.loadData(loadObject);
	}
	
	private updateDataToRender(items: any[]) {
		this.dataToRender = items;
	}
}
