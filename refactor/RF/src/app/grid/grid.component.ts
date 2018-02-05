import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {

  @Input() options;
  @Input() gotData;

  constructor() {
  }

  // goToPage($event): void {
  //   // let event = <HTMLInputElement>event;
  //   if (event.target.id == 'prev') {
  //     this.options.paginate.pageNum --;
  //     this.getData();
  //
  //   } else if ( event.target.id == 'next') {
  //     this.options.paginate.pageNum ++;
  //     this.getData();
  //
  //   } else {
  //     this.options.paginate.pageNum = Number(event.target.id);
  //     this.getData();
  //   }
  // };
  ngOnInit(): void {

  }
}


