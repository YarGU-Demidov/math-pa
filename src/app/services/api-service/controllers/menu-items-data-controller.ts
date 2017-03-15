import { DataProtocol } from "../data-protocol";
import { MenuItemData } from "../../../view-models/menu-item-data";
import { Response } from '@angular/http';
import { MethodArgs } from '../method-args';

export class MenuItemsDataController extends DataProtocol {
	protected controllerName: string = "MenuItems";
	
	public getAll(offset: number = 0, count: number = 50): Promise<Array<MenuItemData>> {
		const args = new MethodArgs();
		args.addArg('offset', offset.toString());
		args.addArg('count', count.toString());
		
		return this.get(`GetAll`, args).then((response: Response) => {
			return <Array<MenuItemData>>response.json();
		}, (error) => {
			throw new Error(`Can't download data: ${error.toString()}`);
		});
	}
}
