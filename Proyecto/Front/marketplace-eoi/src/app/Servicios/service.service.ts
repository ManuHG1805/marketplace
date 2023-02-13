import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceService<T>{

  constructor(protected http:HttpClient, protected base:String) {

    this.URL=environment.URLBACK+base;
  }
  
   URL:string;
      findAll():Observable<Array<T>>{
        return this.http.get<Array<T>>(this.URL);
      }
    
       httpOptions = {
        headers: new HttpHeaders({
          'Content-type':'application/json',
          'Authorization':'my-auth-token'
        })
      };
     
      add(item:T): Observable<T>{
        return this.http.post<T>(this.URL,item,this.httpOptions)
      }
    
      update(item:T,id:number):Observable<T>{
        let url=`${this.URL}/${id}`;
        return this.http.put<T>(url,item,this.httpOptions);
      }
    
      delete(id:number):Observable<{}>{
        let url=`${this.URL}/${id}`;
        return this.http.delete<T>(url,this.httpOptions);
      }
    
      getById(id:number):Observable<T>{
        let url=`${this.URL}/${id}`;
        return this.http.get<T>(url,this.httpOptions);
      }
      // getById(id:number):Promise<T>{
      //   let url=`${this.URL}/${id}`;
      //   return this.http.get<T>(url,this.httpOptions).toPromise();
      // }
    
      // getByNombre(nombre:string):Observable<Array<T>>{
      //   let url=`${this.URL}?nombre=${nombre}`;
      //   return this.http.get<Array<T>>(url,this.httpOptions);
      // }
      getByNombre(nombre:string):Promise<Array<T>>{
        let url=`${this.URL}?nombre=${nombre}`;
        return this.http.get<Array<T>>(url,this.httpOptions).toPromise();
      }

      getByNombreParcial(nombre:string):Promise<Array<T>>{
        let url=`${this.URL}?nombre_like=${nombre}`;
        return this.http.get<Array<T>>(url,this.httpOptions).toPromise();
      }
      
  }

