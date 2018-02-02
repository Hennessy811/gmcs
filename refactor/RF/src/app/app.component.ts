import {Component, OnInit, OnChanges, EventEmitter, SimpleChanges, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // @Output() getData = new EventEmitter();
  @Output() result = new EventEmitter();

  title = 'Grid';
  gotData = [];
  options = {
    url: "http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/0/0/0/0/-1/0/0/",
    paginate: {
      postOptions: [5, 15, 30, 50, 100],
      total: 0,
      pageNum: 1,
      postNum: 15
    },
    columns: [
      {
        name: 'Орг 1',
        prop: 'org1Description'
      },
      {
        name: 'Орг 2',
        prop: 'org2Description'
      },
      {
        name: 'Орг 3',
        prop: 'org3Description'
      },
      {
        name: 'Причина поломки',
        prop: 'developmentReason'
      },
      {
        name: 'Описание ЕО',
        prop: 'itemDescription'
      },
      {
        name: 'Описание причины',
        prop: 'reasonDescription'
      }
    ]
  };
  pageCount: any;
  pageList: any;
  filterVals = ['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  orgFilter = ['0', '0', '0'];

  constructor(private http: HttpClient) {
  }

  onAppliedFilter(): void {

    let tempURL: any = this.options.url;

    tempURL = this.options.url.split('/');
    tempURL[7] = this.orgFilter[0];
    tempURL[8] = this.orgFilter[1];
    tempURL[9] = this.orgFilter[2];
    this.options.url = tempURL.join('/');

    this.requestData();

  };
  requestData(): void {
    this.http
      .get(this.options.url + this.options.paginate.pageNum + "/" + this.options.paginate.postNum)
      .subscribe(
        data => {
          this.gotData = data['defects'];
          this.options.paginate.total = data['total'];

          this.result.emit(this.gotData);
          return this.gotData
        },
        err => {
          console.log("Soemthing went wrong...")
        }
      );
  }

  ngOnInit(): void {
    this.requestData();
  }
}
