import { Component, Injectable, OnInit } from '@angular/core';
import { DataListProvider } from '../../../core/interfasces/data-list-provider';
import { ApiService } from '../../../core/services/api-service/api.service';
import { LoadingIndicatorService } from '../../../core/services/loading-indicator/loading-indicator.service';
import { UserInfo } from '../../../core/view-models/user-info';

@Injectable()
export class UsersProvider implements DataListProvider<UserInfo> {
	private api: ApiService;
	
	public constructor(api: ApiService) {
		this.api = api;
		
	}
	
	public getCount(): Promise<number> {
		return this.api.usersInfo().getUsersCount();
	}
	
	public getItems(offset: number, count: number): Promise<UserInfo> {
		return this.api.usersInfo().getUsers(offset, count).then((info) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(info);
				}, 3000);
			});
		});
	}
}

@Component({
	selector   : 'users-controller',
	templateUrl: 'users-controller.component.html',
	styleUrls  : ['users-controller.component.sass'],
	providers  : [
		UsersProvider
	]
})
export class UsersControllerComponent implements OnInit {
	
	public users: any;
	public data: UserInfo[] = [];
	public itemsPerPageCount: number = 4;
	
	private indicator: LoadingIndicatorService;
	public usersProvider: UsersProvider;
	
	public constructor(usersProvider: UsersProvider, indicator: LoadingIndicatorService) {
		this.usersProvider = usersProvider;
		this.indicator = indicator;
	}
	
	public ngOnInit(): void {
	
	}
}
