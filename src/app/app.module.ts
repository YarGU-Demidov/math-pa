import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalSideBarComponent } from './global-sidebar/global-sidebar.component';
import { GlobalContentComponent } from './global-content/global-content.component';
import { TitleService } from './services/title-service/title.service';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { EventBusService } from './services/message-bus-service/event-bus.service';

@NgModule({
	declarations: [
		AppComponent,
		GlobalSideBarComponent,
		GlobalContentComponent,
		MenuItemComponent
	],
	imports     : [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers   : [
		TitleService,
		EventBusService
	],
	bootstrap   : [AppComponent]
})
export class AppModule {
}
