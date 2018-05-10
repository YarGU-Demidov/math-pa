import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersControllerComponent } from './routes/users-controller/users-controller.component';
import { HomeViewComponent } from './routes/home-view/home-view.component';
import { SiteSettingsComponent } from './routes/site-settings/site-settings.component';
import { GroupsControllerComponent } from './routes/groups-controller/groups-controller.component';
import { ListPersonsComponent } from './routes-components/list-persons-component/list-persons.component';
import { PersonsControllerComponent } from './routes/persons-controller/persons-controller.component';
import { CreatePersonComponent } from './routes-components/create-person-component/create-person.component';
import { ListUsersComponent } from './routes-components/list-users-component/list-users.component';
import { CreateUserComponent } from './routes-components/create-user-component/create-user.component';

const routes: Routes = [
	{
		path     : '',
		component: HomeViewComponent,
		children : []
	},
	{
		path     : 'persons',
		component: PersonsControllerComponent,
		children : [
			{
				path      : '',
				redirectTo: 'list',
				pathMatch : 'full'
			},
			{
				path     : 'list',
				component: ListPersonsComponent
			},
			{
				path     : 'add',
				component: CreatePersonComponent
			}
		],
	},
	{
		path     : 'users',
		component: UsersControllerComponent,
		children : [
			{
				path      : '',
				redirectTo: 'list',
				pathMatch : 'full'
			},
			{
				path     : 'list',
				component: ListUsersComponent
			},
			{
				path     : 'add',
				component: CreateUserComponent
			}
		]
	},
	{
		path     : 'groups',
		component: GroupsControllerComponent,
		children : []
	},
	{
		path     : 'site-settings',
		component: SiteSettingsComponent,
		children : []
	},
	{
		// TODO: заменить на NotFoundController!!!
		path      : '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports  : [RouterModule.forRoot(routes)],
	exports  : [RouterModule],
	providers: []
})
export class AppRoutingModule {
}
