import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Dialog, LazyLoadEvent } from 'primeng/primeng';
import { SortDirection } from '../../../core/enums/sort-direction';
import {
	FiltersAndSortData, FiltersData,
	UsersSortable
} from '../../../core/services/api-service/controllers/users-info-controller';
import { LoadingIndicatorService } from '../../../core/services/loading-indicator/loading-indicator.service';
import { UserInfo } from '../../../core/view-models/user-info';
import { UsersProvider } from './users-provider';
import { UsersProviderWithLoader } from './users-provider-with-loader';

@Component({
	selector     : 'users-controller',
	templateUrl  : 'users-controller.component.html',
	styleUrls    : ['users-controller.component.sass'],
	providers    : [
		UsersProviderWithLoader
	],
	encapsulation: ViewEncapsulation.None
})
export class UsersControllerComponent implements OnInit {
	
	public users: UserInfo[] = [];
	public usersCount: number = 0;
	
	public itemsPerPageCount: number = 100;
	public createAreaShowed = false;
	
	@ViewChild('createDialog')
	private createDialog: Dialog;
	
	private indicator: LoadingIndicatorService;
	public usersProvider: UsersProvider;
	
	public constructor(usersProvider: UsersProviderWithLoader, indicator: LoadingIndicatorService) {
		this.usersProvider = usersProvider;
		this.indicator = indicator;
	}
	
	public ngOnInit(): void {
		this.usersProvider.getCount().then((count) => {
			this.usersCount = count;
		});
	}
	
	public onCreateUser() {
		this.createAreaShowed = true;
	}
	
	public handleChange($event: { originalEvent: MouseEvent, index: number }): void {
		this.createDialog.center();
	}
	
	public loadUsersLazy($event: LazyLoadEvent): void {
		const sortData: UsersSortable = {
			group: SortDirection.Default
		};
		
		const filterData: FiltersData = {
			globalFilter: null
		};
		
		const filtersAndSortData: FiltersAndSortData = {
			sort: sortData,
			filter: filterData
		}
		
		if ($event.sortField === 'user.group') {
			sortData.group = $event.sortOrder < 0 ? SortDirection.Descending : SortDirection.Ascending;
		}
		
		this.usersProvider.getItems($event.first, $event.rows, filtersAndSortData).then((users: UserInfo[]) => {
			this.users = users;
		});
	}
}
