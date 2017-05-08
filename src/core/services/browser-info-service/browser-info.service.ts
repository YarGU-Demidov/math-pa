import { Injectable } from '@angular/core';
import { BrowserInfo } from 'core/services/browser-info-service/browser-info';
import { EventBusService } from 'core/services/message-bus-service/event-bus.service';
import { Constants } from 'core/services/constants-service/constants.service';

@Injectable()
export class BrowserInfoService {
	
	private browserInfo: BrowserInfo;
	private eventBus: EventBusService;
	private constants: Constants;
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus    = eventBus;
		this.constants   = constants;
		this.browserInfo = BrowserInfo.parse(navigator.userAgent);
	}
	
	/**
	 * Returns Browser information
	 * @returns {BrowserInfo} Browser information
	 */
	public getBrowserInfo(): BrowserInfo {
		return this.browserInfo;
	}
	
	/**
	 * Sets browser resize to eventBus.
	 */
	public setResizeHandler(): void {
		this.eventBus.createEventIfNotExists(this.constants.eventBusEvents.WINDOW_RESIZE);
		window.addEventListener('resize', (event: Event) => {
			if ( window.requestAnimationFrame ) {
				window.requestAnimationFrame(() => {
					this.raise(event);
				});
			} else {
				setTimeout(() => {
					this.raise(event);
				}, 66);
			}
		});
	}
	
	private raise(event: Event): void {
		this.eventBus.raise(this.constants.eventBusEvents.WINDOW_RESIZE, window, [event, this.browserInfo.getHeight(), this.browserInfo.getWidth()]);
	}
}
