import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let h: any = Math.floor(value / 60);
    console.log(h);
    let m: any = value % 60;
    if (h > 0) {
      return this.convertNumberToString(h) + ' ساعت ' + ' و ' + m + ' دقیقه';
    }
    return m + ' دقیقه';
  }

  convertNumberToString = (number) => {
    const label = [
      'یک',
      'دو',
      'سه',
      'چهار',
      'پنج',
      'شش',
      'هفت',
      'هشت',
      'نه',
      'ده',
    ];
    return label[number - 1] ? label[number - 1] : number;
  };

}
