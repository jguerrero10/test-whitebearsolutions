import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCurrentComponent } from './form-current.component';

describe('FormCurrentComponent', () => {
  let component: FormCurrentComponent;
  let fixture: ComponentFixture<FormCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCurrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
