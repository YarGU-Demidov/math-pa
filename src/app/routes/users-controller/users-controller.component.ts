import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../core/services/title-service/title.service';
import { UsersProviderWithLoader } from '../../providers/users-provider-with-loader';

@Component({
	selector   : 'users-controller',
	templateUrl: 'users-controller.component.html',
	styleUrls  : ['users-controller.component.sass'],
	providers  : [
		UsersProviderWithLoader
	]
})
export class UsersControllerComponent implements OnInit {
	
	private pageTitle: string = 'Управление пользователями';
	
	public constructor(titleService: TitleService) {
		titleService.setTitle(this.pageTitle);
	}
	
	public ngOnInit(): void {
	
	}
}
