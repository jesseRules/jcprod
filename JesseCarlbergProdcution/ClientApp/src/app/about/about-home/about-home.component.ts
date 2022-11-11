import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-about-home',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.css']
})
export class AboutHomeComponent  implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartColors: any[] = [
    {
      backgroundColor: [
        '#FF7360',
        '#6FC8CE',
        '#FAFFF2',
        '#FFFCC4',
        '#B9E8E0',
        '#FF7360',
        '#6FC8CE',
        '#FAFFF2',
      ],
    },
  ];
  public slidesList = new Array<any>();
  public showContent = false;
  public items: GalleryItem[] = [];
  public log: string[] = [];
  public lightboxref: any;
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
  public overlayColor: any;
  public color = '#010101';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public rowheight = 300;
  public mentoringTxt = 'Mentoring/Training';
  public sixTxt = 'Six Sigma/LEAN Problem Solving';
  public loading: Boolean = true;
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  public mChartData: any = {
    datasets: [
      {
        data: [10, 9, 4, 9, 7, 10, 6],
        label: 'Years',
        backgroundColor: 'rgba(0, 178, 185,0.8)',
        type: 'bar',
      },

    ],
    labels: [
      'Javascript',
      'C#',
      'Java',
      'SQL/DB',
      'Angular',
      'HTML/CSS',
      'Dev/Ops',
    ]
  };

  constructor(
    private gallery: Gallery,
    private lightbox: Lightbox,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        this.mentoringTxt = 'Mentoring/Training';
        this.sixTxt = 'Six Sigma/LEAN Problem Solving';
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
           
            this.rowheight = 340;
            this.hideArrows = true;
            this.hideIndicators = true;
            this.sixTxt = 'Six Sigma/ LEAN Problem Solving';
            this.mentoringTxt = 'Mentoring/ Training';
          }
          if (result.breakpoints[Breakpoints.Small]) {
  
            this.rowheight = 380;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
          if (result.breakpoints[Breakpoints.Medium]) {

            this.rowheight = 400;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {

            this.rowheight = 420;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {

            this.rowheight = 420;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
        }
      });
  }

  public imgData = [
    {
      srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES07649.jpg',
      previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES07649.jpg',
    },
    {
      srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08487.jpg',
      previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08487.jpg',
    },
    {
      srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06164.jpg',
      previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06164.jpg',
    },
    {
      srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08021.jpg',
      previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08021.jpg',
    },
  ];

  ngOnInit(): void {
    this.lightboxref = this.gallery.ref('lightbox');
    this.lightboxref.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
    });

    this.items = this.imgData.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    this.lightboxref.load(this.items);

    const slide = {
      img: '../../../assets/reviews/intuitivereview.png',
    };
    this.slidesList.push(slide);
    const slide1 = {
      img: '../../../assets/reviews/normaldatareview.png',
    };
    this.slidesList.push(slide1);
    const slide2 = {
      img: '../../../assets/reviews/attentionreview.png',
    };
    this.slidesList.push(slide2);
    const slide3 = {
      img: '../../../assets/reviews/endreview.png',
    };
    this.slidesList.push(slide3);

    const slide4 = {
      img: '../../../assets/reviews/jeffreview.png',
    };
    this.slidesList.push(slide4);

    const slide5 = {
      img: '../../../assets/reviews/excelreview.png',
    };
    this.slidesList.push(slide5);
  }

  public onChange(index: number) {
    this.log.push(`MatCarousel#change emitted with index ${index}`);
  }
}
