import { Route } from '@angular/router';
import { AddEditPageComponent } from './pages/add-edit-page/add-edit-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

export const remoteRoutes: Route[] = [
  { path: '', component: ListPageComponent },
  { path: 'add', component: AddEditPageComponent },
  { path: 'edit/:id', component: AddEditPageComponent },
];
