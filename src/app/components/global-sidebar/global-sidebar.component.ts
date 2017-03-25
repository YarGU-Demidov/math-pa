import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuItemData } from '../../view-models/menu-item-data';
import { EventBusService } from '../../services/message-bus-service/event-bus.service';
import { ApiService } from '../../services/api-service/api.service';
import { BrowserInfoService } from '../../services/browser-info-service/browser-info.service';
import { BrowserInfo } from '../../services/browser-info-service/browser-info';
import { Constants } from '../../services/constants-service/constants.service';

declare const $: any;

@Component({
	selector   : 'global-sidebar',
	templateUrl: 'global-sidebar.component.html',
	styleUrls  : ['global-sidebar.component.sass']
})
export class GlobalSideBarComponent implements OnInit, AfterViewInit {
	private userToggled: string = 'normal';

	@ViewChild('menuBlock')
	private menuBlock: ElementRef;
	@ViewChild('globalSidebar')
	private globalSidebar: ElementRef;

	public menuItems = [];
	public browserInfo: BrowserInfo;
	public constants: Constants;

	private api: ApiService;
	private eventBus: EventBusService;

	private static getOppositeState(userToggled: string): string {
		return userToggled === 'collapsed' ? 'normal' : 'collapsed';
	}

	private static onSidebarToggledHandler(now: string, was: string, self: GlobalSideBarComponent): void {
		const elem: HTMLDivElement = self.globalSidebar.nativeElement;
		elem.classList.remove(was);
		elem.classList.add(now);
		self.userToggled = now;
	}

	private static onWindowResizeHandler(event: Event, height: number, width: number, context: GlobalSideBarComponent): void {
		if (width < context.constants.minWindowWidthForSidebarOpenedDefault) {
			context.hideSidebar();
		} else {
			context.showSidebar();
		}
	}

	constructor(eventBus: EventBusService, api: ApiService, browserInfo: BrowserInfoService, constants: Constants) {
		this.constants   = constants;
		this.browserInfo = browserInfo.getBrowserInfo();
		this.eventBus    = eventBus;
		this.api         = api;

		const self = this;

		api.menuItemsData().getAll().then((data: Array<MenuItemData>) => {
			self.menuItems = data;
		}, (error) => {
			eventBus.raise(constants.eventBusEvents.CRITICAL_ERROR_EVENT_NAME, self, [error.message]);
		});

		eventBus.subscribe(constants.eventBusEvents.SIDEBAR_TOGGLE, GlobalSideBarComponent.onSidebarToggledHandler, this);
		eventBus.subscribe(constants.eventBusEvents.WINDOW_RESIZE, GlobalSideBarComponent.onWindowResizeHandler, this);
	}

	public ngOnInit(): void {
	}

	public ngAfterViewInit(): void {
		const self = this;
		setTimeout(() => {
			$(self.menuBlock.nativeElement).mCustomScrollbar({
				axis         : 'y',
				theme        : 'minimal',
				setTop       : 0,
				scrollInertia: 200
			});

			if (self.browserInfo.isMobile || self.browserInfo.getWidth() < this.constants.minWindowWidthForSidebarOpenedDefault) {
				self.hideSidebar();
			}
		});
	}

	private hideSidebar(): void {
		const now = 'collapsed',
			was = 'normal';
		this.eventBus.raise(this.constants.eventBusEvents.SIDEBAR_TOGGLE, this, [now, was]);
	}


	private showSidebar(): void {
		const now = 'normal',
			was = 'collapsed';
		this.eventBus.raise(this.constants.eventBusEvents.SIDEBAR_TOGGLE, this, [now, was]);
	}

	public toggled() {
		this.eventBus.raise(this.constants.eventBusEvents.SIDEBAR_TOGGLE, this, [
			GlobalSideBarComponent.getOppositeState(this.userToggled),
			this.userToggled
		]);


	}
}
