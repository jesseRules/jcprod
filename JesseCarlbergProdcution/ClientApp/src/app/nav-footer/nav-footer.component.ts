import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.css']
})
export class NavFooterComponent implements OnInit, OnDestroy {
  public currentYear = '2022';
  private breakPointSubscription: Subscription | undefined;
  public showMobileFooter = false;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this.breakPointSubscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.showMobileFooter = true;
          }

          if (result.breakpoints[Breakpoints.Small]) {
            this.showMobileFooter = false;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.showMobileFooter = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.showMobileFooter = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.showMobileFooter = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.breakPointSubscription?.unsubscribe();
  }
}
