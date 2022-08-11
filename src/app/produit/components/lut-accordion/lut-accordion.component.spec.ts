import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LutAccordionComponent } from './lut-accordion.component';

describe('LutAccordionComponent', () => {
  let component: LutAccordionComponent;
  let fixture: ComponentFixture<LutAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LutAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LutAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
