import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector   : 'core-float-area',
	templateUrl: 'float-area.component.html',
	styleUrls  : ['float-area.component.sass']
})
export class FloatAreaComponent implements OnInit, DoCheck {

	@Input()
	public visible: boolean;

	@Output()
	public onOpen: EventEmitter<any> = new EventEmitter();

	@Output()
	public onClose: EventEmitter<any> = new EventEmitter();

	public _internalVisibility: boolean;

	public constructor() {
		this.visible = false;
	}

	public ngOnInit(): void {
		if (this.visible) {
			this.show();
		}
	}

	public ngDoCheck(): void {
		if (this.visible) {
			this.show();
		} else {
			this.close();
		}
	}

	public show(): void {
		if (!this._internalVisibility) {
			this.onOpen.emit();
			this.visible = true;
		}
	}

	public close() {
		this.onClose.emit();
	}
}
