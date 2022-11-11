import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photography-home',
  templateUrl: './photography-home.component.html',
  styleUrls: ['./photography-home.component.css']
})
export class PhotographyHomeComponent implements OnInit {
  public data: any[] = [];
  public items: GalleryItem[] = [];
  public log: string[] = [];
  public lightboxref: any;
  public rowheight = 600;
  public bpsubscription: Subscription | undefined;

  constructor(
    private gallery: Gallery
  ) { }

  ngOnInit(): void {
    this.data = [
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES00202.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES00202.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES00261.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES00261.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES02388.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES02388.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06850.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06850.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES03219.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES03219.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06853.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06853.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08118.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08118.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08567.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08567.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08487.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES08487.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES09771.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES09771.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES01959.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES01959.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06401.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES06401.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES01897.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES01897.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES01076.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES01076.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES03141.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES03141.jpg',
      },
      {
        srcUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES03258.jpg',
        previewUrl: 'https://jessecarlbergproduction.azureedge.net/images/JES03258.jpg',
      },
    ];
    this.lightboxref = this.gallery.ref('lightbox');
    this.lightboxref.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
    });

    this.items = this.data.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    this.lightboxref.load(this.items);
    this.gallery.ref().load(this.items);
  }

}
