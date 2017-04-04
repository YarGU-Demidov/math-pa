import { Component, OnInit, ViewChild } from '@angular/core';
import { Dialog, LazyLoadEvent } from 'primeng/primeng';
import { LoadingIndicatorService } from '../../../core/services/loading-indicator/loading-indicator.service';
import { UserInfo } from '../../../core/view-models/user-info';
import { UsersProvider } from './users-provider';
import { UsersProviderWithLoader } from './users-provider-with-loader';

@Component({
	selector   : 'users-controller',
	templateUrl: 'users-controller.component.html',
	styleUrls  : ['users-controller.component.sass'],
	providers  : [
		UsersProviderWithLoader
	]
})
export class UsersControllerComponent implements OnInit {

	public users: UserInfo[] = [];
	public usersCount: number = 0;

	public itemsPerPageCount: number = 50;
	public createAreaShowed = false;

	@ViewChild('createDialog')
	private createDialog: Dialog;

	private indicator: LoadingIndicatorService;
	public usersProvider: UsersProvider;

	public constructor(usersProvider: UsersProviderWithLoader, indicator: LoadingIndicatorService) {
		this.usersProvider = usersProvider;
		this.indicator = indicator;
	}

	public ngOnInit(): void {
		this.usersProvider.getCount().then((count) => {
			this.usersCount = count;
		});
	}

	public onCreateUser() {
		this.createAreaShowed = true;
	}

	public handleChange($event: { originalEvent: MouseEvent, index: number }): void {
		this.createDialog.center();
	}

	public loadUsersLazy($event: LazyLoadEvent): void {
		this.usersProvider.getItems($event.first, $event.rows).then((users: UserInfo[]) => {
			this.users = users;
		});
	}
}
