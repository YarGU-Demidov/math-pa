import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/primeng';
import { BrowserInfoService, BrowserInfo } from 'core/core.module';

@Component({
	selector   : 'select-person',
	templateUrl: 'select-person.component.html',
	styleUrls  : ['select-person.component.sass'],
	providers  : []
})
export class SelectPersonComponent implements OnInit {
	
	private browserInfo: BrowserInfo;
	
	@ViewChild('selectDialog')
	public selectDialog: Dialog;
	
	private dialogVisible: boolean = false;
	
	@Output()
	public visibleChange: EventEmitter<boolean> = new EventEmitter();
	
	@Input()
	public get visible(): boolean {
		return this.dialogVisible;
	}
	
	public set visible(value: boolean) {
		this.dialogVisible = value;
		this.visibleChange.emit(this.dialogVisible);
	}
	
	public get dialogWidth(): number {
		return 0.7 * this.browserInfo.getWidth();
	}
	
	public constructor(browserInfoService: BrowserInfoService) {
		this.browserInfo = browserInfoService.getBrowserInfo();
	}
	
	public ngOnInit(): void {
	
	}
}
