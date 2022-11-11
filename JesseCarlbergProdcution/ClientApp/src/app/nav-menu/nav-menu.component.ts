import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, Subscription } from 'rxjs';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { LoggingService } from 'src/app/services/logging.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent  implements OnInit, OnDestroy {
  @ViewChild(MatSidenavContainer) sidenav: MatSidenavContainer | undefined;
  private subscription: Subscription | undefined;
  private searchSub: Subscription | undefined;
  public routerSubscription: Subscription | undefined;
  public breakPointSubscription: Subscription | undefined;
  public isLoading = false;
  public isSearching: boolean = false;
  public isMobile: boolean = true;
  public showSearch: boolean = false;
  public isOpened: boolean = false;
  public errorMsg: string | undefined;
  public searchQCtrl = new FormControl();
  public isAdmin: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private loggingService: LoggingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {


    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        // Show loading indicator
        if (this.isMobile) {
          this.isOpened = false;
        }
      }

      if (val instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (val instanceof NavigationError) {
        this.loggingService.logException(val.error);
      }
    });

    this.breakPointSubscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Handset,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.isMobile = true;
            this.isOpened = false;
          }
          if (result.breakpoints[Breakpoints.Handset]) {
            this.isMobile = true;
            this.isOpened = false;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.isMobile = true;
            this.isOpened = false;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.isMobile = false;
            this.isOpened = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.isMobile = false;
            this.isOpened = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.isMobile = false;
            this.isOpened = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.searchSub?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.breakPointSubscription?.unsubscribe();
  }

  searchSelection(selection: any): void {
    this.router.navigate([selection.Url]);
    this.searchQCtrl.reset();
  }

  open(e: any) {
    e.toggle();
  }

  displayFunc(value: any | null) {
    return '';
  }
}
