import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticuloModel } from '../Models/articulo-model';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService extends ServiceService<ArticuloModel>{

  numeroArticulos=new Subject<number>();
  constructor(protected http:HttpClient) { 
    super(http, "/articulo")
    
  }
  
  
  articuloUpdate:ArticuloModel=new ArticuloModel();
  
  actualizarArticulos(){
    this.findAll().subscribe(
      data=>{
        this.numeroArticulos.next(data.length);
      }
      );
  }
  
}
