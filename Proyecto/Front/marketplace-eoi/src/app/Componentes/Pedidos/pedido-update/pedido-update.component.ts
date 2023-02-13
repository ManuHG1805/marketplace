import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { ArticuloPedidoModel } from 'src/app/Models/articulo-pedido-model';
import { PedidoModel } from 'src/app/Models/pedido-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';
import { PedidoService } from 'src/app/Servicios/pedido.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-pedido-update',
  templateUrl: './pedido-update.component.html',
  styleUrls: ['./pedido-update.component.css']
})
export class PedidoUpdateComponent implements OnInit {

  @Output()
  updated: EventEmitter<void> = new EventEmitter();

  @Input()
  pedidoUpdate: PedidoModel = new PedidoModel();

  form: FormGroup;
  art: FormGroup;
  pedidoCreado: PedidoModel = new PedidoModel;
  pedidoGuardado: boolean = false;
  articuloBuscado: ArticuloModel = new ArticuloModel;
  articulosPedidos: Array<ArticuloPedidoModel> = [];
  articuloSeleccionado: ArticuloPedidoModel = new ArticuloPedidoModel;

  constructor(private servicioPedido: PedidoService, private servicioArticulo: ArticuloService,
    private servicioUsuario: UsuarioService, fb: FormBuilder, fb2: FormBuilder) {
    this.form = fb.group({
      "nombre": [""],
      "fecha": [""]

    });

    this.art = fb2.group({
      "articulonombre": [""],
      "cantidad": ["", Validators.required]
    });

  }
  ngOnInit(): void {
    this.pedidoCreado = this.pedidoUpdate;
    this.articulosPedidos = this.pedidoUpdate.articulos;
    this.buscarAticulo();

  }

  async nuevoPedido() {
    this.form.get('nombre')?.value == "" ? true : this.pedidoCreado.nombre = this.form.get('nombre')?.value;
    this.form.get('fecha')?.value == "" ? true : this.pedidoCreado.fecha = this.form.get('fecha')?.value;
    this.servicioArticulo.update(this.articuloBuscado, this.articuloBuscado.id).subscribe();
    this.servicioUsuario.usuarioLogin.pedidos++;
    this.servicioUsuario.update(this.servicioUsuario.usuarioLogin, this.servicioUsuario.usuarioLogin.id).subscribe();
    this.servicioPedido.update(this.pedidoCreado, this.pedidoCreado.id).subscribe(
      data => {
        this.updated.emit();
        this.pedidoGuardado = true;
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
    this.art.reset();
    articuloPedido.nombre = this.articuloBuscado.nombre;
    articuloPedido.precioTotal = this.articuloBuscado.precio * cantidad;
    articuloPedido.id = this.articuloBuscado.id;
    articuloPedido.cantidad = cantidad;
    this.articuloBuscado.pedido = this.articuloBuscado.pedido + cantidad;
    this.articulosPedidos.push(articuloPedido);
    this.pedidoCreado.articulos = this.articulosPedidos;
    this.articuloBuscado.stock = this.articuloBuscado.stock - this.articuloSeleccionado.cantidad;
  }

  async deleteArticulo(articulo: ArticuloPedidoModel) {

    let articuloDelete = new ArticuloModel;
    this.comprobar = false;
    this.servicioArticulo.getById(articulo.id).subscribe(
      data => {
        console.log(data);
        articuloDelete = data;
        articuloDelete.stock += articulo.cantidad;
        this.servicioArticulo.update(articuloDelete, articuloDelete.id).subscribe();
      }
    );

    this.articulosPedidos = this.articulosPedidos.filter(art => art !== articulo);
    this.pedidoCreado.articulos = this.pedidoCreado.articulos.filter(art => art !== articulo);

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


}
