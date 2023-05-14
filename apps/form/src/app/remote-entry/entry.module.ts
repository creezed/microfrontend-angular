import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { FormComponent } from './components/form.component';
import { UserFormService } from './services/form.service';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { UserFormState } from './state/form.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [FormComponent],
  imports: [
    NgxsModule.forFeature([UserFormState]),
    RouterModule.forChild(remoteRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
  ],
  providers: [UserFormService],
  exports: [FormComponent],
})
export class RemoteEntryModule {}
