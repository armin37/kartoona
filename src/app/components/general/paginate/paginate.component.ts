import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {count} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {
  @Output() onChangePage: EventEmitter<any> = new EventEmitter();
  currentPage = 0;
  count = 0;
  @Input() buttons = 5;
  buttonsList = [];
  @Input() next = true;
  @Input() previous = true;
  @Input('previous-next') pn = true;
  @Input() start = true;
  @Input() end = true;
  @Input('start-end') se = true;

  @Input() set current(value: number) {

    this.currentPage = value;
    this.calculatePaginate();

  }

  get current(): number {

    return this.currentPage;

  }

  @Input() set pageCount(value: number) {
    this.buttons = value < this.buttons ? value : this.buttons;
    this.count = value;
    this.calculatePaginate();
  }

  get pageCount(): number {

    return this.count;

  }

  baseUrl = '';

  constructor(private router: Router) {
    // console.log(router)
  }

  ngOnInit(): void {
    this.calculatePaginate();
  }

  calculatePaginate = () => {
    const slugs = this.router.url.split('/');
    if (!isNaN(parseInt(slugs[slugs.length - 1]))) {
      slugs.splice(slugs.length - 1);
    }
    this.baseUrl = slugs.join('/');
    console.log(slugs, this.baseUrl);
    // console.log(this.currentPage)
    this.buttonsList = [];
    if (this.current > 0 && this.count > 0) {
      let isFirst = false;
      let isLast = false;
      for (let i = 0; i < this.buttons && i < this.count; i++) {
        const calc = parseInt((this.currentPage - parseInt((this.buttons / 2).toString()) + i).toString());
        if ((calc > 0 && calc < this.count) && !isFirst && !isLast)
          this.buttonsList.push(calc);
        else if (calc >= this.count && !isLast) {
          isLast = true;
          this.buttonsList.push(calc);
        }
        else if (isLast) {
          this.buttonsList.unshift(this.count - i);
        }
        else {
          isFirst = true;
          this.buttonsList.push(i + 1);
        }
      }
    }
    // if (this.current > 0 && this.count > 0) {
    //   if (this.current - 1 > 0) {
    //     this.previous = this.current - 1;
    //   } else {
    //     this.previous = -1;
    //   }
    //   if (this.current + 1 < this.count) {
    //     this.next = this.current + 1;
    //   } else {
    //     this.next = -1;
    //   }
    // }
  }


  changePage(index) {
    this.router.navigateByUrl(this.baseUrl + '/' + index)
    this.onChangePage.emit(index);
  }

}
