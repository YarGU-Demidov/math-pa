import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersControllerComponent } from './routes/users-controller/users-controller.component';
import { HomeViewComponent } from './routes/home-view/home-view.component';
import { SiteSettingsComponent } from './routes/site-settings/site-settings.component';

const routes: Routes = [
	{
		path    : '',
		component: HomeViewComponent,
		children: []
	},
	{
		path: 'users',
		component: UsersControllerComponent,
		children: []
	},
	{
		path: 'site-settings',
		component: SiteSettingsComponent,
		children: []
	}
];

@NgModule({
	imports  : [RouterModule.forRoot(routes)],
	exports  : [RouterModule],
	providers: []
})
export class AppRoutingModule {
}
