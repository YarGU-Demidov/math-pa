import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../core/services/title-service/title.service';
import { PersonsProviderWithLoader } from '../../providers/persons-provider-with-loader';

@Component({
	selector   : 'persons-controller',
	templateUrl: 'persons-controller.component.html',
	styleUrls  : ['persons-controller.component.sass'],
	providers  : [
		PersonsProviderWithLoader
	]
})
export class PersonsControllerComponent implements OnInit {
	
	private pageTitle: string = 'Управление персонами';
	
	public constructor(titleService: TitleService) {
		titleService.setTitle(this.pageTitle);
	}
	
	public ngOnInit(): void {
	
	}
}
