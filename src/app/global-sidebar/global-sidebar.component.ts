import {
	Component, OnInit, Output, EventEmitter, trigger, state, style, animate, transition,
	ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

declare let $: any;

@Component({
	selector   : 'global-sidebar',
	templateUrl: 'global-sidebar.component.html',
	styleUrls  : ['global-sidebar.component.sass'],
	animations : [
		trigger('userToggled', [
			state('collapsed', style({
				width: '58px'
			})),
			state('normal', style({
				width: '250px'
			})),
			transition('collapsed => normal', animate('100ms ease-in')),
			transition('normal => collapsed', animate('100ms ease-out'))
		])
	]
})
export class GlobalSideBarComponent implements OnInit, AfterViewInit {
	
	@Output()
	public isToggled = new EventEmitter();
	private userToggled: string;
	
	@ViewChild('menuBlock')
	private menuBlock: ElementRef;
	
	private menuItems = [
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Tasks', icon: 'assignment_turned_in', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Users', icon: 'face', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Calendar', icon: 'event', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
		{ name: 'Content', icon: 'art_track', clickHandler: GlobalSideBarComponent.menuItemClickHandler },
	];
	
	constructor() {
		
	}
	
	public ngOnInit() {
	}
	
	public ngAfterViewInit(){
		setTimeout(() => {
			$(this.menuBlock.nativeElement).mCustomScrollbar({
				axis:"y",
				theme:"minimal",
				setTop: 0,
				scrollInertia: 200
			});
		});
	}
	
	private static menuItemClickHandler($event, item) {
		console.log(item);
	}
	
	public toggled() {
		this.userToggled = this.userToggled == 'collapsed' ? 'normal' : 'collapsed';
		this.isToggled.emit(this.userToggled);
	}
	
}
