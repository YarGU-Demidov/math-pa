import { Injectable } from '@angular/core';
import { UsersProvider } from './users-provider';
import { LoadingIndicatorService } from '../../core/services/loading-indicator/loading-indicator.service';
import { ApiService } from '../../core/services/api-service/api.service';
import { FiltersAndSortData } from '../../core/interfasces/entities-interfaces';
import { UserInfo } from '../../core/view-models/user-info';

@Injectable()
export class UsersProviderWithLoader extends UsersProvider {
	
	private indicator: LoadingIndicatorService;
	
	public constructor(api: ApiService, indicator: LoadingIndicatorService) {
		super(api);
		this.indicator = indicator;
	}
	
	public getCount(): Promise<number> {
		const self = this;
		
		const id = self.indicator.show();
		return super.getCount().then(function (count: number) {
			self.indicator.hide(id);
			return count;
		});
	}
	
	public getItems(offset: number, count: number, filtersAndSortData?: FiltersAndSortData): Promise<UserInfo[]> {
		const self = this;
		
		const id = self.indicator.show();
		return super.getItems(offset, count, filtersAndSortData).then(function (info: UserInfo[]) {
			self.indicator.hide(id);
			return info;
		});
	}
}
