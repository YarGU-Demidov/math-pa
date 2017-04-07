import { Injectable } from '@angular/core';
import { DataListProvider } from '../../../core/interfasces/data-list-provider';
import { ApiService } from '../../../core/services/api-service/api.service';
import { FiltersAndSortData } from '../../../core/services/api-service/controllers/users-info-controller';
import { UserInfo } from '../../../core/view-models/user-info';

@Injectable()
export class UsersProvider implements DataListProvider<UserInfo> {
	protected api: ApiService;
	
	public constructor(api: ApiService) {
		this.api = api;
	}
	
	public getCount(): Promise<number> {
		return this.api.usersInfo().getUsersCount();
	}
	
	public getItems(offset: number, count: number, filtersAndSortData?: FiltersAndSortData): Promise<UserInfo[]> {
		return this.api.usersInfo().getUsers(offset, count, filtersAndSortData);
	}
}
