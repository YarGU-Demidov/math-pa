import { UsersSortable } from 'core/interfasces/users-sortable';
import { FiltersData } from 'core/interfasces/filters-data';

export interface FiltersAndSortData {
	sort: UsersSortable;
	filter: FiltersData;
}
