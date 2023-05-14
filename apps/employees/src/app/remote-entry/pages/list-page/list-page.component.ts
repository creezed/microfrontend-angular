import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'practica-employees-list-page',
  templateUrl: 'list-page.component.html',
})
export class ListPageComponent {
  constructor(private router: Router) {}
  @HostBinding('class') classes = 'w-full';
  createEmployee() {
    this.router.navigate(['/employees/add']);
  }
}
