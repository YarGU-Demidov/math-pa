import { Component, OnInit, Output } from '@angular/core';
import { Person } from '../../../core/entities/person';
import { Constants } from '../../../core/services/constants-service/constants.service';

@Component({
	selector   : 'create-person',
	templateUrl: 'create-person.component.html',
	styleUrls  : ['create-person.component.sass']
})
export class CreatePersonComponent implements OnInit {
	
	@Output()
	public currentPerson: Person;
	
	public calendarLanguage: any;
	public yearRange: string;
	
	public constructor(constants: Constants) {
		this.currentPerson    = new Person();
		this.calendarLanguage = constants.calendarLanguages['ru'] || constants.calendarLanguages['en'];
		
		const currentYear = new Date().getFullYear();
		this.yearRange    = (currentYear - 100) + ':' + currentYear;
	}
	
	public ngOnInit(): void {
	}
	
	public diagnostic() {
		return JSON.stringify(this.currentPerson);
	}
}
