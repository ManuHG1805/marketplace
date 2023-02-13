import { Component, OnInit } from '@angular/core';
import { ArticuloModel } from './Models/articulo-model';
import { PruebaService } from './Servicios/prueba.service';
import { UsuarioService } from './Servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private servicioUsuario:UsuarioService){}
  title = 'marketplace-eoi';
  
  logged:boolean=false;
  userLogin(){
    this.logged=true;
  }

  logout(){
    this.logged=false;
  }

 ngOnInit(){
  this.servicioUsuario.userLoginDeleted.asObservable().subscribe(
    data=>{this.logged=data==false?true:false;}
  )
 }
  
}
