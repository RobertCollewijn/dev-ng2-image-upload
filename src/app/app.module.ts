///<reference path="components/image-upload/image-upload.component.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ImageUploadComponent} from './components';
import {FileSizePipe, ImageProportionsPipe} from "./pipes";


@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    FileSizePipe,
    ImageProportionsPipe
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
