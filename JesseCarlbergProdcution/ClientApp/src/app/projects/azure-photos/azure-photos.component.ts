import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GalleryItem, Gallery, ImageSize, ThumbnailsPosition, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AzurePhotoService } from './services/azure-photo.service';

@Component({
  selector: 'app-azure-photos',
  templateUrl: './azure-photos.component.html',
  styleUrls: ['./azure-photos.component.css']
})
export class AzurePhotosComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  public fileAttr = 'Choose File';
  public photoForm;
  public files: File[] = [];
  public imgList = [];
  public imgListJson: any;
  public items: GalleryItem[] = [];
  public log: string[] = [];
  public lightboxref: any;
  constructor(
    private gallery: Gallery,
    private lightbox: Lightbox,
    private fb: FormBuilder,
    private azurePhotoService: AzurePhotoService
  ) {
    this.photoForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.azurePhotoService.getImages().subscribe(
      (data: any) => {
        if (data.length > 8) {
          this.imgList = data.slice(0,8);
          this.imgListJson = this.imgList;
        }

      },

      (error: any) => {
        console.log(error);
      },
      () => {
        this.lightboxref = this.gallery.ref('lightbox');
        this.lightboxref.setConfig({
          imageSize: ImageSize.Contain,
          thumbPosition: ThumbnailsPosition.Top,
        });

        this.items = this.imgList.map(
          (item) => new ImageItem({ src: item, thumb: item })
        );

        this.lightboxref.load(this.items);
      }
    );
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      let resp = reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      if (this.fileInput)
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  saveForm(): void {
    console.log(this.photoForm);
    console.log(this.files);

    this.azurePhotoService.uploadImage(this.files).subscribe(
      (data: any) => {
        console.log(data);
      },

      (error: any) => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as any).result);
      };

      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  onSelect(event: any) {
    console.log(event);
    if (this.files && this.files.length >= 2) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
    this.readFile(this.files[0]).then((fileContents) => {
      // Put this string in a request body to upload it to an API.
      console.log(fileContents);
    });
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
