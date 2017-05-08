import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../core/services/title-service/title.service';

@Component({
	selector   : 'app-site-settings',
	templateUrl: 'site-settings.component.html',
	styleUrls  : ['site-settings.component.sass']
})
export class SiteSettingsComponent implements OnInit {
	private pageTitle: string = 'Настройки сайта';
	
	public constructor(titleService: TitleService) {
		titleService.setTitle(this.pageTitle);
	}
	
	public ngOnInit(): void {
	}
	
}
