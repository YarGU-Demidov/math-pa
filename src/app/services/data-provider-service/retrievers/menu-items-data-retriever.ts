import { DbSet } from "../db-set";
import { MenuItemData } from "../../../view-models/menu-item-data";

export class MenuItemsDataRetriever extends DbSet<MenuItemData> {
	protected urlPath: string = "menu-items";

	public saveAll(data: Array<MenuItemData>): Promise<boolean> {
		throw new Error('Not supported!');
	}
}
