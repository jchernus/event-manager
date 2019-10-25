import { AbstractControl, ValidationErrors } from '@angular/forms'

export class eventIdValidators{
  static shouldExist(control: AbstractControl) : Promise<ValidationErrors | null>{
    return new Promise((resolve, reject) => {
      if (false){ // TODO: Check that the eventID exists
        resolve({ shouldExist : true});
      }
      else {
        reject();
      }
    });
  }
}