import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { MenuItemsDataController } from "./controllers/menu-items-data-controller";
import { UserInfo } from "../../view-models/user-info";
import { UserController } from "./controllers/users-info-controller";
import { SettingsRetriever } from './controllers/settings-controller';
import { Constants } from '../../constants';
import { LogoutResult } from '../../view-models/logout-result';
import { AuthController } from './controllers/auth-controller';

@Injectable()
export class ApiService {
	
	private apiUrl: string = '';
	private http: Http;
	
	private menuItemsCtrl: MenuItemsDataController;
	private usersInfoCtrl: UserController;
	private settingsCtrl: SettingsRetriever;
	private authCtrl: AuthController;
	
	public constructor(http: Http) {
		this.apiUrl        = Constants.getApiUrl();
		this.http          = http;
		this.menuItemsCtrl = new MenuItemsDataController(this.apiUrl, http);
		this.usersInfoCtrl = new UserController(this.apiUrl, this.http);
		this.settingsCtrl  = new SettingsRetriever(this.apiUrl, this.http);
		this.authCtrl      = new AuthController(this.apiUrl, this.http);
	}
	
	public menuItemsData(): MenuItemsDataController {
		return this.menuItemsCtrl;
	}
	
	public usersInfo(): UserController {
		return this.usersInfoCtrl;
	}
	
	public currentUserInfo(): Promise<UserInfo> {
		return this.usersInfoCtrl.getCurrentUser();
	}
	
	public settings(): SettingsRetriever {
		return this.settingsCtrl;
	}
	
	public auth(): AuthController {
		return this.authCtrl;
	}
}
