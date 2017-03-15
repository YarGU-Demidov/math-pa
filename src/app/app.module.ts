import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GlobalSideBarComponent } from "./global-sidebar/global-sidebar.component";
import { GlobalContentComponent } from "./global-content/global-content.component";
import { TitleService } from "./services/title-service/title.service";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { EventBusService } from "./services/message-bus-service/event-bus.service";
import { BrowserInfoService } from "./services/browser-info-service/browser-info.service";
import { ErrorsHandlerComponent } from './errors-handler/errors-handler.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { ApiService } from './services/api-service/api.service';

@NgModule({
	declarations: [
		AppComponent,
		GlobalSideBarComponent,
		GlobalContentComponent,
		MenuItemComponent,
		ErrorsHandlerComponent,
		UserBarComponent
	],
	imports     : [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		JsonpModule
	],
	providers   : [
		TitleService,
		ApiService,
		EventBusService,
		BrowserInfoService,
	],
	bootstrap   : [AppComponent]
})
export class AppModule {
}
