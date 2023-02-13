import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UsuarioModel } from '../Models/usuario-model';
import { environment } from 'src/environments/environment';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceService<UsuarioModel> {

  numeroUsers=new Subject<number>();

  constructor(protected http:HttpClient,private router:Router) { 
    super(http, "/usuario")
   
  }

  usuarioLogin:UsuarioModel=new UsuarioModel();

  userLoginDeleted=new Subject<boolean>();
  salir(){
    this.usuarioLogin=new UsuarioModel();  
  }

  actualizarUsuarios(){
    this.findAll().subscribe(
      data=>{
        this.numeroUsers.next(data.length);
      }    
      );
  }
}
