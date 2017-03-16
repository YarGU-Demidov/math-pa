import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
	public eventBusEvents = {
		SIDEBAR_TOGGLE           : 'sidebar-toggled',
		SOMEWHERE_CLICKED        : 'somewhere-clicked',
		CRITICAL_ERROR_EVENT_NAME: 'critical-error',
		ERROR_EVENT_NAME         : 'important-error',
		MENU_ITEM_CLICK          : 'menu-item-clicked',
		WINDOW_RESIZE            : 'window-resize'
	};
	
	public extendedMenuColumnWidth: number = 200;
	
	public getApiUrl(): string {
		if (environment.production) {
			return `${location.protocol}//${location.host}/Api`;
		} else {
			return `http://localhost:5000/Api`;
		}
	}
	
	public minWindowWidthForSidebarOpenedDefault = 900;
}
