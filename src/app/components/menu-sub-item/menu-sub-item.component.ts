import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemData } from '../../view-models/menu-item-data';
import { EventBusService } from '../../services/message-bus-service/event-bus.service';
import { Constants } from '../../services/constants-service/constants.service';

@Component({
	selector   : 'menu-sub-item',
	templateUrl: 'menu-sub-item.component.html',
	styleUrls  : ['menu-sub-item.component.sass']
})
export class MenuSubItemComponent implements OnInit {
	
	@Input()
	public subItem: MenuItemData;
	
	@Output()
	public navigated: EventEmitter<boolean> = new EventEmitter(true);
	
	private router: Router;
	private eventBus: EventBusService;
	private constants: Constants;
	
	public constructor(router: Router, eventBus: EventBusService, constants: Constants) {
		this.router = router;
		this.eventBus = eventBus;
		this.constants = constants;
		
	}
	
	public ngOnInit(): void {
		
	}
	
	public getCurrentItems(items: Array<MenuItemData[]>): MenuItemData[] {
		return items[0];
	}
	
	public onItemClick() {
		const self = this;
	
		self.router.navigateByUrl(self.subItem.href).then((navigated) => {
			self.navigated.emit(Boolean(navigated));
		}, (error) => {
			self.eventBus.raise(self.constants.eventBusEvents.ERROR_EVENT_NAME, self, [`Can't go to route.`, error.message]);
		});
	}
}
