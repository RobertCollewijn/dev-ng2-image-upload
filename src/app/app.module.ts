///<reference path="components/image-upload/image-upload.component.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ImageUploadComponent} from './components';
import {FileSizePipe, ImageProportionsPipe} from "./pipes";
import { ImageUploadDropzoneComponent } from './components/image-upload/image-upload-dropzone/image-upload-dropzone.component';
import { ImageUploadButtonComponent } from './components/image-upload/image-upload-button/image-upload-button.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    FileSizePipe,
    ImageProportionsPipe,
    ImageUploadDropzoneComponent,
    ImageUploadButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
