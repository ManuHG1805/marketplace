import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';

@Component({
  selector: 'app-articulo-consultar',
  templateUrl: './articulo-consultar.component.html',
  styleUrls: ['./articulo-consultar.component.css']
})
export class ArticuloConsultarComponent implements OnInit {
  art: FormGroup;
  articulos: Array<ArticuloModel>=[];

  constructor(private servicio:ArticuloService, fb: FormBuilder) {
    this.art = fb.group({
      "nombre": [""],
    });
   }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos(){
    this.servicio.findAll().subscribe(
      (data:Array<ArticuloModel>)=>{
        this.articulos = data},
      error => console.log("error"),
      () => console.log("my Articulo is loaded")
    );
  }

  async buscarArticulo() {
    let data: Array<ArticuloModel> = await this.servicio.getByNombreParcial(this.art.get('nombre')?.value);
    console.log(data);
    this.articulos=data;
  }

  articuloDelete:ArticuloModel=new ArticuloModel;
  delete:boolean=false;
  deleteArticuloComprobar(art:ArticuloModel){
    this.articuloDelete=art;
    this.delete=true;
  }

  deleteArticulo(articulo:ArticuloModel){
    this.servicio.delete(articulo.id)
    .subscribe(
      data=>{
        this.getArticulos();
        this.servicio.actualizarArticulos();
      }
    );
    this.getArticulos();
    this.delete=false;
  }

  cancelarDelete(){
    this.delete=false;
  }

  articuloUpdate:ArticuloModel=new ArticuloModel;
  update:boolean=false;
  updateItem(art:ArticuloModel){
    this.articuloUpdate=art;
    this.update=true;
  }

  updated(){
 this.articuloUpdate=new ArticuloModel();
 this.update=false;
  }

}
