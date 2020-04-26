import { Component, OnInit, HostListener } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileMenu();
  }
  
  constructor() { }

  ngOnInit() {  
    console.log($(window).width());
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };
}
