import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOdoComponent } from './form-odo.component';

describe('FormOdoComponent', () => {
  let component: FormOdoComponent;
  let fixture: ComponentFixture<FormOdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
