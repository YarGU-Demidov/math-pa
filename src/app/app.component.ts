import { Component, OnInit } from '@angular/core';
import { TitleService, EventBusService, BrowserInfoService, Constants } from 'core/core.module';

enum PageMode {
	Extended,
	FullWidth,
	Normal
}

@Component({
	selector   : 'app-root',
	templateUrl: './app.component.html',
	styleUrls  : ['./app.component.sass']
})
export class AppComponent implements OnInit {
	private pageMode: PageMode = PageMode.Normal;
	private titleService: TitleService;
	private eventBus: EventBusService;
	
	public defaultState: string;
	private constants: Constants;
	
	public constructor(title: TitleService, eventBus: EventBusService, browserInfo: BrowserInfoService, constants: Constants) {
		this.titleService = title;
		this.eventBus     = eventBus;
		this.constants    = constants;
		browserInfo.setResizeHandler();
		
		this.eventBus.createEventIfNotExists(constants.eventBusEvents.SOMEWHERE_CLICKED);
		this.eventBus.createEventIfNotExists(constants.eventBusEvents.SIDEBAR_TOGGLE);
		
		this.defaultState = browserInfo.getBrowserInfo().isMobile ? 'collapsed' : 'normal';
	}
	
	public getPageMode(): string {
		switch (this.pageMode) {
			case PageMode.Extended:
				return 'extended';
			case PageMode.FullWidth:
				return 'full-width';
			case PageMode.Normal:
				return '';
			default:
				throw new Error('Out of range');
		}
	}
	
	public clickedSomewhere($event: MouseEvent): void {
		this.eventBus.raise(this.constants.eventBusEvents.SOMEWHERE_CLICKED, null, [$event]);
	}
	
	public ngOnInit(): void {
		const splashScreen = document.getElementById('loading-splash-screen');
		
		if ( splashScreen ) {
			$(splashScreen).animate({ opacity: 0 }, 1000, () => {
				$(splashScreen).remove();
			});
		}
		
		this.titleService.setTitle('Главная страница');
	}
}
