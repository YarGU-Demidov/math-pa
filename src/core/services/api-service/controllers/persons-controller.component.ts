import { Response } from '@angular/http';
import { DataProtocol } from 'core/services/api-service/data-protocol';
import { FiltersAndSortData } from 'core/interfasces/filters-and-sort-data';
import { Person } from 'core/entities/person';
import { MethodArgs } from 'core/services/api-service/method-args';

export class PersonsController extends DataProtocol {
	protected controllerName: string = 'Persons';
	
	public getUsersCount(): Promise<number> {
		return this.get('GetCount').then((response: Response) => {
			const responseData = (<{ result: string, error: string, data: number }> response.json());
			
			if ( responseData.result !== 'success' ) {
				throw new Error(responseData.error);
			}
			
			return responseData.data;
		});
	}
	
	public getUsers(offset, count, filtersAndSortData?: FiltersAndSortData): Promise<Person[]> {
		const args = new MethodArgs();
		args.addArg('offset', offset);
		args.addArg('count', count);
		
		return this.get('GetAll', args, true, filtersAndSortData).then((response: Response) => {
			const responseData = (<{ result: string, error: string, data: Person[] }> response.json());
			
			if ( responseData.result !== 'success' ) {
				throw new Error(responseData.error);
			}
			
			return responseData.data;
		}, (error) => {
			throw new Error(`Can't get persons. Details: ${error.toString()}`);
		});
	}
}
