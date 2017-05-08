import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';
import { Person, SortDirection, FiltersAndSortData, FiltersData, UsersSortable } from 'core/core.module';
import { PersonsProviderWithLoader } from 'app/providers/persons-provider-with-loader';
import { PersonsProvider } from 'app/providers/persons-provider';

@Component({
	selector   : 'list-persons',
	templateUrl: 'list-persons.component.html',
	styleUrls  : ['list-persons.component.sass'],
	providers  : [
		PersonsProviderWithLoader
	]
})
export class ListPersonsComponent implements OnInit {
	
	@Input()
	public isSelectable: boolean;
	
	public persons: Person[]  = [];
	public usersCount: number = 0;
	
	public itemsPerPageCount: number = 100;
	
	public personsProvider: PersonsProvider;
	
	public constructor(personsProvider: PersonsProviderWithLoader) {
		this.personsProvider = personsProvider;
	}
	
	public ngOnInit(): void {
		this.personsProvider.getCount().then((count: number) => {
			this.usersCount = count;
		});
	}
	
	public loadUsersLazy($event: LazyLoadEvent): void {
		const filtersAndSortData = this.buildData($event);
		
		this.personsProvider.getItems($event.first, $event.rows, filtersAndSortData).then((users: Person[]) => {
			this.persons = users;
		});
	}
	
	private buildData(event: LazyLoadEvent): FiltersAndSortData {
		
		const sortData   = this.buildSortData(event),
			  filterData = this.buildFilterData(event);
		
		return {
			sort  : sortData,
			filter: filterData
		};
	}
	
	private buildSortData(event: LazyLoadEvent): UsersSortable {
		const sortData: UsersSortable = {
			group: SortDirection.Default
		};
		
		if ( event.sortField === 'user.group' ) {
			sortData.group = event.sortOrder < 0 ? SortDirection.Descending : SortDirection.Ascending;
		}
		
		return sortData;
	}
	
	private buildFilterData(event: LazyLoadEvent): FiltersData {
		const filterData: FiltersData = {
			globalFilter: event.globalFilter || null
		};
		
		return filterData;
	}
	
	public createDateString(person: Person): string {
		const date = new Date(person.creationDate);
		
		const dayNumber   = this.addZeroToNumber(date.getDate()),
			  monthNumber = this.addZeroToNumber(date.getMonth() + 1),
			  hours       = this.addZeroToNumber(date.getHours()),
			  minutes     = this.addZeroToNumber(date.getMinutes()),
			  seconds     = this.addZeroToNumber(date.getSeconds());
		
		return `${dayNumber}.${monthNumber}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
	}
	
	private addZeroToNumber(number: number): string {
		return number > 9 ? number.toString() : `0${number}`;
	}
}
