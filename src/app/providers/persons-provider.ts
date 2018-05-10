import { Injectable } from '@angular/core';
import { ApiService, Person, DataListProvider, FiltersAndSortData } from 'core/core.module';

@Injectable()
export class PersonsProvider implements DataListProvider<Person> {
	protected api: ApiService;
	
	public constructor(api: ApiService) {
		this.api = api;
	}
	
	public getCount(): Promise<number> {
		return this.api.persons.getUsersCount();
	}
	
	public getItems(offset: number, count: number, filtersAndSortData?: FiltersAndSortData): Promise<Person[]> {
		return this.api.persons.getUsers(offset, count, filtersAndSortData);
	}
}
