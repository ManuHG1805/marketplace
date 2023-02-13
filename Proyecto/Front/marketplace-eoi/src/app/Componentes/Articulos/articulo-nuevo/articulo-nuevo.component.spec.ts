import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloNuevoComponent } from './articulo-nuevo.component';

describe('ArticuloNuevoComponent', () => {
  let component: ArticuloNuevoComponent;
  let fixture: ComponentFixture<ArticuloNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
