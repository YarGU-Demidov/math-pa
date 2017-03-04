import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { EventBusService } from '../services/message-bus-service/event-bus.service';

export class MenuItemData {
	public icon: string;
	public name: string;
	public href: string;
	public subItems: Array<MenuItemData[]>;

	constructor(icon: string, name: string, href: string, subItems: Array<MenuItemData[]> = []) {
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

		eventBus.subscribe('somewhere-clicked', function ($event: MouseEvent) {
			if(self.opened && !($event.toElement.classList.contains('sub-item') || $event.toElement.classList.contains('menu-content'))) {
				self.close();
			}
		})
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

	public getCurrentItems(items: Array<MenuItemData[]>): MenuItemData[] {
		return items[0];
	}
}
