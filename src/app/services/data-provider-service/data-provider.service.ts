import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { MenuItemData } from "../../view-models/menu-item-data";
import { Http } from "@angular/http";
import { DbSet } from "./db-set";
import { MenuItemsDataRetriever } from "./retrievers/menu-items-data-retriever";

@Injectable()
export class DataProviderService {

	private apiUrl: string = '';
	private http: Http;

	public constructor(http: Http) {
		if (environment.production)
			this.apiUrl = `${location.protocol}//${location.host}/api`;
		else
			this.apiUrl = `http://localhost:5000/api`;

		this.http = http;
	}

	public menuItemsData(): DbSet<MenuItemData> {
		return new MenuItemsDataRetriever(this.apiUrl, this.http);
	}
}
