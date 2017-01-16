import {Component, OnInit, HostListener} from '@angular/core';
import {ImageUploadService} from "../../../services";

@Component({
  selector: 'app-image-upload-dropzone',
  templateUrl: './image-upload-dropzone.component.html',
  styleUrls: ['./image-upload-dropzone.component.css'],
  providers:[ImageUploadService]
})
export class ImageUploadDropzoneComponent implements OnInit {

  constructor(private imageUploadService:ImageUploadService) { }

  public dropzoneHover:boolean = false;

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    debugger;

    let files = event.dataTransfer.files;
    let filesLength = files.length;

    if (filesLength > 0) {
      for (let i = 0; i < filesLength; i++) {
        this.imageUploadService.uploadFile(files[i]);
      }
    }
    //TODO files naar directive
    /*
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
     */
    //this.upload(dropFiles, event.srcElement)
    this.dropzoneHover = false;
    event.preventDefault();
    // this._preventAndStop(event);
    /*
     let transfer = this._getTransfer(event);
     if (!transfer) {
     return;
     }

     let options = this.getOptions();
     let filters = this.getFilters();
     this._preventAndStop(event);
     this.uploader.addToQueue(transfer.files, options, filters);
     this.fileOver.emit(false);
     this.onFileDrop.emit(transfer.files);
     */
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any): void {
    // debugger;
    this.dropzoneHover = true;
    event.preventDefault();
    //this._preventAndStop(event);
    /*
     let transfer = this._getTransfer(event);
     if (!this._haveFiles(transfer.types)) {
     return;
     }

     transfer.dropEffect = 'copy';
     this._preventAndStop(event);
     this.fileOver.emit(true);
     */
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): any {
    //  debugger;
    this.dropzoneHover = false;
    this._preventAndStop(event);
    /*
     if (event.currentTarget === (this as any).element[0]) {
     return;
     }

     this._preventAndStop(event);
     this.fileOver.emit(false);
     */
  }


  private _preventAndStop(event: any): any {
    event.preventDefault();
    event.stopPropagation();
  }



  ngOnInit() {
  }

}
