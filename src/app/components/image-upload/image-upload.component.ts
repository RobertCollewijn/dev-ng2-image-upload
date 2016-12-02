import {Component, OnInit, Input, Output, EventEmitter, Self} from '@angular/core';
import {ControlValueAccessor, NgModel} from "@angular/forms";

import {ImageUpload, Error, IImageUploadConfiguration, ImageUploadConfiguration} from "../../models";
import {ErrorType} from "../../enums";

const BYTES_IN_ONE_MB = 1048576;

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements ControlValueAccessor, OnInit {

  /**
   * Configuration object to customize ImageUploadComponent, mapped to ImageUploadComponent.config
   *
   * @type {IImageUploadConfiguration}
   */

  @Input('upload-config') opts: IImageUploadConfiguration;

  /**
   * OnChange event emitter, returns the removed single image.
   *
   * @type {EventEmitter<any>}
   */
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  /**
   * OnAdd event emitter, returns the added single image.
   *
   * @type {EventEmitter<any>}
   */
  @Output() onAdd: EventEmitter<any> = new EventEmitter();

  /**
   * OnError event emitter, returns an error message.
   *
   * @type {EventEmitter<any>}
   * @memberOf ImageUploadComponent
   */
  @Output() onError: EventEmitter<any> = new EventEmitter();

  // -----------------------------------------------------------------

  // public cd: NgModel;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  /**
   * Configuration object to customize ImageUploadComponent
   *
   * @type {ImageUploadConfiguration}
   */
  public config: IImageUploadConfiguration;

  // -----------------------------------------------------------------

  /**
   * Receives the File object and interprets
   * https://developer.mozilla.org/en-US/docs/Web/API/FileReader
   * @private
   * @type {FileReader}
   */
  private fileReader: FileReader;

  /**
   * Currently selected file object.
   *
   * @private
   * @type {File}
   */
  private currentFile: File;

  private files: ImageUpload[];

  // -----------------------------------------------------------------

  /**
   * Creates an instance of ImageUploadComponent.
   *
   */
  constructor() {

    // this.cd = cd;
    //  cd.valueAccessor = this;

    this.files = [];
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

  public writeValue(value: any): void {

  }

  /**
   * Upload file array
   *
   * @param {File[]} files
   */
  public upload(files: File[], elem: HTMLInputElement) {
    debugger;
    let filesLength = files.length;

    if (filesLength > 0) {
      for (let i = 0; i < filesLength; i++) {
        this.currentFile = files[i];
        let fileType = this.currentFile.type;
        fileType = (fileType).substring(0, 5);
        if (fileType.substring(0, 5)!='image') {
          this._onError({
            type: ErrorType.NoValidImage,
            message: `The file is not a valid image.`
          });
          return false;

        }
        console.log( "Type: " + files[i].type)
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
    this._onRemove(image[0]);
  }

  // -----------------------------------------------------------------


  /**
   * Emit an onremove event
   *
   * @private
   * @param {ImageUpload} image
   */
  private _onRemove(image: ImageUpload) {
    this.onRemove.emit(image);
  }

  /**
   * Emit an onadd event
   *
   * @private
   * @param {ImageUpload} image
   */
  private _onAdd(image: ImageUpload) {
    debugger;
    this.onAdd.emit(image);
  }

  private _onError(error: Error) {
    debugger;
    this.onError.emit(error);
  }

  private _fileReaderProgress = () => {
    // debugger;
  }
  /**
   * Called after file read
   *
   * @private
   */
  private _fileReaderLoad = () => {
    debugger;
    let imgData = this.fileReader.result;
    var image = new Image();
    image.src = imgData;

    let img = new ImageUpload(imgData, this.currentFile.name, this.currentFile.size, image.height, image.width);

    if (!this._validateImage(img)) return;
    if (!this._validateFilesize(img)) return;

    //this._onAdd(img); wat is hier de toegevoegde waarde van

    this.files.push(img);
    // this.cd.viewToModelUpdate(this.files);
  }

  private _validateImage = (image: ImageUpload) => {
    debugger;
    if (image.width === 0 || image.height===0) {
      this._onError({
        type: ErrorType.NoValidImage,
        message: `The file: ${image.fileName} is not a valid image.`
      });
      return false;

    }

    return true;
  }

  private _validateFilesize = (image: ImageUpload) => {
    debugger;
    if (this.config.maxFilesizeSum != null) {
      let total = (this.totalUploadedSize + image.size) / BYTES_IN_ONE_MB;

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

  public   registerOnChange(fn: (_: any) => {
  }): void {
    this.onChange = fn;
  }

  public   registerOnTouched(fn: () => {
  }): void {
    this.onTouched = fn;
  }

}
