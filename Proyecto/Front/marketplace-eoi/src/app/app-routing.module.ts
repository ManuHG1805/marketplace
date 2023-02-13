import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticuloConsultarComponent } from './Componentes/Articulos/articulo-consultar/articulo-consultar.component';
import { ArticuloNuevoComponent } from './Componentes/Articulos/articulo-nuevo/articulo-nuevo.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { LoginComponent } from './Componentes/login/login.component';
import { PedidoConsultarComponent } from './Componentes/Pedidos/pedido-consultar/pedido-consultar.component';
import { PedidoNuevoComponent } from './Componentes/Pedidos/pedido-nuevo/pedido-nuevo.component';
import { UsuarioConsultarComponent } from './Componentes/Usuarios/usuario-consultar/usuario-consultar.component';
import { UsuarioNuevoComponent } from './Componentes/Usuarios/usuario-nuevo/usuario-nuevo.component';

const routes: Routes = [

  {path:'usuariosConsultar',component:UsuarioConsultarComponent},
  {path:'articulosConsultar',component:ArticuloConsultarComponent},
  {path:'pedidosConsultar',component:PedidoConsultarComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'nuevoUsuario',component:UsuarioNuevoComponent},
  {path:'nuevoPedido',component:PedidoNuevoComponent},
  {path:'nuevoArticulo',component:ArticuloNuevoComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
