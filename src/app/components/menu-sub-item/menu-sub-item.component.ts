import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemData, EventBusService, Constants } from 'core/core.module';
import { SimpleErrorService } from '../../services/simple-error/simple-error.service';

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
	private errorsHandler: SimpleErrorService;
	
	public constructor(router: Router, eventBus: EventBusService, constants: Constants, errorsHandler: SimpleErrorService) {
		this.router        = router;
		this.eventBus      = eventBus;
		this.constants     = constants;
		this.errorsHandler = errorsHandler;
		
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
			self.errorsHandler.raiseError(`Can't go to route.`, error.message, self);
		});
	}
}
