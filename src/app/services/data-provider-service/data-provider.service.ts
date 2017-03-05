import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { MenuItemData } from "../../view-models/menu-item-data";
import { Http } from "@angular/http";
import { DbSet } from "./db-set";
import { MenuItemsDataRetriever } from "./retrievers/menu-items-data-retriever";
import { UserInfo } from "../../view-models/user-info";
import { UserInfoRetriever } from "./retrievers/users-info-retriever";

@Injectable()
export class DataProviderService {

	private apiUrl: string = '';
	private http: Http;

	private menuItemsRetriever;
	private usersInfoRetriever;

	public constructor(http: Http) {
		if (environment.production) {
			this.apiUrl = `${location.protocol}//${location.host}/api`;
		} else {
			this.apiUrl = `http://localhost:5000/api`;
		}

		this.http               = http;
		this.menuItemsRetriever = new MenuItemsDataRetriever(this.apiUrl, http);
		this.usersInfoRetriever = new UserInfoRetriever(this.apiUrl, this.http);
	}

	public menuItemsData(): DbSet<MenuItemData> {
		return this.menuItemsRetriever;
	}

	public usersInfo(): DbSet<UserInfo> {
		return this.usersInfoRetriever;
	}

	public currentUserInfo(): Promise<UserInfo> {
		return (<UserInfoRetriever>this.usersInfoRetriever).getCurrentUser();
	}
}
