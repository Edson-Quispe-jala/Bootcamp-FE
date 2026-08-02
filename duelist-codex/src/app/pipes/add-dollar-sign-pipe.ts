import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDollarSign',
})
export class AddDollarSignPipe implements PipeTransform {
  transform(value: string): string {
    return `$ ${value}`;
  }
}
