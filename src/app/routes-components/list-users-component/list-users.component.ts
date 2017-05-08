import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../../core/view-models/user-info';
import { LoadingIndicatorService } from '../../../core/services/loading-indicator/loading-indicator.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { FiltersAndSortData, FiltersData, UsersSortable } from '../../../core/interfasces/entities-interfaces';
import { SortDirection } from '../../../core/enums/sort-direction';
import { UsersProviderWithLoader } from '../../providers/users-provider-with-loader';
import { UsersProvider } from '../../providers/users-provider';

@Component({
	selector   : 'list-users',
	templateUrl: 'list-users.component.html',
	styleUrls  : ['list-users.component.sass'],
	providers  : [
		UsersProviderWithLoader
	]
})
export class ListUsersComponent implements OnInit {
	
	@Input()
	public isSelectable: boolean;
	
	public users: UserInfo[]  = [];
	public usersCount: number = 0;
	
	public itemsPerPageCount: number = 100;
	
	private indicator: LoadingIndicatorService;
	public usersProvider: UsersProvider;
	
	public constructor(usersProvider: UsersProviderWithLoader, indicator: LoadingIndicatorService) {
		this.usersProvider = usersProvider;
		this.indicator     = indicator;
	}
	
	public ngOnInit(): void {
		this.usersProvider.getCount().then((count: number) => {
			this.usersCount = count;
		});
	}
	
	public loadUsersLazy($event: LazyLoadEvent): void {
		const filtersAndSortData = this.buildData($event);
		
		this.usersProvider.getItems($event.first, $event.rows, filtersAndSortData).then((users: UserInfo[]) => {
			this.users = users;
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
}
