import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorsHandlerComponent } from './components/errors-handler/errors-handler.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyDirective } from './directives/empty-data.directive';
import { FooterDirective } from './directives/footer.directive';
import { HeaderDirective } from './directives/header.directive';
import { TemplateWrapperDirective } from './directives/template-wrapper.directive';
import { TemplateDirective } from './directives/template.directive';
import { LoadingStatusComponent } from './components/loading-status/loading-status.component';
import { DataListComponent } from './components/data-list/data-list.component';

// classes
export * from 'core/services/message-bus-service/events-storage-interface';
export * from 'core/services/message-bus-service/handler-storage';
export * from 'core/services/message-bus-service/handler';
export * from 'core/services/browser-info-service/browser-info';
export * from 'core/services/browser-info-service/os-type';
export * from 'core/services/api-service/data-protocol';
export * from 'core/services/api-service/method-args';
export * from 'core/services/api-service/controllers/auth-controller';
export * from 'core/services/api-service/controllers/menu-items-data-controller';
export * from 'core/services/api-service/controllers/persons-controller.component';
export * from 'core/services/api-service/controllers/settings-controller';
export * from 'core/services/api-service/controllers/users-info-controller';

// components
export * from 'core/components/data-list/data-list.component';
export * from 'core/components/errors-handler/errors-handler.component';
export * from 'core/components/loading/loading.component';
export * from 'core/components/loading-status/loading-status.component';

// directives
export * from 'core/directives/empty-data.directive';
export * from 'core/directives/footer.directive';
export * from 'core/directives/header.directive';
export * from 'core/directives/template-wrapper.directive';
export * from 'core/directives/template.directive';

// entities
export * from 'core/entities/user';
export * from 'core/entities/person';

// enums
export * from 'core/enums/sort-direction';

// interfaces
export * from 'core/interfasces/users-sortable';
export * from 'core/interfasces/filters-and-sort-data';
export * from 'core/interfasces/filters-data';
export * from 'core/interfasces/data-list-provider';

// services
export * from 'core/services/api-service/api.service';
export * from 'core/services/title-service/title.service';
export * from 'core/services/browser-info-service/browser-info.service';
export * from 'core/services/constants-service/constants.service';
export * from 'core/services/loading-indicator/loading-indicator.service';
export * from 'core/services/message-bus-service/event-bus.service';

// view models
export * from 'core/view-models/group-info';
export * from 'core/view-models/logout-result';
export * from 'core/view-models/logout-status';
export * from 'core/view-models/menu-item-data';
export * from 'core/view-models/user-info';

@NgModule({
	imports     : [
		CommonModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		BrowserModule
	],
	declarations: [
		// components
		LoadingComponent,
		ErrorsHandlerComponent,
		LoadingStatusComponent,
		DataListComponent,
		
		// directives
		TemplateDirective,
		TemplateWrapperDirective,
		HeaderDirective,
		FooterDirective,
		EmptyDirective
	],
	exports     : [
		// components
		LoadingComponent,
		ErrorsHandlerComponent,
		LoadingStatusComponent,
		
		// directives
		TemplateDirective,
		TemplateWrapperDirective,
		HeaderDirective,
		FooterDirective,
		EmptyDirective
	]
})
export class CoreModule {
}
