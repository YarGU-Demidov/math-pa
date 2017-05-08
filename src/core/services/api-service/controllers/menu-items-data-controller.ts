import { Response } from '@angular/http';
import { DataProtocol } from 'core/services/api-service/data-protocol';
import { MenuItemData } from 'core/view-models/menu-item-data';

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
