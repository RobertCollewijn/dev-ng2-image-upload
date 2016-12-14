import {Component} from '@angular/core';
import {ImageUpload, IImageUploadConfiguration, Error} from "./models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ng2-Image-Upload';

  //public imageUploadConfig: IImageUploadConfiguration;
  //by adding new the default values set in the model are used.
  public imageUploadConfig: IImageUploadConfiguration; // = new ImageUploadConfiguration();
  public imageUploadModel: ImageUpload[];

  constructor() {
    this.imageUploadModel = [];
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
}
