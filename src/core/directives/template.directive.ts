import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: '[core-template]'
})
export class TemplateDirective {
	public template: TemplateRef<any>;
	
	constructor(template: TemplateRef<any>) {
		this.template = template;
	}
}
