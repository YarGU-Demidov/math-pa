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
	
	public get calendarLanguages(): any {
		return {
			ru: {
				firstDayOfWeek : 1,
				dayNames       : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
				dayNamesShort  : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
				dayNamesMin    : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
				monthNames     : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
				monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек']
			},
			en: {
				firstDayOfWeek : 0,
				dayNames       : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				dayNamesShort  : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				dayNamesMin    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames     : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			}
		};
	}
	
	public getApiUrl(): string {
		if ( environment.production ) {
			return `${location.protocol}//${location.host}/Api`;
		} else {
			return `http://localhost:5000/Api`;
		}
	}
}
