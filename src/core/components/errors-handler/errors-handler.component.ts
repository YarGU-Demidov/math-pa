import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'core/services/message-bus-service/event-bus.service';
import { Constants } from 'core/services/constants-service/constants.service';

@Component({
	selector   : 'error-handler',
	templateUrl: 'errors-handler.component.html',
	styleUrls  : ['errors-handler.component.sass']
})
export class ErrorsHandlerComponent implements OnInit {
	
	public criticalVisibility: boolean = false;
	public criticalTitle: string       = 'Critical error occurred!';
	public criticalBody: string        = 'Something went wrong.';
	
	public simpleVisibility: boolean = false;
	public simpleTitle: string       = 'Error occurred!';
	public simpleBody: string        = 'Something went wrong.';
	
	private eventBus: EventBusService;
	
	private static criticalErrorsHandler(message: string, thisContext: ErrorsHandlerComponent): void {
		thisContext.criticalVisibility = true;
		thisContext.criticalBody       = message;
	}
	
	private static simpleErrorsHandler(title: string, message: string, thisContext: ErrorsHandlerComponent): void {
		thisContext.simpleVisibility = true;
		thisContext.simpleTitle      = title;
		thisContext.simpleBody       = message;
	}
	
	private static simpleErrorsCloseHandler(thisContext: ErrorsHandlerComponent): void {
		thisContext.simpleVisibility = false;
	}
	
	private static warningsHandler(): void {
	
	}
	
	public constructor(eventBus: EventBusService, constants: Constants) {
		this.eventBus = eventBus;
		eventBus.subscribe(constants.eventBusEvents.CRITICAL_ERROR_EVENT_NAME, ErrorsHandlerComponent.criticalErrorsHandler, this);
		eventBus.subscribe(constants.eventBusEvents.ERROR_EVENT_NAME, ErrorsHandlerComponent.simpleErrorsHandler, this);
		eventBus.subscribe(constants.eventBusEvents.ERROR_EVENT_NAME_CLOSE, ErrorsHandlerComponent.simpleErrorsCloseHandler, this);
	}
	
	public ngOnInit(): void {
	
	}
	
}
