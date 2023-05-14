import { Component } from '@angular/core';

@Component({
  selector: 'practica-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
    <p-confirmDialog [style]="{ width: '50vw' }"></p-confirmDialog>
  `,
})
export class AppComponent {}
