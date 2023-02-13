import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  @Output()
  updated: EventEmitter<void> = new EventEmitter();

  @Input()
  userUpdate: UsuarioModel = new UsuarioModel();
  form: FormGroup;

  constructor(fb: FormBuilder, private servicio: UsuarioService) {
    this.form = fb.group({
      "nombre": [""],
      "password": [""],
      "imagen": [""]

    });
  }

  ngOnInit(): void {
  }
  comprobacion: boolean = false;
  guardar() {
    this.servicio.findAll().subscribe(
      data => {
        this.comprobacion = false;
        for (let us of data) {
          if (us.nombre == this.form.get('nombre')?.value) {
            this.comprobacion = true;
          }
        }
        if (!this.comprobacion) {
          this.form.get('nombre')?.value == "" ? true : this.userUpdate.nombre = this.form.get('nombre')?.value;
          this.form.get('password')?.value == "" ? true : this.userUpdate.password = this.form.get('password')?.value;
          this.form.get('imagen')?.value == "" ? true : this.userUpdate.imagen = this.form.get('imagen')?.value;

          this.servicio.update(this.userUpdate, this.userUpdate.id).subscribe(
            data => this.updated.emit()
          );
        }
      }
    );
  }
}

   // this.servicio.findAll().subscribe(
    //   data=>{
    //     this.comprobacion=false;
    //     for(let us of data){
    //       if(us.nombre==this.form.get('nombre')?.value){
    //         this.comprobacion=true;
    //       }
    //     }
    //     if(!this.comprobacion){
    //       this.form.get('nombre')?.value==""?true:this.articuloUpdate.nombre=this.form.get('nombre')?.value;
    //       this.form.get('precio')?.value==""?true:this.articuloUpdate.precio=this.form.get('precio')?.value;
    //       this.form.get('stock')?.value==""?true:this.articuloUpdate.stock=this.form.get('stock')?.value;
    //       this.form.get('imagen')?.value==""?true:this.articuloUpdate.imagen=this.form.get('imagen')?.value;

    //       this.servicio.update(this.articuloUpdate,this.articuloUpdate.id).subscribe(
    //         data=>this.updated.emit()
    //       );
    //     }
    //   }


