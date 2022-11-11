import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewChecked,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-portfolio-home',
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.css']
})
export class PortfolioHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navmenu', { static: true })
  navRef: ElementRef| undefined;
  @ViewChild('awardsSection')
  awardsRef: ElementRef | undefined;
  @ViewChild('projects')
  projectsRef: ElementRef| undefined;
  @ViewChild('maps')
  mapsRef: ElementRef| undefined;
  @ViewChild('bigdata')
  dataRef: ElementRef| undefined;

  private barChart = [];
  private data = [];
  private labels = [];
  public slidesList = new Array<any>();
  public showContent = false;
  public parentHeight = 'auto';
  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public hideArrows = false;
  public hideIndicators = false;
  public maxWidth = 'auto';
  public maintainAspectRatio = true;
  public proportion = 25;
  public slideHeight = '200px';
  public slides = this.slidesList.length;
  public color = '#010101';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public log: string[] = [];
  public scrollingSubscription: Subscription;
  public navTop = 515;
  public showNav = false;
  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {
    this.scrollingSubscription = this.scrollDispatcher
      .scrolled()
      .subscribe((data: any) => {
        this.onWindowScroll(data);
      });

   
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.navRef) {
      this.navTop = this.navRef.nativeElement.offsetTop;
      this.ref.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollingSubscription) {
      this.scrollingSubscription.unsubscribe();
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  onWindowScroll(data: CdkScrollable) {
    if (data) {
      const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
      this.navTop = this.navRef?.nativeElement.offsetTop;
      if (scrollTop > this.navTop) {
        if (!this.showNav) {
          this.showNav = true;
          this.ref.detectChanges();
        }
      } else if (scrollTop <= this.navTop) {
        if (this.showNav) {
          this.showNav = false;
          this.ref.detectChanges();
        }
      } else {
        if (this.showNav) {
          this.showNav = false;
          this.ref.detectChanges();
        }
      }
    }
  }

  showNavMethod() {
    return this.showNav;
  }

  scroll(element: any) {
    if (element === 'awards') {
      this.awardsRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (element === 'projects') {
      this.projectsRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (element === 'maps') {
      this.mapsRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (element === 'bigdata') {
      this.dataRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
