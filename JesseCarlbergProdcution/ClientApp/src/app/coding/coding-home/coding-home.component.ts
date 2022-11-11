import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-coding-home',
  templateUrl: './coding-home.component.html',
  styleUrls: ['./coding-home.component.css']
})
export class CodingHomeComponent implements OnInit, OnDestroy {

  constructor(private breakpointObserver: BreakpointObserver) {
   
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }


  ngOnInit() {}

  ngOnDestroy() {
  }
}
