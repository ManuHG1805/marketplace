import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {
  transform(value: any[], propiedad: string): any {
    return value.reduce((acumulado,actual)=>{      
      return acumulado+actual[propiedad];
    },0);
  }
}
