import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutListProduitComponent } from './ajout-list-produit.component';

describe('AjoutListProduitComponent', () => {
  let component: AjoutListProduitComponent;
  let fixture: ComponentFixture<AjoutListProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutListProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutListProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
