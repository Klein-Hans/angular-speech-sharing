import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/users-dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/users/', title: 'User List',  icon:'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  isOnDashboard: boolean;
  isNotAuthenticated: boolean;
  @Output() logout = new EventEmitter<any>();
  
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.isOnDashboard = val.url == '/dashboard' ? false : true;
        this.isNotAuthenticated = val.url == '/register' || val.url == '/login' ? false : true;
      }
    });
   }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  onLogout() {
    this.logout.emit();
  }
}
