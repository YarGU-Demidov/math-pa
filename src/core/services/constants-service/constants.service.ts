import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Constants {
	public eventBusEvents = {
		INDICATOR                : {
			SHOW: 'loading_indicator--show',
			HIDE: 'loading_indicator--hide'
		},
		SIDEBAR_TOGGLE           : 'sidebar-toggled',
		SOMEWHERE_CLICKED        : 'somewhere-clicked',
		CRITICAL_ERROR_EVENT_NAME: 'critical-error',
		ERROR_EVENT_NAME         : 'important-error',
		ERROR_EVENT_NAME_CLOSE   : 'important-error-close',
		MENU_ITEM_CLICK          : 'menu-item-clicked',
		WINDOW_RESIZE            : 'window-resize',
	};
	
	public extendedMenuColumnWidth: number = 200;
	
	public minWindowWidthForSidebarOpenedDefault = 900;
	
	public getApiUrl(): string {
		if (environment.production) {
			return `${location.protocol}//${location.host}/Api`;
		} else {
			return `http://localhost:5000/Api`;
		}
	}
}
