import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoModel } from '../Models/pedido-model';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends ServiceService<PedidoModel> {


  constructor(protected http:HttpClient) { 
    super(http, "/pedido")
  
  }
  numeroPedidos=new Subject<number>();
  actualizarPedidos(){
    this.findAll().subscribe(
      data=>{
        this.numeroPedidos.next(data.length);
      }    
      );
  }

 }
