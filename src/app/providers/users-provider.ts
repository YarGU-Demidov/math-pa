import { Injectable } from '@angular/core';
import { ApiService, UserInfo, FiltersAndSortData, DataListProvider } from 'core/core.module';

@Injectable()
export class UsersProvider implements DataListProvider<UserInfo> {
	protected api: ApiService;
	
	public constructor(api: ApiService) {
		this.api = api;
	}
	
	public getCount(): Promise<number> {
		return this.api.usersInfo.getUsersCount();
	}
	
	public getItems(offset: number, count: number, filtersAndSortData?: FiltersAndSortData): Promise<UserInfo[]> {
		return this.api.usersInfo.getUsers(offset, count, filtersAndSortData);
	}
}
