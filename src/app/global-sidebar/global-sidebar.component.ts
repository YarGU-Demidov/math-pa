import {
	Component, OnInit, Output, EventEmitter, trigger, state, style, animate, transition,
	ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { MenuItemData } from '../menu-item/menu-item.component';
import { EventBusService } from '../services/message-bus-service/event-bus.service';

declare let $: any;

@Component({
	selector   : 'global-sidebar',
	templateUrl: 'global-sidebar.component.html',
	styleUrls  : ['global-sidebar.component.sass']
})
export class GlobalSideBarComponent implements OnInit, AfterViewInit {

	@Output()
	public isToggled = new EventEmitter();
	private userToggled: string;

	@ViewChild('menuBlock')
	private menuBlock: ElementRef;

	private menuItems = [
		new MenuItemData('assignment_turned_in', 'Tasks', '#'),
		new MenuItemData('face', 'Users', '#', [
			[
				new MenuItemData('', 'test subitem #1', '#', [
					[
						new MenuItemData('', 'yo #0', '#'),
						new MenuItemData('', 'yo #1', '#'),
						new MenuItemData('', 'yo #2', '#'),
					]
				]),
				new MenuItemData('', 'test subitem #2', '#')
			],
			[
				new MenuItemData('', 'test subitem #3', '#'),
				new MenuItemData('', 'test subitem #4', '#')
			]
		]),
		new MenuItemData('event', 'Calendar', '#', [
			[
				new MenuItemData('', 'test subitem #5', '#'),
				new MenuItemData('', 'test subitem #6', '#')
			],
			[
				new MenuItemData('', 'test subitem #7', '#'),
				new MenuItemData('', 'test subitem #8', '#')
			]
		]),
		new MenuItemData('art_track', 'Content', '#'),
	];
	private eventBus: EventBusService;

	constructor(eventBus: EventBusService) {
		this.eventBus = eventBus;
	}

	public ngOnInit(): void {
	}

	public ngAfterViewInit(): void {
		let self = this;
		setTimeout(() => {
			$(self.menuBlock.nativeElement).mCustomScrollbar({
				axis         : "y",
				theme        : "minimal",
				setTop       : 0,
				scrollInertia: 200
			});
		});
	}

	public toggled() {
		this.userToggled = this.userToggled == 'collapsed' ? 'normal' : 'collapsed';
		this.isToggled.emit(this.userToggled);
	}

}
