import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoissonMenuComponent } from './card-boisson-menu.component';

describe('CardBoissonMenuComponent', () => {
  let component: CardBoissonMenuComponent;
  let fixture: ComponentFixture<CardBoissonMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoissonMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoissonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
