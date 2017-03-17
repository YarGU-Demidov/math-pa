import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EventBusService } from '../../services/message-bus-service/event-bus.service';
import { BrowserInfoService } from '../../services/browser-info-service/browser-info.service';
import { MenuItemData } from '../../view-models/menu-item-data';
import { Constants } from '../../services/constants-service/constants.service';
import { Router } from '@angular/router';


@Component({
	selector   : 'menu-item',
	templateUrl: 'menu-item.component.html',
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
	private router: Router;
	
	private static onItemClick(activeItem: MenuItemComponent, self: MenuItemComponent): void {
		if (activeItem === self) {
			if (!self.item.subItems || !self.item.subItems.length) {
				self.router.navigateByUrl(self.item.href).then((result) => {
					if (result) {
						self.close();
					}
				}, (error: Error) => {
					self.eventBus.raise(self.constants.eventBusEvents.ERROR_EVENT_NAME, self, [error.message]);
				});
			}
			
			return;
		}
		
		self.close();
	}
	
	private static onSomewhereClicked($event: MouseEvent, self: MenuItemComponent): void {
		if (self.opened && !($event.toElement.classList.contains('sub-item') ||
			$event.toElement.classList.contains('sub-sub-item') ||
			$event.toElement.classList.contains('menu-content') ||
			$event.toElement.classList.contains('menu-item') ||
			$event.toElement.classList.contains('material-icons'))) {
			self.close();
		}
	}
	
	public constructor(eventBus: EventBusService, browserInfo: BrowserInfoService, constants: Constants, router: Router) {
		this.browserInfo = browserInfo;
		this.constants = constants;
		this.eventBus = eventBus;
		this.router = router;
		
		eventBus.subscribe(constants.eventBusEvents.MENU_ITEM_CLICK, MenuItemComponent.onItemClick, this);
		this.eventId = eventBus.subscribe(constants.eventBusEvents.SOMEWHERE_CLICKED, MenuItemComponent.onSomewhereClicked, this);
	}
	
	public ngOnInit(): void {
		this.extendedWidth = !this.browserInfo.getBrowserInfo().isMobile
			? this.constants.extendedMenuColumnWidth * this.item.subItems.length + 'px'
			: this.constants.extendedMenuColumnWidth + 'px';
	}
	
	public ngAfterViewInit(): void {

		if (this.browserInfo.getBrowserInfo().isMobile) {
			const elem: HTMLDivElement = this.extendedMenu.nativeElement;
			if (!elem.classList.contains('mobile')) {
				elem.classList.add('mobile');
			}
		}
	}
	
	public ngOnDestroy(): void {
		this.eventBus.unsubscribe(this.eventId);
	}
	
	public clickHandler(element: HTMLDivElement): void {
		if (this.item.subItems && this.item.subItems.length) {
			this.opened = true;
			element.classList.remove('collapsed');
		}

		this.eventBus.raise(this.constants.eventBusEvents.MENU_ITEM_CLICK, this, [this]);
	}
	
	public extendedMenuClickHandler(): void {
		const self = this;
		
		self.router.navigateByUrl(self.item.href).then((result) => {
			if (result) {
				self.close();
			}
		}, (error: Error) => {
			self.eventBus.raise(self.constants.eventBusEvents.ERROR_EVENT_NAME, self, [error.message]);
		});
	}
	
	public close() {
		if (this.opened) {
			this.extendedMenu.nativeElement.classList.add('collapsed');
			this.opened = false;
		}
	}
}
