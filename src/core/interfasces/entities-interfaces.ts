import { SortDirection } from '../enums/sort-direction';
export interface UsersSortable {
	group: SortDirection;
}

export interface FiltersData {
	globalFilter: string;
}

export interface FiltersAndSortData {
	sort: UsersSortable;
	filter: FiltersData;
}
