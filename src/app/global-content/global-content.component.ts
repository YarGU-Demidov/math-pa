import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { EventBusService } from '../services/message-bus-service/event-bus.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Constants } from "../services/constants-service/constants.service";
import { BrowserInfoService } from '../services/browser-info-service/browser-info.service';
import { BrowserInfo } from '../services/browser-info-service/browser-info';

@Component({
	selector   : 'global-content',
	templateUrl: './global-content.component.html',
	styleUrls  : ['global-content.component.sass']
})
export class GlobalContentComponent implements OnInit, AfterViewInit {
	
	@ViewChild('text')
	private text: ElementRef;
	@ViewChild('contentArea')
	private contentArea: ElementRef;
	
	private eventBus: EventBusService;
	
	private count: number = 0;
	private clickedText: string;
	private browserInfo: BrowserInfo;
	private constants: Constants;
	
	constructor(eventBus: EventBusService, browserInfo: BrowserInfoService, constants: Constants) {
		this.eventBus    = eventBus;
		this.constants   = constants;
		this.browserInfo = browserInfo.getBrowserInfo();
		
		eventBus.subscribe(this.constants.eventBusEvents.MENU_ITEM_CLICK, (active: MenuItemComponent) => {
			this.text.nativeElement.innerHTML = active.item.name;
			this.clickedText                  = `Clicked: ${++this.count}`;
		});
		
		eventBus.subscribe(this.constants.eventBusEvents.SIDEBAR_TOGGLE, (currentState: string, previousState: string) => {
			this.toggleArea(currentState, previousState);
		});
	}
	
	public ngOnInit(): void {
		
	}
	
	private toggleArea(currentState: string, previousState: string) {
		this.contentArea.nativeElement.classList.remove(previousState);
		this.contentArea.nativeElement.classList.add(currentState);
	}
	
	public ngAfterViewInit(): void {
		if (this.browserInfo.isMobile) {
			this.toggleArea('collapsed', 'normal');
		}
	}
	
}
