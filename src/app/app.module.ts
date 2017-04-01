import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataListComponent } from '../core/components/data-list/data-list.component';
import { CoreModule } from '../core/core.module';
import { ApiService } from '../core/services/api-service/api.service';
import { BrowserInfoService } from '../core/services/browser-info-service/browser-info.service';
import { Constants } from '../core/services/constants-service/constants.service';
import { LoadingIndicatorService } from '../core/services/loading-indicator/loading-indicator.service';
import { EventBusService } from '../core/services/message-bus-service/event-bus.service';
import { TitleService } from '../core/services/title-service/title.service';

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
import { CriticalErrorService } from './services/critical-error-service/critical-error.service';
import { SimpleErrorService } from './services/simple-error/simple-error.service';

@NgModule({
	imports     : [
		CommonModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule
	],
	declarations: [
		AppComponent,
		GlobalSideBarComponent,
		GlobalContentComponent,
		MenuItemComponent,
		UserBarComponent,
		UsersControllerComponent,
		GroupsControllerComponent,
		HomeViewComponent,
		SiteSettingsComponent,
		MenuSubItemComponent,
		
		// core
		DataListComponent,
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
