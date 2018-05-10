import { Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[core-templateWrapper]'
})
export class TemplateWrapperDirective implements OnInit, OnDestroy {
	
	@Input()
	public item: any;
	
	@Input()
	public index: number;
	
	@Input('core-templateWrapper')
	public templateRef: TemplateRef<any>;
	
	public viewContainer: ViewContainerRef;
	
	public view: EmbeddedViewRef<any>;
	
	constructor(viewContainer: ViewContainerRef) {
		this.viewContainer = viewContainer;
	}
	
	public ngOnInit() {
		this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
			'\$implicit': this.item,
			'index'     : this.index
		});
	}
	
	public ngOnDestroy() {
		this.view.destroy();
	}
}
