import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { ArticuloPedidoModel } from 'src/app/Models/articulo-pedido-model';
import { PedidoModel } from 'src/app/Models/pedido-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';
import { PedidoService } from 'src/app/Servicios/pedido.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-pedido-nuevo',
  templateUrl: './pedido-nuevo.component.html',
  styleUrls: ['./pedido-nuevo.component.css']
})
export class PedidoNuevoComponent implements OnInit {


  form: FormGroup;
  art: FormGroup;
  pedidoCreado: PedidoModel = new PedidoModel;
  pedidoGuardado: boolean = false;
  articuloBuscado: ArticuloModel = new ArticuloModel;
  articulosPedidos: Array<ArticuloPedidoModel> = [];
  articulosModificarStock: Array<ArticuloModel> = [];
  articuloSeleccionado: ArticuloPedidoModel = new ArticuloPedidoModel;

  constructor(private servicioPedido: PedidoService, private servicioArticulo: ArticuloService,
    private servicioUsuario: UsuarioService, fb: FormBuilder, fb2: FormBuilder) {
    this.form = fb.group({
      "nombre": ["", Validators.required],
      "fecha": ["", Validators.required]

    });

    this.art = fb2.group({
      "articulonombre": ["", Validators.required],
      "cantidad": ["", Validators.required]
    });

  }
  ngOnInit(): void {
    this.buscarAticulo();
  }

  async nuevoPedido() {
    this.pedidoCreado.nombre = this.form.get('nombre')?.value;
    this.pedidoCreado.fecha = this.form.get('fecha')?.value;
    this.servicioUsuario.usuarioLogin.pedidos++;
    this.servicioUsuario.update(this.servicioUsuario.usuarioLogin, this.servicioUsuario.usuarioLogin.id).subscribe();
    this.servicioPedido.add(this.pedidoCreado).subscribe(
      data => {
        this.pedidoGuardado = true;
        this.servicioPedido.actualizarPedidos();
        this.actualizarStock();
      }
    );



  }
  articuloEnPedido: boolean = false;
  comprobar: boolean = false;
  async buscarAticulo() {
    this.articuloEnPedido = false;
    let data: Array<ArticuloModel> = await this.servicioArticulo.getByNombre(this.art.get('articulonombre')?.value);
    if (data.length > 0) {
      for (let articulo of data) {
        for (let art of this.articulosPedidos) {
          if (articulo.id == art.id) {
            this.articuloEnPedido = true;
          }
        }
        if (this.articuloEnPedido) {
          this.comprobar = false;
        } else {
          this.articuloBuscado = articulo;
          this.articuloEnPedido = false;
          this.comprobar = true;
        }

      }
    } else {
      this.comprobar = false;

    }
  }

  seleccionarArticulo(cantidad: number) {
    let articuloPedido: ArticuloPedidoModel = new ArticuloPedidoModel;
    let articuloStock: ArticuloModel = new ArticuloModel;
    //articulo pedido
    articuloPedido.nombre = this.articuloBuscado.nombre;
    articuloPedido.precioTotal = this.articuloBuscado.precio * cantidad;
    articuloPedido.id = this.articuloBuscado.id;
    articuloPedido.cantidad = cantidad;
    //articulo Modificar Stock
    articuloStock.id = this.articuloBuscado.id;
    articuloStock.stock = this.articuloBuscado.stock - cantidad;
    articuloStock.pedido += cantidad;
    this.articulosModificarStock.push(articuloStock);
    this.articulosPedidos.push(articuloPedido);
    this.pedidoCreado.articulos = this.articulosPedidos;
    this.comprobar = false;
    this.art.reset();
  }

  deleteArticulo(articulo: ArticuloPedidoModel) {
    let articuloDelete = new ArticuloModel;
    this.comprobar = false;
    this.articulosModificarStock = this.articulosModificarStock.filter(art => art.id !== articulo.id);
    this.articulosPedidos = this.articulosPedidos.filter(art => art !== articulo);
    this.pedidoCreado.articulos = this.pedidoCreado.articulos.filter(art => art !== articulo);
    console.log(this.articulosPedidos);
  }



  comprobarCantidad: boolean = false;
  Cantidad() {
    let cantidadreferencia: number = parseInt(this.art.get('cantidad')?.value);
    console.log(cantidadreferencia);
    if (cantidadreferencia > 0 && this.articuloBuscado.stock >= cantidadreferencia) {
      this.articuloSeleccionado.cantidad = cantidadreferencia;
      this.comprobarCantidad = false;
      console.log(this.articuloSeleccionado.cantidad);
    } else {
      this.comprobarCantidad = true;
    }
  }

  actualizarStock() {
    for (let art of this.articulosModificarStock) {
      this.servicioArticulo.getById(art.id).subscribe(
        data => {
          data.stock = art.stock;
          data.pedido = art.pedido;
          this.servicioArticulo.update(data, data.id).subscribe();

        }
      )
    }
  }

}
