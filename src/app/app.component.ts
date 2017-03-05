import { Component, OnInit } from "@angular/core";
import { TitleService } from "./services/title-service/title.service";
import { EventBusService } from "./services/message-bus-service/event-bus.service";
import { BrowserInfoService } from "./services/browser-info-service/browser-info.service";
declare let $: any;

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
	private pageMode: PageMode     = PageMode.Normal;
	private sidebarToggled: string = 'normal';
	private titleService: TitleService;
	private eventBus: EventBusService;

	private somewhereClickEventName: string = 'somewhere-clicked';

	public defaultState: string;

	public constructor(title: TitleService, eventBus: EventBusService, browserInfo: BrowserInfoService) {
		this.titleService = title;
		this.eventBus     = eventBus;

		if (!this.eventBus.eventExists(this.somewhereClickEventName)) {
			this.eventBus.createEvent(this.somewhereClickEventName);
		}

		this.defaultState = browserInfo.getBrowserInfo().isMobile ? 'collapsed' : 'normal';
	}

	public getPageMode(): string {
		switch (this.pageMode) {
			case PageMode.Extended:
				return "extended";
			case PageMode.FullWidth:
				return "full-width";
			case PageMode.Normal:
				return "";
			default:
				throw new Error('Out of range');
		}
	}

	public clickedSomewhere($event: MouseEvent): void {
		this.eventBus.raise(this.somewhereClickEventName, null, [$event]);
	}

	public ngOnInit(): void {
		const splashScreen = document.getElementById('loading-splash-screen');

		if (splashScreen) {
			$(splashScreen).animate({ opacity: 0 }, 1000, () => {
				$(splashScreen).remove();
			});
		}

		this.titleService.setTitle("Главная страница");
	}

	public toggled(data: string): void {
		this.sidebarToggled = data;
	}
}
