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
import { FloatAreaComponent } from './components/float-area/float-area.component';

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
		FloatAreaComponent,

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
		FloatAreaComponent,

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
