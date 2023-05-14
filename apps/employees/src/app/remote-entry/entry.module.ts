import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EmployeeListComponent } from './components/list/employee-list.component';
import { EmployeeFormComponent } from './components/form/employee-form.component';
import { EmployeeService } from './services/employee.service';
import { AddEditPageComponent } from './pages/add-edit-page/add-edit-page.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    ListPageComponent,
    AddEditPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    HttpClientModule,
    TableModule,
    ButtonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    ProgressSpinnerModule,
  ],
  providers: [EmployeeService],
  exports: [EmployeeFormComponent],
})
export class RemoteEntryModule {}
