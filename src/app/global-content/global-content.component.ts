import { Component, OnInit, Input, trigger, state, style, transition, animate, OnChanges } from '@angular/core';

@Component({
	selector   : 'global-content',
	templateUrl: './global-content.component.html',
	styleUrls  : ['global-content.component.sass'],
	animations : [
		trigger('sidebarState', [
			state('collapsed', style({
				paddingLeft: '58px'
			})),
			state('normal', style({
				paddingLeft: '250px'
			})),
			transition('collapsed => normal', animate('100ms ease-in')),
			transition('normal => collapsed', animate('100ms ease-out'))
		])
	]
})
export class GlobalContentComponent implements OnInit {
	
	@Input()
	public sidebarState = 'normal';
	
	constructor() {
		
	}
	
	public ngOnInit(): void {
	}
	
}
