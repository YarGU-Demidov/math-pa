import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MenuItemsDataController } from 'core/services/api-service/controllers/menu-items-data-controller';
import { UserController } from 'core/services/api-service/controllers/users-info-controller';
import { PersonsController } from 'core/services/api-service/controllers/persons-controller.component';
import { SettingsRetriever } from 'core/services/api-service/controllers/settings-controller';
import { AuthController } from 'core/services/api-service/controllers/auth-controller';
import { Constants } from 'core/services/constants-service/constants.service';
import { UserInfo } from 'core/view-models/user-info';

@Injectable()
export class ApiService {
	
	private apiUrl: string = '';
	private http: Http;
	
	private menuItemsCtrl: MenuItemsDataController;
	private usersInfoCtrl: UserController;
	private personsCtrl: PersonsController;
	private settingsCtrl: SettingsRetriever;
	private authCtrl: AuthController;
	
	public constructor(http: Http, constants: Constants) {
		this.apiUrl = constants.getApiUrl();
		this.http   = http;
		
		this.menuItemsCtrl = new MenuItemsDataController(this.apiUrl, http);
		this.usersInfoCtrl = new UserController(this.apiUrl, this.http);
		this.personsCtrl   = new PersonsController(this.apiUrl, this.http);
		this.settingsCtrl  = new SettingsRetriever(this.apiUrl, this.http);
		this.authCtrl      = new AuthController(this.apiUrl, this.http);
	}
	
	public get menuItemsData(): MenuItemsDataController {
		return this.menuItemsCtrl;
	}
	
	public get usersInfo(): UserController {
		return this.usersInfoCtrl;
	}
	
	public get currentUserInfo(): Promise<UserInfo> {
		return this.usersInfoCtrl.getCurrentUser();
	}
	
	public get persons(): PersonsController {
		return this.personsCtrl;
	}
	
	public get settings(): SettingsRetriever {
		return this.settingsCtrl;
	}
	
	public get auth(): AuthController {
		return this.authCtrl;
	}
}
