import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserInfo } from '../../view-models/user-info';
import { ApiService } from '../../services/api-service/api.service';
import { BrowserInfoService } from '../../services/browser-info-service/browser-info.service';
import { EventBusService } from '../../services/message-bus-service/event-bus.service';
import { Constants } from '../../services/constants-service/constants.service';
import { LogoutResult } from '../../view-models/logout-result';
import { LogoutStatus } from '../../view-models/logout-status';

@Component({
	selector   : 'user-bar',
	templateUrl: 'user-bar.component.html',
	styleUrls  : ['user-bar.component.sass']
})
export class UserBarComponent implements OnInit, AfterViewInit {
	public userName: string;
	public login: string;

	public user: UserInfo;

	private api: ApiService;
	private browserInfo: BrowserInfoService;

	private menuVisible: boolean = false;

	@ViewChild('userBarWrapper')
	private userBarWrapper: ElementRef;
	@ViewChild('userMenu')
	private menu: ElementRef;
	@ViewChild('loginTitle')
	private loginTitle: ElementRef;
	private eventBus: EventBusService;
	private constants: Constants;

	private static somewhereClickedHandler($event: MouseEvent, context: UserBarComponent): void {

		const to = $event.toElement;

		if (!context.menuVisible || to.id === 'user-bar__login') {
			return;
		}

		if (to.classList.contains('user-bar__picture') ||
			to.classList.contains('user-bar__user-name') ||
			to.classList.contains('user-bar__user-menu__ul') ||
			to.classList.contains('user-bar__user-menu__item') ||
			to.id === 'user-bar__user-menu') {
			return;
		} else {
			context.menuClose();
		}
	}

	public constructor(api: ApiService, browserInfo: BrowserInfoService, eventBus: EventBusService, constants: Constants) {
		this.api = api;
		this.browserInfo = browserInfo;
		this.eventBus = eventBus;
		this.constants = constants;

		const self = this;
		this.user = new UserInfo();

		api.currentUserInfo().then((user: UserInfo) => {
			self.setUserData(user);
		});

		eventBus.subscribe(constants.eventBusEvents.SOMEWHERE_CLICKED, UserBarComponent.somewhereClickedHandler, this);
	}

	public ngOnInit(): void {

	}

	public ngAfterViewInit(): void {
		this.menuClose();
	}

	public setUserData(user: UserInfo) {
		this.login = user.nick;
		this.userName = `${user.surname} ${user.name[0]}.${user.middleName[0]}.`;
		this.user = user;
	}

	public toggleMenu(): void {
		if (this.menuVisible) {
			this.menuClose();
		} else {
			this.menuOpen();
		}
	}

	private menuClose(): void {
		const menuDiv: HTMLDivElement = this.menu.nativeElement,
			loginTitleDiv: HTMLDivElement = this.loginTitle.nativeElement;

		menuDiv.classList.add('hidden');
		loginTitleDiv.classList.remove('active');
		this.menuVisible = false;
	}

	private menuOpen(): void {
		const menuDiv: HTMLDivElement = this.menu.nativeElement,
			loginTitleDiv: HTMLDivElement = this.loginTitle.nativeElement;

		menuDiv.classList.remove('hidden');
		loginTitleDiv.classList.add('active');
		this.menuVisible = true;
	}

	public logout(): void {
		const self = this;

		this.api.auth().logout().then((result: LogoutResult) => {
			if (result.logoutStatus === LogoutStatus.Success) {
				location.href = '/';
			} else {
				self.eventBus.raise(this.constants.eventBusEvents.ERROR_EVENT_NAME, self, ['Logout error', result.description]);
			}
		}, error => {
			self.eventBus.raise(this.constants.eventBusEvents.ERROR_EVENT_NAME, self, ['Logout error', error.message]);
		});
	}
}
