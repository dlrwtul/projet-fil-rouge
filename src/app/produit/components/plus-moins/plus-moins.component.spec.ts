import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMoinsComponent } from './plus-moins.component';

describe('PlusMoinsComponent', () => {
  let component: PlusMoinsComponent;
  let fixture: ComponentFixture<PlusMoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusMoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusMoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
