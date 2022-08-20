import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLivreurComponent } from './card-livreur.component';

describe('CardLivreurComponent', () => {
  let component: CardLivreurComponent;
  let fixture: ComponentFixture<CardLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLivreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
