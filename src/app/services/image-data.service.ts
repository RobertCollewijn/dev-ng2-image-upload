import {ImageUpload} from "../models/image-upload.model";
import {EventEmitter} from "@angular/core";
import {Observable, Subject} from "rxjs";
export class ImageDataService {

  pushedData = new EventEmitter<ImageUpload>();

  private imageSource = new Subject<ImageUpload>();

  image = this.imageSource.asObservable();

  private images:ImageUpload[] = [];

  addImage(image:ImageUpload){
    //this.images.push(image);
    this.imageSource.next(image)
  }

  getImages(){
    console.log("return this.images");
    return this.images;
  }

  pushData(value: ImageUpload){
    this.pushedData.emit(value)
  }

}
