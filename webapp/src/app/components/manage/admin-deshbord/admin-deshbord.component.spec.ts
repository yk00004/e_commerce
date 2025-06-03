import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeshbordComponent } from './admin-deshbord.component';

describe('AdminDeshbordComponent', () => {
  let component: AdminDeshbordComponent;
  let fixture: ComponentFixture<AdminDeshbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeshbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDeshbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
