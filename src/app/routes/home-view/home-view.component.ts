import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TitleService, BrowserInfo, BrowserInfoService, UserInfo, ApiService } from 'core/core.module';

@Component({
	selector   : 'home-view',
	templateUrl: 'home-view.component.html',
	styleUrls  : ['home-view.component.sass']
})
export class HomeViewComponent implements OnInit, AfterViewInit {
	
	private pageTitle: string = 'Пользовательская Панель';
	
	@ViewChild('homeView')
	public homeView: ElementRef;

	private api: ApiService;

	public name: string;

	private user: UserInfo;
	private browserInfo: BrowserInfo;
	
	public constructor(api: ApiService, browserInfo: BrowserInfoService, titleService: TitleService) {
		this.api = api;
		this.browserInfo = browserInfo.getBrowserInfo();
		
		api.currentUserInfo.then((user: UserInfo) => {
			if (!user.name && !user.surname && !user.middleName) {
				this.name = user.nick;
			} else {
				this.name = '';
				this.name += user.surname ? `${user.surname} ` : ``;
				this.name += user.name ? `${user.name} ` : ``;
				this.name += user.middleName ? `${user.middleName}` : ``;
			}
		});
		
		titleService.setTitle(this.pageTitle);
	}

	public ngOnInit(): void {
		$(this.homeView.nativeElement).height(this.browserInfo.getHeight() - 31);
	}

	public ngAfterViewInit(): void {

	}

}
