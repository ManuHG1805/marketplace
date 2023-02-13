import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloModel } from '../Models/articulo-model';
import { PedidoModel } from '../Models/pedido-model';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class PruebaService extends ServiceService<ArticuloModel> {

  constructor(protected http:HttpClient) { 
    super(http, "/articulo")
    this.findAll().subscribe(
      data=>this.items=data
    
    )
  }

  items:Array<ArticuloModel>=[];

}
