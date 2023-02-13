import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(private serviciousuario:UsuarioService,private router:Router) { }

  ngOnInit(): void {
  }
  
  eleccion:string="";
  marcado:boolean=false;
  optionButton(eleccion:string){
    this.eleccion=eleccion;
    this.marcado=true; 
    this.router.navigate([""]);
    
  }


  nuevo(){
    switch(this.eleccion){
      case "usuarios":
        this.router.navigate(["/nuevoUsuario"]);
        break;
        case "articulos":
          this.router.navigate(["/nuevoArticulo"]);
        break;
        case "pedidos":
          this.router.navigate(["/nuevoPedido"]);
        break;
    }
  }


  consultar(){
    switch(this.eleccion){
      case "usuarios":
        this.router.navigate(["/usuariosConsultar"]);
        break;
        case "articulos":
          this.router.navigate(["/articulosConsultar"]);
        break;
        case "pedidos":
          this.router.navigate(["/pedidosConsultar"]);
        break;
    }
    // let url:string=`/${this.eleccion}Consultar`;
    // this.router.navigate([url]);
  }

  @Output()
  logout:EventEmitter<void>=new EventEmitter();

  salir(){
  this.logout.emit();
  }
 
}
