import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessesPage } from './accesses.page';

describe('AccessesPage', () => {
  let component: AccessesPage;
  let fixture: ComponentFixture<AccessesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
