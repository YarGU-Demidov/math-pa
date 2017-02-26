import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSideBarComponent } from './global-sidebar.component';

describe('GlobalSideBarComponent', () => {
	let component : GlobalSideBarComponent;
	let fixture : ComponentFixture<GlobalSideBarComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GlobalSideBarComponent]
		})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture   = TestBed.createComponent(GlobalSideBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
