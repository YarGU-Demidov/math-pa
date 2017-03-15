import { environment } from '../environments/environment';

export class Constants {
	public static eventBusEvents = {
		SOMEWHERE_CLICKED        : 'somewhere-clicked',
		CRITICAL_ERROR_EVENT_NAME: 'critical-error',
		ERROR_EVENT_NAME         : 'important-error',
		MENU_ITEM_CLICK          : 'menu-item-clicked',
	};
	
	public static extendedMenuColumnWidth : number = 200;
	
	public static getApiUrl(): string {
		if (environment.production) {
			return `${location.protocol}//${location.host}/Api`;
		} else {
			return `http://localhost:5000/Api`;
		}
	}
}
