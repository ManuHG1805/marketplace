import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';
import { PedidoService } from 'src/app/Servicios/pedido.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private articuloService:ArticuloService, private usuarioService:UsuarioService, private pedidoService:PedidoService ) { 
   
    this.userName=this.usuarioService.usuarioLogin.nombre;

  }


  ngOnInit(): void {
    this.cargarDatos();
    this.usuarioService.numeroUsers.asObservable().subscribe(
      data=>{this.numeroUsuarios=data;}
    )
    this.articuloService.numeroArticulos.asObservable().subscribe(
      data=>{this.numeroArticulos=data;}
    )
    this.pedidoService.numeroPedidos.asObservable().subscribe(
      data=>{this.numeroPedidos=data;}
    )
  }

  @Output()
  logout:EventEmitter<void>=new EventEmitter();
  
  cargarDatos(){
    this.pedidoService.findAll().subscribe(
      (data)=>{
        this.numeroPedidos=data.length;
      }
    );
    this.articuloService.findAll().subscribe(
      (data)=>{
        this.numeroArticulos=data.length;
      }
    );
    this.usuarioService.findAll().subscribe(
      (data)=>{
        this.numeroUsuarios=data.length;
      }
    );


  }
  numeroArticulos:Number=new Number();
  numeroUsuarios:Number=new Number();
  numeroPedidos:Number=new Number();
  userName:String=new String();

  salir(){
    this.usuarioService.salir();
    this.logout.emit();
  }
}
