import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SystemComponent} from "./system.component";
import {BillComponent} from "./bill/bill.component";
import {HistoryComponent} from "./history/history.component";
import {PlanningComponent} from "./planning/planning.component";
import {RecordsComponent} from "./records/records.component";
import {GridComponent} from "./grid/grid.component";

const routes: Routes = [
  {path: '', component: SystemComponent, children: [
      {path: 'bill', component: BillComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'planning', component: PlanningComponent},
      {path: 'records', component: RecordsComponent},
      {path: 'grid', component: GridComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule{

}
