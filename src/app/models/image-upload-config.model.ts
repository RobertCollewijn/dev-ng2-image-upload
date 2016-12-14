import {IImageUploadConfiguration} from "./image-upload-config.interface";

export class ImageUploadConfiguration implements IImageUploadConfiguration {
  public addSectionHeader: string;
  public uploadedHeader: string;
  public buttonLabel: string;
  public accepts: string[];
  public maxFilesizeSum: number;
  public style_maxHeight: string;
  public style_maxWidth: string;

  constructor() {
    this.addSectionHeader = 'Select Images:';
    this.uploadedHeader = 'Uploaded Images:';
    this.buttonLabel = 'Choose Image';
    this.accepts = ['image/*'];
    this.maxFilesizeSum = null;
    this.style_maxHeight = "100px";
    this.style_maxWidth = "100px"
  }
}
