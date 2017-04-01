import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../core/services/api-service/api.service';
import { UserInfo } from '../../../core/view-models/user-info';

@Component({
	selector   : 'home-view',
	templateUrl: 'home-view.component.html',
	styleUrls  : ['home-view.component.sass']
})
export class HomeViewComponent implements OnInit, AfterViewInit {
	private api: ApiService;
	
	private user: UserInfo;
	public name: string;
	
	public constructor(api: ApiService) {
		this.api = api;
		
		api.currentUserInfo().then((user: UserInfo) => {
			if (!user.name && !user.surname && !user.middleName) {
				this.name = user.nick;
			} else {
				this.name = '';
				this.name += user.surname ? `${user.surname} ` : ``;
				this.name += user.name ? `${user.name} ` : ``;
				this.name += user.middleName ? `${user.middleName}` : ``;
			}
		});
	}
	
	public ngOnInit(): void {
	
	}
	
	public ngAfterViewInit(): void {
	
	}
	
}
