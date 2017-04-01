import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../services/message-bus-service/event-bus.service';
import { Constants } from '../../services/constants-service/constants.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector   : 'core-loading-status',
	templateUrl: 'loading-status.component.html',
	styleUrls  : ['loading-status.component.sass']
})
export class LoadingStatusComponent implements OnInit {
	
	public constructor() {
	}
	
	public ngOnInit() {
	
	}
}
