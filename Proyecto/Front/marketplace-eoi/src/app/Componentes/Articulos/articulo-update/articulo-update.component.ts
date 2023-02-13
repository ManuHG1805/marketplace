import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloModel } from 'src/app/Models/articulo-model';
import { UsuarioModel } from 'src/app/Models/usuario-model';
import { ArticuloService } from 'src/app/Servicios/articulo.service';


@Component({
  selector: 'app-articulo-update',
  templateUrl: './articulo-update.component.html',
  styleUrls: ['./articulo-update.component.css']
})
export class ArticuloUpdateComponent implements OnInit {

  @Output()
   updated:EventEmitter<void>=new EventEmitter();

   
   @Input()
   articuloUpdate:ArticuloModel=new ArticuloModel();

   form: FormGroup;
  constructor(private servicio:ArticuloService, fb: FormBuilder) {
    this.form = fb.group({
      "nombre": [""],
      "precio": [""],
      "stock": [""],
      "imagen": [""]

    });
   }

  ngOnInit(): void {
    console.log(this.articuloUpdate);
  }

  
 
  imprimir(){console.log(this.articuloUpdate);
  }

  comprobacion:boolean=false;
  guardar(){
    this.servicio.findAll().subscribe(
      data=>{
        this.comprobacion=false;
        for(let us of data){
          if(us.nombre==this.form.get('nombre')?.value){
            this.comprobacion=true;
          }
        }
        if(!this.comprobacion){
          this.form.get('nombre')?.value==""?true:this.articuloUpdate.nombre=this.form.get('nombre')?.value;
          this.form.get('precio')?.value==""?true:this.articuloUpdate.precio=this.form.get('precio')?.value;
          this.form.get('stock')?.value==""?true:this.articuloUpdate.stock=this.form.get('stock')?.value;
          this.form.get('imagen')?.value==""?true:this.articuloUpdate.imagen=this.form.get('imagen')?.value;
          
          this.servicio.update(this.articuloUpdate,this.articuloUpdate.id).subscribe(
            data=>this.updated.emit()
          );
        }
      }
    );
    
    
   
  }
}
