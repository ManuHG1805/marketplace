import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';

@Component({
  selector: 'app-articulo-nuevo',
  templateUrl: './articulo-nuevo.component.html',
  styleUrls: ['./articulo-nuevo.component.css']
})
export class ArticuloNuevoComponent implements OnInit {

  form: FormGroup;
  articuloCreado: ArticuloModel = new ArticuloModel();
  articuloExiste: boolean = false;
  articuloGuardado:boolean=false;

  constructor(private servicio: ArticuloService, fb: FormBuilder) {
    this.form = fb.group({
      "nombre": ["",Validators.required],
      "precio": ["",Validators.required],
      "stock": ["",Validators.required],
      "imagen": [""]

    });
  }

  ngOnInit(): void {
  }

  async nuevoArticulo() {

    let data: Array<ArticuloModel> = await this.servicio.getByNombre(this.form.get('nombre')?.value);
    let comprobacion: boolean = false;
    for (let articulo of data) {
      if (this.form.get('nombre')?.value == articulo.nombre) {
        comprobacion = true;
      }
    }

    if (comprobacion) {
      this.articuloExiste = true;
      this.articuloGuardado=false;
    } else {
      
      this.articuloCreado.nombre = this.form.get('nombre')?.value;
      this.articuloCreado.precio = this.form.get('precio')?.value;
      this.articuloCreado.stock = this.form.get('stock')?.value;
      this.articuloCreado.pedido = 0;
      this.form.get('imagen')?.value==""?this.articuloCreado.imagen=
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fsymbol-blue-set-3%2F100%2FUntitled-1-94-512.png&f=1&nofb=1":
      this.articuloCreado.imagen=this.form.get('imagen')?.value;
      this.servicio.add(this.articuloCreado).subscribe(
        data=>{
          this.articuloExiste = false;
          this.articuloGuardado=true;
          this.servicio.actualizarArticulos();
        }
      );


    }
  }
}


