import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent implements OnInit {
  form:FormGroup;
  usuarioCreado: UsuarioModel = new UsuarioModel;
  usuarioExiste: boolean = false;
  usuarioGuardado:boolean=false;
  constructor(private servicio: UsuarioService, fb: FormBuilder) { 
    this.form=fb.group({
      "nombre":["",Validators.required],
      "password":["",Validators.required],
      "imagen":[""]

    });
  }

  ngOnInit(): void {
  }

  async nuevoUsuario(){
   
    let data:Array<UsuarioModel>= await this.servicio.getByNombre(this.form.get('nombre')?.value);       
        let comprobacion:boolean=false;
        for(let usuario of data){
        if(this.form.get('nombre')?.value==usuario.nombre){          
          comprobacion=true;          
        }}  
             
        if(comprobacion){  
          this.usuarioExiste=true;
         this.usuarioGuardado=false;
        }else{
          this.usuarioCreado.nombre=this.form.get('nombre')?.value;
          this.usuarioCreado.password=this.form.get('password')?.value;
          this.form.get('imagen')?.value==""?this.usuarioCreado.imagen=
      "https://aumentada.net/wp-content/uploads/2015/05/user.png":
      this.usuarioCreado.imagen=this.form.get('imagen')?.value;   
          this.servicio.add(this.usuarioCreado).subscribe(
          data=>{  this.usuarioExiste=false;
         this.usuarioGuardado=true;
         this.servicio.actualizarUsuarios();
          });
        }}

}
