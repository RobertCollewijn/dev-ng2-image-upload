import {Component, OnInit} from '@angular/core';
import {ImageUpload, IImageUploadConfiguration, Error} from "./models";
import {ImageDataService} from "./services/image-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ImageDataService]
})
export class AppComponent implements OnInit{

  title = 'Ng2-Image-Upload';

  //public imageUploadConfig: IImageUploadConfiguration;
  //by adding new the default values set in the model are used.
  public image: ImageUpload;
  public imageUploadConfig: IImageUploadConfiguration; // = new ImageUploadConfiguration();
  public imageUploadModel: ImageUpload[]=[];

  constructor(private imageDataService:ImageDataService) {
   // this.imageUploadModel = imageDataService.getImages();
    this.imageUploadConfig = {
      //the default values are overruled.
      maxFilesizeSum: 10,
      addSectionHeader: "Custom addSectionHeader",
      uploadedHeader: "Custom uploadedHeader",
      buttonLabel: "upload",
      style_maxHeight: "150px",
      style_maxWidth:"150px"

      //accepts: [".gif"]
    };
  }

  public onError = (message: Error) => {
    console.error([message.message]);
  }

  public getImages(){
    console.log("getImages")
    //this.imageUploadModel = this.imageDataService.getImages().slice(0);

  }

  ngOnInit(){
    this.imageDataService.image.subscribe(
      data=> {this.imageUploadModel.push(data);console.log(JSON.stringify(data));}
    );


  }
}
