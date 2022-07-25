import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBoissonComponent } from './menu-boisson.component';

describe('MenuBoissonComponent', () => {
  let component: MenuBoissonComponent;
  let fixture: ComponentFixture<MenuBoissonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBoissonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBoissonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
