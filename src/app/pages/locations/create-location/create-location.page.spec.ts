import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLocationPage } from './create-location.page';

describe('CreateLocationPage', () => {
  let component: CreateLocationPage;
  let fixture: ComponentFixture<CreateLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
