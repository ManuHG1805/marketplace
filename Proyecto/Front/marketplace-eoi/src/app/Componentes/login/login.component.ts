import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  usuario:UsuarioModel=new UsuarioModel();
  usuarioErroneo=false;
  constructor(private servicio:UsuarioService,fb:FormBuilder,private router:Router) {
    this.form=fb.group({
      "usuario":[""],
      "password":[""]
    })
   }

  ngOnInit(): void {
  }

  @Output()
  userLogin:EventEmitter<void>=new EventEmitter();

  async login(){
    let data:Array<UsuarioModel>= await this.servicio.getByNombre(this.usuario.nombre);
        console.log(data);
        console.log(this.usuario);
        let comprobacion:boolean=false;
        for(let us of data){
        if(this.usuario.nombre==us.nombre && this.usuario.password==us.password){
          comprobacion=true;
          this.servicio.usuarioLogin=us;
        }    
        }
        if(comprobacion){  
              this.userLogin.emit();
            }else{
              this.usuarioErroneo=true;
            }
   
  }
}



