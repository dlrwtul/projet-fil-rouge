import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitCardComponent } from './wait-card.component';

describe('WaitCardComponent', () => {
  let component: WaitCardComponent;
  let fixture: ComponentFixture<WaitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
