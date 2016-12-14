import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ImageUpload, Error, IImageUploadConfiguration, ImageUploadConfiguration} from "../../models";
import {ErrorType} from "../../enums";

const BYTES_IN_ONE_MB = 1048576;

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],

})
export class ImageUploadComponent implements OnInit {

  @Input('upload-config') opts: IImageUploadConfiguration;

  @Input('imageUploadModel') files: Array<ImageUpload>;

  @Output() onError: EventEmitter<any> = new EventEmitter();

  public config: IImageUploadConfiguration;

  private fileReader: FileReader;

  private currentFile: File;

  constructor() {

    this.config = new ImageUploadConfiguration();

    this.fileReader = new FileReader();
    this.fileReader.addEventListener('load', this._fileReaderLoad);
    this.fileReader.addEventListener('progress', this._fileReaderProgress);
  }

  /**
   * Angular2 lifecycle event, triggered after constructor()
   */
  ngOnInit() {
    this._processOptions();
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


  get totalUploadedSize() {
    let total = 0;

    for (let i = 0; i < this.files.length; i++) {
      total += this.files[i].size;
    }
    return total;
  }

  // -----------------------------------------------------------------


  /**
   * Upload file array
   *
   * @param {File[]} files
   */
  public upload(files: File[], elem: HTMLInputElement) {

    let filesLength = files.length;

    if (filesLength > 0) {
      for (let i = 0; i < filesLength; i++) {
     //   debugger;
        this.currentFile = files[i];
        //before reading file
        if (!this._validateImage(this.currentFile.type)) return;

        if (!this._validateFilesize(this.currentFile.size)) return;

        this.fileReader.readAsDataURL(this.currentFile);
      }
    }
    elem.value = '';
  }

  /**
   * Remove an image at index from ImageUploadComponent.images.
   *
   * @param {number} index
   */
  public removeImage(index: number) {
    let image = this.files.splice(index, 1);
    //this.cd.viewToModelUpdate(this.files);
   // this._onRemove(image[0]);
  }



  private _onError(error: Error) {
   // debugger;
    this.onError.emit(error);
  }

  private _fileReaderProgress = () => {
    // debugger;
    console.log("progress");
  }
  /**
   * Called after file loaded
   * This is a promisse
   * @private
   */
  private _fileReaderLoad = () => {
    //debugger;
    console.log("_fileReaderLoad begin")
    let imgData = this.fileReader.result;
    console.log("_fileReaderLoad result")
    var image = new Image();
    image.src = imgData;

    let img = new ImageUpload(imgData, this.currentFile.name, this.currentFile.size, image.height, image.width);

    if (!this._validateImageProportions(img)) return;
    if (!this._validateFilesize(img.size)) return;

    //this._onAdd(img); wat is hier de toegevoegde waarde van
//local
    console.log("_fileReaderLoad push")
    this.files.push(img);
    console.log("_fileReaderLoad end")
    //Upstream
  //  this.cd.viewToModelUpdate(this.files);
  }

  //Validations
  private _validateImage = (fileType: string) => {
    if (fileType.substring(0, 5) != 'image') {
      this._onError({
        type: ErrorType.NoValidImage,
        message: `The file: '${this.currentFile.name}' is not a valid image.`
      });
      return false;
    }
    return true
  }

  private _validateImageProportions = (image: ImageUpload) => {
    if (image.width === 0 || image.height === 0) {
      this._onError({
        type: ErrorType.NoValidImage,
        message: `The file: '${image.fileName}' is not a valid image.`
      });
      return false;
    }
    return true;
  }

  private _validateFilesize = (imageSize: number) => {
    if (this.config.maxFilesizeSum != null) {
      let total = (this.totalUploadedSize + imageSize) / BYTES_IN_ONE_MB;

      if (total > this.config.maxFilesizeSum) {
        this._onError({
          type: ErrorType.ExceedsUploadLimit,
          message: `Limit is set to ${this.config.maxFilesizeSum} MB, got ${total} MB.`
        });
        return false;
      }
    }
    return true;
  }



}
