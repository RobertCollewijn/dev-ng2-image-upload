import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ImageUpload, Error, IImageUploadConfiguration, ImageUploadConfiguration} from "../../models";
import {ErrorType} from "../../enums";
import {ImageDataService} from "../../services"

const BYTES_IN_ONE_MB = 1048576;

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],


})
export class ImageUploadComponent implements OnInit {

  @Input('upload-config') opts: IImageUploadConfiguration;

  //@Input('imageUploadModel') files: Array<ImageUpload>;

  @Output() onError: EventEmitter<any> = new EventEmitter();

  public files: ImageUpload[]=[];
  //public files: Array<ImageUpload>=[];
  public config: IImageUploadConfiguration;

 // private fileReader: FileReader;

 // private currentFile: File;

  constructor(private imageDataService:ImageDataService ) {

    this.config = new ImageUploadConfiguration();
 //   this.fileReader = new FileReader();
 //   this.fileReader.addEventListener('load', this._fileReaderLoad);
 //   this.fileReader.addEventListener('progress', this._fileReaderProgress);
  }

  /**
   * Angular2 lifecycle event, triggered after constructor()
   */
  ngOnInit() {
    this._processOptions();
    this.imageDataService.image.subscribe(
      data=> {this.files.push(data);}
    );
  }

  /**
   * Process configuration object to set personalisation.
   *
   * @private
   */
  private _processOptions() {

    if (this.opts != null) {
      // addSectionHeader
      if (this.opts.addSectionHeader != null) {
        this.config.addSectionHeader = this.opts.addSectionHeader;
      }

      // uploadedHeader
      if (this.opts.uploadedHeader != null) {
        this.config.uploadedHeader = this.opts.uploadedHeader;
      }

      // buttonLabel
      if (this.opts.buttonLabel != null) {
        this.config.buttonLabel = this.opts.buttonLabel;
      }

      // accepts
      if (this.opts.accepts != null) {
        this.config.accepts = this.opts.accepts;
      }

      // maxFilesizeSum
      if (this.opts.maxFilesizeSum != null) {
        this.config.maxFilesizeSum = this.opts.maxFilesizeSum;
      }

      if (this.opts.style_maxHeight != null) {
        this.config.style_maxHeight = this.opts.style_maxHeight;
      }

      if (this.opts.style_maxWidth != null) {
        this.config.style_maxWidth = this.opts.style_maxWidth;
      }
    }
  }




  /**
   * Remove an image at index from ImageUploadComponent.images.
   *
   * @param {number} index
   */
  public removeImage(index: number) {
   // let image = this.files.splice(index, 1);
    //this.cd.viewToModelUpdate(this.files);
   // this._onRemove(image[0]);
  }



  private _onError(error: Error) {
   // debugger;
    this.onError.emit(error);
  }


}
