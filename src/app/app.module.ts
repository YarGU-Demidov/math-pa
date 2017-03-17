import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalSideBarComponent } from './components/global-sidebar/global-sidebar.component';
import { GlobalContentComponent } from './components/global-content/global-content.component';
import { TitleService } from './services/title-service/title.service';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { EventBusService } from './services/message-bus-service/event-bus.service';
import { BrowserInfoService } from './services/browser-info-service/browser-info.service';
import { ErrorsHandlerComponent } from './components/errors-handler/errors-handler.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { ApiService } from './services/api-service/api.service';
import { Constants } from './services/constants-service/constants.service';
import { UsersControllerComponent } from './routes/users-controller/users-controller.component';
import { HomeViewComponent } from './routes/home-view/home-view.component';
import { SiteSettingsComponent } from './routes/site-settings/site-settings.component';
import { MenuSubItemComponent } from './components/menu-sub-item/menu-sub-item.component';

@NgModule({
	declarations: [
		AppComponent,
		GlobalSideBarComponent,
		GlobalContentComponent,
		MenuItemComponent,
		ErrorsHandlerComponent,
		UserBarComponent,
		UsersControllerComponent,
		HomeViewComponent,
		SiteSettingsComponent,
		MenuSubItemComponent
	],
	imports     : [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		JsonpModule
	],
	providers   : [
		Constants,
		TitleService,
		ApiService,
		EventBusService,
		BrowserInfoService,
	],
	bootstrap   : [AppComponent]
})
export class AppModule {
}
