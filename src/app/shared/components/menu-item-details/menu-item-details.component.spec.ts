import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemDetailsComponent } from './menu-item-details.component';

describe('MenuItemDetailsComponent', () => {
    let component: MenuItemDetailsComponent;
    let fixture: ComponentFixture<MenuItemDetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MenuItemDetailsComponent]
        });
        fixture = TestBed.createComponent(MenuItemDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
