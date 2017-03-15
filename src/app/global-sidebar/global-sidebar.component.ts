import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from "@angular/core";
import { MenuItemData } from "../view-models/menu-item-data";
import { EventBusService } from "../services/message-bus-service/event-bus.service";
import { Constants } from '../constants';
import { ApiService } from '../services/api-service/api.service';

declare let $: any;

@Component({
	selector   : 'global-sidebar',
	templateUrl: 'global-sidebar.component.html',
	styleUrls  : ['global-sidebar.component.sass']
})
export class GlobalSideBarComponent implements OnInit, AfterViewInit {
	
	@Output()
	public isToggled = new EventEmitter();
	private userToggled: string;
	
	@Input()
	public defaultState: string = 'normal';
	
	@ViewChild('menuBlock')
	private menuBlock: ElementRef;
	
	private menuItems = [];
	private eventBus: EventBusService;
	private api: ApiService;
	
	constructor(eventBus: EventBusService, api: ApiService) {
		let self      = this;
		this.eventBus = eventBus;
		this.api      = api;
		
		api.menuItemsData().getAll().then((data: Array<MenuItemData>) => {
			self.menuItems = data;
		}, (error) => {
			eventBus.raise(Constants.eventBusEvents.CRITICAL_ERROR_EVENT_NAME, self, [error.message]);
		})
		
	}
	
	public ngOnInit(): void {
		this.userToggled = this.defaultState;
	}
	
	public ngAfterViewInit(): void {
		let self = this;
		setTimeout(() => {
			$(self.menuBlock.nativeElement).mCustomScrollbar({
				axis         : "y",
				theme        : "minimal",
				setTop       : 0,
				scrollInertia: 200
			});
		});
	}
	
	public toggled() {
		this.userToggled = this.userToggled == 'collapsed' ? 'normal' : 'collapsed';
		this.isToggled.emit(this.userToggled);
	}
	
}
