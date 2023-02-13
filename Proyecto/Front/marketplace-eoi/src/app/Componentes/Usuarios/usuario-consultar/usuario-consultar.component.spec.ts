import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConsultarComponent } from './usuario-consultar.component';

describe('UsuarioConsultarComponent', () => {
  let component: UsuarioConsultarComponent;
  let fixture: ComponentFixture<UsuarioConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
