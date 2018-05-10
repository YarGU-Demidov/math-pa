export class MenuItemData {
	public icon: string;
	public name: string;
	public href: string;
	public subItems: Array<MenuItemData[]>;

	constructor(icon: string, name: string, href: string, subItems: Array<MenuItemData[]> = []) {
		this.icon     = icon;
		this.name     = name;
		this.href     = href;
		this.subItems = subItems;
	}
}
