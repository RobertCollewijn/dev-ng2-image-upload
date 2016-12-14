import { Pipe, PipeTransform } from '@angular/core';
import {ImageUpload} from "../../models/image-upload.model";

@Pipe({
  name: 'imageProportions'
})
export class ImageProportionsPipe implements PipeTransform {

  transform(image: ImageUpload, args?: any): any {

    return image.height.toLocaleString("nl", "NL") + " X "+ image.width.toLocaleString("nl", "NL");
  }

}
