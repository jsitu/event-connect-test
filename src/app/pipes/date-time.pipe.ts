import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'DateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch (args) {
      case 'time':
        return moment(value).format('hh:mm A');
      case 'day':
        return moment(value).format('ddd, MMM D h:mm A');
      case 'date':
        return moment(value).format('MM/DD/YYYY');
      default:
        return moment(value).format('MM/DD');
    }
  }

}
