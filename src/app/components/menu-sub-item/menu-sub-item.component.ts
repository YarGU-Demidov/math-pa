import { Component, OnInit, Input } from '@angular/core';
import { MenuItemData } from '../../view-models/menu-item-data';

@Component({
	selector   : 'menu-sub-item',
	templateUrl: 'menu-sub-item.component.html',
	styleUrls  : ['menu-sub-item.component.sass']
})
export class MenuSubItemComponent implements OnInit {
	
	@Input()
	public subItem: MenuItemData;
	
	public constructor() {
		
	}
	
	public ngOnInit(): void {
		
	}
	
	public getCurrentItems(items: Array<MenuItemData[]>): MenuItemData[] {
		return items[0];
	}
	
}
