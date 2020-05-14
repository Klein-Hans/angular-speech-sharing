import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  isOnDashboard: boolean = false;
  isAuthenticated: boolean = false;
  @Input() displayName: string;
  @Output() logout = new EventEmitter<any>();

  constructor(
    location: Location,  
    private element: ElementRef, 
    private router: Router
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnChanges() {   
  }

  ngOnInit(){
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    console.log(this.toggleButton)
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.isOnDashboard = val.url == '/dashboard';
        this.isAuthenticated = val.url == '/register' || val.url == '/login';
        if(this.isAuthenticated){
          this.toggleButton ? this.sidebarClose() : '';
          var $layer: any = document.getElementsByClassName('close-layer')[0];
          if ($layer) {
            $layer.remove();
            this.mobile_menu_visible = 0;
          }
        }
      }
    });
  }

  sidebarOpen() {
    console.log(this.isOnDashboard)
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
      console.log(toggleButton);  
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.contains('toggled') ? this.toggleButton.classList.remove('toggled') : '';
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
          $layer.remove();
      }
      setTimeout(function() {
          $toggle.classList.remove('toggled');
      }, 400);

        this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
          $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
          document.getElementsByClassName('main-panel')[0].appendChild($layer);
      }else if (body.classList.contains('off-canvas-sidebar')) {
          document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function() {
          $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function() {
            $layer.remove();
            $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  };

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  onLogout() {
    this.logout.emit();
  }
}
