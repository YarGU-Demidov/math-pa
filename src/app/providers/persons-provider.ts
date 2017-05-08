import { Injectable } from '@angular/core';
import { DataListProvider } from '../../core/interfasces/data-list-provider';
import { ApiService } from '../../core/services/api-service/api.service';
import { FiltersAndSortData } from '../../core/interfasces/entities-interfaces';
import { Person } from '../../core/entities/person';

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
