import {Component} from '@angular/core';
import {ImageUpload, IImageUploadConfiguration} from "./models";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ng2-Image-Upload';

  public imageUploadConfig: IImageUploadConfiguration;

  public imageUploadModel: ImageUpload[];

  constructor() {
    this.imageUploadModel = [];
    this.imageUploadConfig = {
      maxFilesizeSum: 10,
      addSectionHeader: "Custom addSectionHeader",
      uploadedHeader: "Custom uploadedHeader",
      buttonLabel: "Custom buttonLabel"//,
      //accepts: [".gif"]
    };
  }

  public imageUploadChanged = (value: any) => {
    console.log(value);
    console.log(this.imageUploadModel);
  }

  public getImagesUploaded = () => {
    console.log(this.imageUploadModel);
  }

  public onError = (message: string) => {
    console.log(message);
  }
}
