import {
	Component, OnInit, Input, trigger, state, style, transition, animate, ElementRef,
	ViewChild
} from '@angular/core';
import { EventBusService } from '../services/message-bus-service/event-bus.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';

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
	
	
	@ViewChild('text')
	private text: ElementRef;
	private eventBus: EventBusService;
	
	private count: number = 0;
	private clickedText: string;
	
	constructor(eventBus: EventBusService) {
		this.eventBus = eventBus;
		
		eventBus.subscribe(MenuItemComponent.EVENT_NAME, (active: MenuItemComponent) => {
			this.text.nativeElement.innerHTML = active.item.name;
			this.clickedText = `Clicked: ${++this.count}`;
		});
	}
	
	public ngOnInit(): void {
	}
	
}
