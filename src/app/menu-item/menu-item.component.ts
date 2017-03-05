import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { EventBusService } from "../services/message-bus-service/event-bus.service";
import { BrowserInfoService } from "../services/browser-info-service/browser-info.service";
import { MenuItemData } from "../view-models/menu-item-data";


@Component({
	selector   : 'menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls  : ['menu-item.component.sass']
})
export class MenuItemComponent implements OnInit, AfterViewInit {

	public static EVENT_NAME = 'menu-item-clicked';

	public extendedWidth: string = '0px';
	public columnWidth: number   = 200;

	@Input()
	public item: MenuItemData;
	private eventBus: EventBusService;
	private opened: boolean = false;

	@ViewChild('extendedMenu')
	private extendedMenu: ElementRef;

	private browserInfo: BrowserInfoService;

	constructor(eventBus: EventBusService, browserInfo: BrowserInfoService) {
		this.browserInfo = browserInfo;
		const self       = this;

		self.eventBus = eventBus;

		eventBus.subscribe(MenuItemComponent.EVENT_NAME, (activeItem: MenuItemComponent) => {
			if (activeItem === self) {
				return;
			}
			self.close();
		});

		eventBus.subscribe('somewhere-clicked', function ($event: MouseEvent) {
			if (self.opened && !($event.toElement.classList.contains('sub-item') ||
				$event.toElement.classList.contains('sub-sub-item') ||
				$event.toElement.classList.contains('menu-content') ||
				$event.toElement.classList.contains('menu-item') ||
				$event.toElement.classList.contains('material-icons'))) {
				self.close();
			}
		})
	}

	public ngOnInit(): void {
		this.extendedWidth = !this.browserInfo.getBrowserInfo().isMobile
			? this.columnWidth * this.item.subItems.length + 'px'
			: this.columnWidth + 'px';
	}

	public ngAfterViewInit(): void {

		if (this.browserInfo.getBrowserInfo().isMobile) {
			let elem: HTMLDivElement = this.extendedMenu.nativeElement;
			if (!elem.classList.contains('mobile')) {
				elem.classList.add('mobile');
			}
		}
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
