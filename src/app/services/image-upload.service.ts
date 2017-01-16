import {Injectable} from '@angular/core';
import {ImageUpload} from "../models/image-upload.model";
import {ImageDataService} from "./image-data.service";


@Injectable()
export class ImageUploadService {

  // private fileReader: FileReader;
  // private currentFile: File;


  constructor(private imageDataService: ImageDataService) {
    //this.fileReader = new FileReader();
    // this.fileReader.addEventListener('load', this._fileReaderLoad);
    // this.fileReader.addEventListener('progress', this._fileReaderProgress);
    //this.fileReader.addEventListener('load', this.testFileReaderLoad(this.fileReader));

    //this.fileReader.addEventListener('load',this.testFileReaderLoad,false);
  }


  uploadFile(file: File) {

    //before reading file
    if (!this._validateImage(file.type)) return;
    if (!this._validateFilesize(file.size)) return;

    var newfileReader: FileReader;
    newfileReader = new FileReader();
    newfileReader.addEventListener('load', this._fileReaderLoad.bind(null, file));
    newfileReader.addEventListener('progress', this._fileReaderProgress);

    newfileReader.readAsDataURL(file);
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




  private _fileReaderLoad = (file: File, event) => {

    console.log("_fileReaderLoad begin")
    let imgData = event.target.result;//this.fileReader.result;
    console.log("_fileReaderLoad result")
    var image = new Image();
    image.src = imgData;

    let img = new ImageUpload(imgData, file.name, file.size, image.height, image.width);

    if (!this._validateImageProportions(img)) return;
    if (!this._validateFilesize(img.size)) return;

    //this._onAdd(img); wat is hier de toegevoegde waarde van
//local
    console.log("_fileReaderLoad push")
    // this.files.push(img);
    this.imageDataService.addImage(img);

    // this.imageDataService.pushData(img);
    console.log("_fileReaderLoad end")
    //Upstream
    //  this.cd.viewToModelUpdate(this.files);
  }


  //Validations

  private __validateImage = function testImage(fileType: string) {
    if (fileType.substring(0, 5) != 'image') {
      return false;
    }
    return true;
  }
  private _validateImage = (fileType: string) => {
    if (fileType.substring(0, 5) != 'image') {
      /*

       this._onError({
       type: ErrorType.NoValidImage,
       message: `The file: '${this.currentFile.name}' is not a valid image.`
       });

       */
      return false;
    }
    return true
  }

  private _validateImageProportions = (image: ImageUpload) => {
    if (image.width === 0 || image.height === 0) {
      /*this._onError({

       type: ErrorType.NoValidImage,
       message: `The file: '${image.fileName}' is not a valid image.`
       });
       */
      return false;
    }
    return true;
  }

  private _validateFilesize = (imageSize: number) => {
    /*

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

     */
    return true;
  }

}
