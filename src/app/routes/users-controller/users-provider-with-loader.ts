import { Injectable } from '@angular/core';
import { DataListProvider } from '../../../core/interfasces/data-list-provider';
import { ApiService } from '../../../core/services/api-service/api.service';
import { UserInfo } from '../../../core/view-models/user-info';
import { UsersProvider } from './users-provider';
import { LoadingIndicatorService } from '../../../core/services/loading-indicator/loading-indicator.service';

@Injectable()
export class UsersProviderWithLoader extends UsersProvider implements DataListProvider<UserInfo> {

	private indicator: LoadingIndicatorService;

	public constructor(api: ApiService, indicator: LoadingIndicatorService) {
		super(api);
		this.indicator = indicator;
	}

	public getCount(): Promise<number> {
		const self = this;

		self.indicator.show();
		return super.getCount().then(function (count: number) {
			self.indicator.hide();
			return count;
		});
	}

	public getItems(offset: number, count: number): Promise<UserInfo[]> {
		const self = this;

		self.indicator.show();
		return super.getItems(offset, count).then(function (info: UserInfo[]) {
			self.indicator.hide();
			return info;
		});
	}
}
