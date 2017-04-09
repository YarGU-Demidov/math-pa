import { DataProtocol } from '../data-protocol';
import { MenuItemData } from '../../../view-models/menu-item-data';
import { Response } from '@angular/http';

export class MenuItemsDataController extends DataProtocol {
	protected controllerName: string = 'MenuItems';
	
	public getAll(): Promise<Array<MenuItemData>> {
		return this.get(`GetAll`).then((response: Response) => {
			return <Array<MenuItemData>>response.json();
		}, (error) => {
			throw new Error(`Can't download data: ${error.toString()}`);
		});
	}
}
