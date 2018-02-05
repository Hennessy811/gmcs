import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { RecordsComponent } from './records/records.component';
import { PlanningComponent } from './planning/planning.component';
import {SystemComponent} from "./system.component";
import {SystemRoutingModule} from "./system-routing.module";
import { GridComponent } from './grid/grid.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DropdownDirective} from "./shared/directives/dropdown.directive";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    BillComponent,
    HistoryComponent,
    RecordsComponent,
    PlanningComponent,
    SystemComponent,
    GridComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective
  ]
})

export class SystemModule {

}
