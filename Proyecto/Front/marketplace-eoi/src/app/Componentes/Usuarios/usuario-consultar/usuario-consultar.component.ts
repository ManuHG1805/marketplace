import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-usuario-consultar',
  templateUrl: './usuario-consultar.component.html',
  styleUrls: ['./usuario-consultar.component.css']
})
export class UsuarioConsultarComponent implements OnInit {

  us: FormGroup;
  usuarios: Array<UsuarioModel>=[];

  constructor(private servicio: UsuarioService , fb: FormBuilder, private router:Router) { 
    this.us = fb.group({
      "nombre": [""],
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.servicio.findAll().subscribe(
      (data:Array<UsuarioModel>)=>{
        this.usuarios = data},
      error => console.log("error"),
      () => console.log("my usuario is loaded")
    );
  }

  async buscarUsuario() {
    let data: Array<UsuarioModel> = await this.servicio.getByNombreParcial(this.us.get('nombre')?.value);
    console.log(data);
    this.usuarios=data;
  }

  usuarioDelete:UsuarioModel=new UsuarioModel;
  delete:boolean=false;
  deleteUsuarioComprobar(user:UsuarioModel){
    this.usuarioDelete=user;
    this.delete=true;
  }
  
  deleteUsuario(usuario:UsuarioModel){
   
    this.servicio.delete(usuario.id)
    .subscribe(
      data=>{
        this.getUsuarios();
        this.servicio.actualizarUsuarios();
        if(usuario.id==this.servicio.usuarioLogin.id){
          this.servicio.salir();
          this.servicio.userLoginDeleted.next(true);
        }
      }
    );
    this.getUsuarios();
    this.delete=false;
  }

  cancelarDelete(){
    this.delete=false;
  }

  userUpdate:UsuarioModel=new UsuarioModel();
  update:boolean=false;
  updateItem(user:UsuarioModel){
    this.userUpdate=user;
    this.update=true;
  }

  updated(){
    this.userUpdate=new UsuarioModel();
    this.update=false;
     }





}
