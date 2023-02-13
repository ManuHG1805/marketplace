import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoNuevoComponent } from './pedido-nuevo.component';

describe('PedidoNuevoComponent', () => {
  let component: PedidoNuevoComponent;
  let fixture: ComponentFixture<PedidoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
