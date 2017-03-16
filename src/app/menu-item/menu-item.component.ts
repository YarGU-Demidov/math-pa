import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { EventBusService } from "../services/message-bus-service/event-bus.service";
import { BrowserInfoService } from "../services/browser-info-service/browser-info.service";
import { MenuItemData } from "../view-models/menu-item-data";
import { Constants } from "../services/constants-service/constants.service";


@Component({
	selector   : 'menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls  : ['menu-item.component.sass']
})
export class MenuItemComponent implements OnInit, AfterViewInit, OnDestroy {

	private eventId: number;

	public extendedWidth: string = '0px';

	@Input()
	public item: MenuItemData;
	private eventBus: EventBusService;
	private opened: boolean = false;

	@ViewChild('extendedMenu')
	private extendedMenu: ElementRef;

	private browserInfo: BrowserInfoService;
	private constants: Constants;

	constructor(eventBus: EventBusService, browserInfo: BrowserInfoService, constants: Constants) {
		this.browserInfo = browserInfo;
		this.constants = constants;
		const self       = this;

		self.eventBus = eventBus;

		eventBus.subscribe(constants.eventBusEvents.MENU_ITEM_CLICK, (activeItem: MenuItemComponent) => {
			if (activeItem === self) {
				return;
			}
			self.close();
		});

		this.eventId = eventBus.subscribe(constants.eventBusEvents.SOMEWHERE_CLICKED, ($event: MouseEvent) => {
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
			? this.constants.extendedMenuColumnWidth * this.item.subItems.length + 'px'
			: this.constants.extendedMenuColumnWidth + 'px';
	}

	public ngAfterViewInit(): void {

		if (this.browserInfo.getBrowserInfo().isMobile) {
			let elem: HTMLDivElement = this.extendedMenu.nativeElement;
			if (!elem.classList.contains('mobile')) {
				elem.classList.add('mobile');
			}
		}
	}

	public ngOnDestroy(): void {
		this.eventBus.unsubscribe(this.eventId);
	}

	private clickHandler($event: MouseEvent, item: MenuItemData, element: HTMLDivElement): void {
		if (this.item.subItems && this.item.subItems.length) {
			this.opened = true;
			element.classList.remove('collapsed');
		}

		this.eventBus.raise(this.constants.eventBusEvents.MENU_ITEM_CLICK, this, [this]);
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
