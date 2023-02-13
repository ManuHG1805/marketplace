import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloConsultarComponent } from './articulo-consultar.component';

describe('ArticuloConsultarComponent', () => {
  let component: ArticuloConsultarComponent;
  let fixture: ComponentFixture<ArticuloConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
