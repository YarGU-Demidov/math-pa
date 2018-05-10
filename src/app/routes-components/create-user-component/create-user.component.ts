import { Component, OnInit } from '@angular/core';
import { Person } from 'core/core.module';
import { UsersProviderWithLoader } from 'app/providers/users-provider-with-loader';

@Component({
	selector   : 'create-user',
	templateUrl: 'create-user.component.html',
	styleUrls  : ['create-user.component.sass'],
	providers  : [
		UsersProviderWithLoader
	]
})
export class CreateUserComponent implements OnInit {
	public selectDialogVisible: boolean = false;
	
	public currentPerson: Person;
	
	public constructor() {
	}
	
	public ngOnInit(): void {
	
	}
	
	public choosePerson(): void {
		this.selectDialogVisible = true;
	}
}
