import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from 'core/core.module';
import { ApiService } from 'core/core.module';
import { BrowserInfoService } from 'core/core.module';
import { Constants } from 'core/core.module';
import { LoadingIndicatorService } from 'core/core.module';
import { EventBusService } from 'core/core.module';
import { TitleService } from 'core/core.module';

import { CriticalErrorService } from './services/critical-error-service/critical-error.service';
import { SimpleErrorService } from './services/simple-error/simple-error.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalContentComponent } from './components/global-content/global-content.component';
import { GlobalSideBarComponent } from './components/global-sidebar/global-sidebar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuSubItemComponent } from './components/menu-sub-item/menu-sub-item.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { GroupsControllerComponent } from './routes/groups-controller/groups-controller.component';
import { HomeViewComponent } from './routes/home-view/home-view.component';
import { SiteSettingsComponent } from './routes/site-settings/site-settings.component';
import { UsersControllerComponent } from './routes/users-controller/users-controller.component';
import { CreateUserComponent } from './routes-components/create-user-component/create-user.component';
import { ListUsersComponent } from './routes-components/list-users-component/list-users.component';
import { CreatePersonComponent } from './routes-components/create-person-component/create-person.component';
import { ListPersonsComponent } from './routes-components/list-persons-component/list-persons.component';

import {
	AccordionModule,
	ButtonModule,
	CalendarModule,
	DataTableModule,
	DialogModule,
	FileUploadModule,
	InputMaskModule,
	InputTextModule,
	SharedModule,
	TabViewModule
} from 'primeng/primeng';
import { PersonsControllerComponent } from './routes/persons-controller/persons-controller.component';

@NgModule({
	imports     : [
		CommonModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		SharedModule,
		DialogModule,
		TabViewModule,
		DataTableModule,
		ButtonModule,
		AccordionModule,
		InputTextModule,
		InputMaskModule,
		CalendarModule,
		FileUploadModule
	],
	declarations: [
		AppComponent,
		GlobalSideBarComponent,
		GlobalContentComponent,
		MenuItemComponent,
		UserBarComponent,
		MenuSubItemComponent,
		
		// routes
		UsersControllerComponent,
		PersonsControllerComponent,
		GroupsControllerComponent,
		HomeViewComponent,
		SiteSettingsComponent,
		
		CreateUserComponent,
		ListUsersComponent,
		CreatePersonComponent,
		ListPersonsComponent
	],
	providers   : [
		// services
		CriticalErrorService,
		SimpleErrorService,
		LoadingIndicatorService,
		TitleService,
		ApiService,
		EventBusService,
		BrowserInfoService,
		Constants
	],
	bootstrap   : [AppComponent]
})
export class AppModule {
}
