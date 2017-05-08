import { Component, OnInit } from '@angular/core';
import { TitleService } from 'core/core.module';

@Component({
	selector   : 'groups-controller',
	templateUrl: 'groups-controller.component.html',
	styleUrls  : ['groups-controller.component.sass']
})
export class GroupsControllerComponent implements OnInit {
	private pageTitle: string = 'Управление группами';
	
	public constructor(titleService: TitleService) {
		titleService.setTitle(this.pageTitle);
	}
	
	public ngOnInit(): void {
	}
	
}
