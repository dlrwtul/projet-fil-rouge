import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneProduitComponent } from './ligne-produit.component';

describe('LigneProduitComponent', () => {
  let component: LigneProduitComponent;
  let fixture: ComponentFixture<LigneProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
