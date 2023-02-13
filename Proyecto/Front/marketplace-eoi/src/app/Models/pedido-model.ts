import { ArticuloModel } from "./articulo-model";
import { ArticuloPedidoModel } from "./articulo-pedido-model";

export class PedidoModel {
    id!:number;
    nombre!:string;
    fecha!:String;
    articulos!:ArticuloPedidoModel[];

    constructor(){

    }

}
