import { Component } from '@angular/core';

@Component({
	selector   : 'core-data-table',
	templateUrl: './data-table.component.html',
	styleUrls  : ['./data-table.component.sass']
})
export class DataTableComponent {
	public isLoading: boolean = false;
}
