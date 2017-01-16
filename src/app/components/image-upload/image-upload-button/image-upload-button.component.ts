import { Component, OnInit } from '@angular/core';
import {ImageUploadService} from "../../../services";

@Component({
  selector: 'app-image-upload-button',
  templateUrl: './image-upload-button.component.html',
  styleUrls: ['./image-upload-button.component.css'],
  providers:[ImageUploadService]
})
export class ImageUploadButtonComponent implements OnInit {

  public accepts: string[]= ['image/*'];
 public buttonLabel: string = "upload";

  constructor(private imageUploadService:ImageUploadService) { }

  ngOnInit() {
  }

  public upload(files: File[], elem: HTMLInputElement) {

    let filesLength = files.length;

    if (filesLength > 0) {
      for (let i = 0; i < filesLength; i++) {
        this.imageUploadService.uploadFile(files[i]);
        //   debugger;
        //this.currentFile = files[i];
        //before reading file
        //if (!this._validateImage(this.currentFile.type)) return;

        //if (!this._validateFilesize(this.currentFile.size)) return;

        //this.fileReader.readAsDataURL(this.currentFile);
      }
    }
    elem.value = '';
  }

}
