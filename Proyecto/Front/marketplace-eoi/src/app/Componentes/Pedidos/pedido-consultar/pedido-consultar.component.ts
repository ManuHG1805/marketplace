import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { PedidoModel } from 'src/app/Models/pedido-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';
import { PedidoService } from 'src/app/Servicios/pedido.service';

@Component({
  selector: 'app-pedido-consultar',
  templateUrl: './pedido-consultar.component.html',
  styleUrls: ['./pedido-consultar.component.css']
})
export class PedidoConsultarComponent implements OnInit {

  ped: FormGroup;

  constructor(private servicio: PedidoService, private servicioArticulo: ArticuloService, fb: FormBuilder) {
    this.ped = fb.group({
      "nombre": [""],
    });
  }

  ngOnInit(): void {
    this.getPedidos();
  }

  pedidos: Array<PedidoModel> = [];
  getPedidos() {
    this.servicio.findAll().subscribe(
      (data: Array<PedidoModel>) => {
        this.pedidos = data
      },
      error => console.log("error"),
      () => console.log("my pedido is loaded")
    );
  }

  pedidoDelete: PedidoModel = new PedidoModel;
  delete: boolean = false;
  deletePedidoComprobar(art: PedidoModel) {
    this.pedidoDelete = art;
    this.delete = true;
  }

  deletePedido(pedido: PedidoModel) {
    let articuloDelete = new ArticuloModel;
    for (let articulo of pedido.articulos) {
      this.servicioArticulo.getById(articulo.id).subscribe(
        data => {
          console.log(data);
          articuloDelete = data;
          articuloDelete.stock += articulo.cantidad;
          this.servicioArticulo.update(articuloDelete, articuloDelete.id).subscribe();
        }
      );
    }
    this.servicio.delete(pedido.id)
      .subscribe(
        data => {
          this.getPedidos();
          this.servicio.actualizarPedidos();
        }
      );
    this.getPedidos();
    this.delete = false;
  }

  cancelarDelete() {
    this.delete = false;
  }

  async buscarPedido() {
    let data: Array<PedidoModel> = await this.servicio.getByNombreParcial(this.ped.get('nombre')?.value);
    console.log(data);
    this.pedidos = data;
  }

  pedidoUpdate: PedidoModel = new PedidoModel;
  update: boolean = false;
  updateItem(ped: PedidoModel) {
    this.pedidoUpdate = ped;
    this.update = true;
  }

  updated() {
    this.pedidoUpdate = new PedidoModel();
    this.update = false;
  }
}
