import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-ytube-example',
  templateUrl: './ytube-example.component.html',
  styleUrls: ['./ytube-example.component.css']
})
export class YtubeExampleComponent implements OnInit, AfterViewInit {
  public screenHeight: any;
  public screenWidth: any;
  public videoURL: string = 'https://www.youtube.com/embed/OXgF9GeoX8o';
  public safeURL: any;
  public ytHeight = 300;
  public ytWidth = 600;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenHeight = window.innerHeight - 250;
    this.screenWidth = window.innerWidth;
    this.ytWidth = this.screenWidth - this.screenWidth * 0.11 - 30;
    if (this.ytWidth >= 600) {
      this.ytWidth = 600;
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.onResize(null);
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit() {}

  copyText(event: any) {
    this.clipboardService.copy('npm install @angular/youtube-player');
  }
}
