import { Component, OnInit } from '@angular/core';
declare let $: any;

enum PageMode {
	Extended,
	FullWidth,
	Normal
}

@Component({
	selector   : 'app-root',
	templateUrl: './app.component.html',
	styleUrls  : ['./app.component.sass']
})
export class AppComponent implements OnInit {
	private pageMode: PageMode = PageMode.Normal;
		
	private sidebarToggled: string = 'normal';
	
	
	
	public getPageMode(): string {
		switch (this.pageMode){
			case PageMode.Extended:
				return "extended";
			case PageMode.FullWidth:
				return "full-width";
			case PageMode.Normal:
				return "";
			default:
				throw new Error('Out of range');
		}
	}
	
	public ngOnInit(): void {
		const splashScreen = document.getElementById('loading-splash-screen');
		
		if (splashScreen) {
			$(splashScreen).animate({ opacity: 0 }, 1000, () => {
				$(splashScreen).remove();
			});
		}
	}
	
	public toggled( data: string ): void {
		this.sidebarToggled = data;
	}
}
