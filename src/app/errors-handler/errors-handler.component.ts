import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EventBusService } from "../services/message-bus-service/event-bus.service";

@Component({
	selector   : 'error',
	templateUrl: './errors-handler.component.html',
	styleUrls  : ['errors-handler.component.sass']
})
export class ErrorsHandlerComponent implements OnInit {

	public static CRITICAL_ERROR_EVENT_NAME: string = 'critical-error';

	@ViewChild('criticalError')
	public criticalErrorElem: ElementRef;

	public criticalVisibility: boolean = false;
	public criticalTitle: string       = "Critical error occurred!";
	public criticalBody: string        = "Something went wrong.";

	private eventBus: EventBusService;

	public constructor(eventBus: EventBusService) {
		this.eventBus = eventBus;
		eventBus.subscribe(ErrorsHandlerComponent.CRITICAL_ERROR_EVENT_NAME, ErrorsHandlerComponent.criticalErrorsHandler, this);
	}

	private static criticalErrorsHandler(message: string, thisContext: ErrorsHandlerComponent): void {
		thisContext.criticalVisibility = true;
		thisContext.criticalBody       = message;
	}

	private static warningsHandler(): void {
	}

	public ngOnInit(): void {
	}

}
