import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DataProviderService } from '../services/data-provider-service/data-provider.service';
import { BrowserInfoService } from '../services/browser-info-service/browser-info.service';
import { UserInfo } from '../view-models/user-info';
import { EventBusService } from '../services/message-bus-service/event-bus.service';
import { Constants } from '../constants';

@Component({
	selector   : 'user-bar',
	templateUrl: './user-bar.component.html',
	styleUrls  : ['user-bar.component.sass']
})
export class UserBarComponent implements OnInit, AfterViewInit {
	private userName: string;
	private login: string;
	
	private user: UserInfo;
	
	private dataProvider: DataProviderService;
	private browserInfo: BrowserInfoService;
	
	private menuVisible: boolean = false;
	
	@ViewChild('userBarWrapper')
	private userBarWrapper: ElementRef;
	@ViewChild('userMenu')
	private menu: ElementRef;
	@ViewChild('loginTitle')
	private loginTitle: ElementRef;
	private eventBus: EventBusService;
	
	public constructor(dataProvider: DataProviderService, browserInfo: BrowserInfoService, eventBus: EventBusService) {
		this.dataProvider = dataProvider;
		this.browserInfo  = browserInfo;
		this.eventBus     = eventBus;
		
		const self = this;
		this.user  = new UserInfo();
		dataProvider.currentUserInfo().then((user: UserInfo) => {
			self.setUserData(user);
		});
		
		eventBus.subscribe(Constants.eventBusEvents.SOMEWHERE_CLICKED, UserBarComponent.somewhereClickedHandler, this);
	}
	
	public ngOnInit(): void {
		
	}
	
	public ngAfterViewInit(): void {
		this.menuClose();
	}
	
	public setUserData(user: UserInfo) {
		this.login    = user.nick;
		this.userName = `${user.surname} ${user.name[0]}.${user.middleName[0]}.`;
		this.user     = user;
	}
	
	private toggleMenu(): void {
		if (this.menuVisible) {
			this.menuClose();
		} else {
			this.menuOpen();
		}
	}
	
	private menuClose(): void {
		let menuDiv: HTMLDivElement       = this.menu.nativeElement;
		let loginTitleDiv: HTMLDivElement = this.loginTitle.nativeElement;
		
		menuDiv.classList.add('hidden');
		loginTitleDiv.classList.remove('active');
		this.menuVisible = false;
	}
	
	private menuOpen(): void {
		let menuDiv: HTMLDivElement       = this.menu.nativeElement;
		let loginTitleDiv: HTMLDivElement = this.loginTitle.nativeElement;
		
		menuDiv.classList.remove('hidden');
		loginTitleDiv.classList.add('active');
		this.menuVisible = true;
	}
	
	private static somewhereClickedHandler($event: MouseEvent, context: UserBarComponent): void {
		
		const to = $event.toElement;
		
		if (!context.menuVisible || to.id === 'user-bar__login')
			return;
		
		if (to.classList.contains('user-bar__picture') ||
			to.classList.contains('user-bar__user-name') ||
			to.id === 'user-bar__user-menu') {
			return;
		} else {
			context.menuClose();
		}
	}
}
