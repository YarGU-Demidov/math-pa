import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { EventBusService } from '../services/message-bus-service/event-bus.service';

export class MenuItemData {
	public icon: string;
	public name: string;
	public href: string;
	public subItems: MenuItemData[];
	
	constructor(icon: string, name: string, href: string, subItems: MenuItemData[] = []) {
		this.icon     = icon;
		this.name     = name;
		this.href     = href;
		this.subItems = subItems;
	}
}

@Component({
	selector   : 'menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls  : ['menu-item.component.sass']
})
export class MenuItemComponent {
	
	public static EVENT_NAME = 'menu-item-clicked';
	
	@Input()
	public item: MenuItemData;
	private eventBus: EventBusService;
	private opened: boolean = false;
	private leaveTimeoutId;
	
	@ViewChild('extendedMenu')
	private extendedMenu: ElementRef;
	
	constructor(eventBus: EventBusService) {
		const self = this;
		
		self.eventBus = eventBus;
		
		eventBus.subscribe(MenuItemComponent.EVENT_NAME, (activeItem: MenuItemComponent) => {
			if (activeItem === self) {
				return;
			}
			
			self.close();
		});
	}
	
	private clickHandler($event: MouseEvent, item: MenuItemData, element: HTMLDivElement): void {
		if (this.item.subItems && this.item.subItems.length) {
			this.opened = true;
			element.classList.remove('collapsed');
		}
		this.eventBus.raise(MenuItemComponent.EVENT_NAME, this, [this]);
	}
	
	public close() {
		if (this.opened) {
			this.extendedMenu.nativeElement.classList.add('collapsed');
			this.opened = false;
		}
	}
	
	private mouseEnter(){
		if(!this.opened)
			return;
		
		clearTimeout(this.leaveTimeoutId);
	}
	
	private mouseLeave(){
		if(!this.opened)
			return;
		
		this.leaveTimeoutId = setTimeout(()=>{
			this.close();
		}, 1500);
	}
}
