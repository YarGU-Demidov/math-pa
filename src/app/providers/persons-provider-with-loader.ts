import { Injectable } from '@angular/core';
import { Person, ApiService, LoadingIndicatorService, FiltersAndSortData } from 'core/core.module';
import { PersonsProvider } from './persons-provider';

@Injectable()
export class PersonsProviderWithLoader extends PersonsProvider {
	
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
	
	public getItems(offset: number, count: number, filtersAndSortData?: FiltersAndSortData): Promise<Person[]> {
		const self = this;
		
		const id = self.indicator.show();
		return super.getItems(offset, count, filtersAndSortData).then(function (info: Person[]) {
			self.indicator.hide(id);
			return info;
		});
	}
}
