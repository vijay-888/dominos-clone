import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoleRequestsComponent } from './manage-role-requests.component';

describe('ManageRoleRequestsComponent', () => {
  let component: ManageRoleRequestsComponent;
  let fixture: ComponentFixture<ManageRoleRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRoleRequestsComponent]
    });
    fixture = TestBed.createComponent(ManageRoleRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
