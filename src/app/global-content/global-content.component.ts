import {
	Component, OnInit, Input, trigger, state, style, transition, animate, ElementRef,
	ViewChild
} from '@angular/core';
import { EventBusService } from '../services/message-bus-service/event-bus.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Constants } from "../constants";
import { BrowserInfoService } from '../services/browser-info-service/browser-info.service';

@Component({
	selector   : 'global-content',
	templateUrl: './global-content.component.html',
	styleUrls  : ['global-content.component.sass'],
	animations : [
		trigger('sidebarState', [
			state('collapsed', style({
				paddingLeft: '58px'
			})),
			state('normal', style({
				paddingLeft: '250px'
			})),
			transition('collapsed => normal', animate('100ms ease-in')),
			transition('normal => collapsed', animate('100ms ease-in'))
		])
	]
})
export class GlobalContentComponent implements OnInit {

	@Input()
	public sidebarState = 'normal';
	@Input()
	public defaultState = 'normal';


	@ViewChild('text')
	private text: ElementRef;
	private eventBus: EventBusService;

	private count: number = 0;
	private clickedText: string;
	
	private isMobile = false;

	constructor(eventBus: EventBusService, browserInfo: BrowserInfoService) {
		this.eventBus = eventBus;
		
		this.isMobile = browserInfo.getBrowserInfo().isMobile;

		eventBus.subscribe(Constants.eventBusEvents.MENU_ITEM_CLICK, (active: MenuItemComponent) => {
			this.text.nativeElement.innerHTML = active.item.name;
			this.clickedText = `Clicked: ${++this.count}`;
		});
	}

	public ngOnInit(): void {
		this.sidebarState = this.defaultState;
	}

}
