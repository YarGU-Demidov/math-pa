import { Response } from '@angular/http';
import { DataProtocol } from '../data-protocol';
import { MethodArgs } from '../method-args';
import { FiltersAndSortData } from 'core/interfasces/entities-interfaces';
import { Person } from 'core/entities/person';

export class PersonsComponent extends DataProtocol {
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
