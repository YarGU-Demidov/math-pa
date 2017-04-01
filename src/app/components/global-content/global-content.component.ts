import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { EventBusService } from '../../../core/services/message-bus-service/event-bus.service';
import { Constants } from '../../../core/services/constants-service/constants.service';
import { BrowserInfoService } from '../../../core/services/browser-info-service/browser-info.service';
import { BrowserInfo } from '../../../core/services/browser-info-service/browser-info';

@Component({
	selector   : 'global-content',
	templateUrl: 'global-content.component.html',
	styleUrls  : ['global-content.component.sass']
})
export class GlobalContentComponent implements OnInit, AfterViewInit {

	@ViewChild('contentArea')
	private contentArea: ElementRef;

	private eventBus: EventBusService;
	public browserInfo: BrowserInfo;
	public constants: Constants;

	constructor(eventBus: EventBusService, browserInfo: BrowserInfoService, constants: Constants) {
		this.eventBus    = eventBus;
		this.constants   = constants;
		this.browserInfo = browserInfo.getBrowserInfo();

		eventBus.subscribe(this.constants.eventBusEvents.SIDEBAR_TOGGLE, (currentState: string, previousState: string) => {
			this.toggleArea(currentState, previousState);
		});
	}

	public ngOnInit(): void {

	}

	public ngAfterViewInit(): void {
		if (this.browserInfo.isMobile) {
			this.toggleArea('collapsed', 'normal');
		}
	}

	private toggleArea(currentState: string, previousState: string) {
		this.contentArea.nativeElement.classList.remove(previousState);
		this.contentArea.nativeElement.classList.add(currentState);
	}

}
