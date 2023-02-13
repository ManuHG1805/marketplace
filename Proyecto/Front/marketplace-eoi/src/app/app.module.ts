import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Componentes/nav/nav.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsuarioConsultarComponent } from './Componentes/Usuarios/usuario-consultar/usuario-consultar.component';
import { ArticuloConsultarComponent } from './Componentes/Articulos/articulo-consultar/articulo-consultar.component';
import { PedidoConsultarComponent } from './Componentes/Pedidos/pedido-consultar/pedido-consultar.component';
import { PedidoNuevoComponent } from './Componentes/Pedidos/pedido-nuevo/pedido-nuevo.component';
import { UsuarioNuevoComponent } from './Componentes/Usuarios/usuario-nuevo/usuario-nuevo.component';
import { ArticuloNuevoComponent } from './Componentes/Articulos/articulo-nuevo/articulo-nuevo.component';
import { UsuarioUpdateComponent } from './Componentes/Usuarios/usuario-update/usuario-update.component';
import { PedidoUpdateComponent } from './Componentes/Pedidos/pedido-update/pedido-update.component';
import { ArticuloUpdateComponent } from './Componentes/Articulos/articulo-update/articulo-update.component';
import { TotalPipe } from './Pipes/total.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    UsuarioConsultarComponent,
    ArticuloConsultarComponent,
    PedidoConsultarComponent,
    PedidoNuevoComponent,
    UsuarioNuevoComponent,
    ArticuloNuevoComponent,
    ArticuloUpdateComponent,
    UsuarioUpdateComponent,
    PedidoUpdateComponent,
    TotalPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
