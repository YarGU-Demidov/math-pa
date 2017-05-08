import { Component, OnInit, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/primeng';
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
	
	@ViewChild('selectDialog')
	private selectDialog: Dialog;
	
	public currentPerson: Person;
	
	public constructor() {
	}
	
	public ngOnInit(): void {
	
	}
}
