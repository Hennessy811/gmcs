import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  constructor() { }

  @Input()options;
  @Output() requestData = new EventEmitter();

  get pages() {
    return this.generatePagination(this.options.paginate.pageNum, Math.floor(this.options.paginate.total / this.options.paginate.postNum));
  }

  goToPage(page: string): void {
    if (page == 'prev') {
      this.options.paginate.pageNum --;

    } else if (page == 'next') {
      this.options.paginate.pageNum ++;

    } else {
      this.options.paginate.pageNum = Number(page);
    }
    this.requestData.emit()
  }

  generatePagination(current: number, numberOfPages: number): void {
    let delta = 2,
      range = [],
      rangeWithDots: any = [],
      l; //

    range.push(1);
    for (let i = current - delta; i <= current + delta; i++) {
      if (i < numberOfPages && i > 1) {
        range.push(i);
      }
    }
    if (numberOfPages != 1) range.push(numberOfPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  ngOnInit() {
  }

}
