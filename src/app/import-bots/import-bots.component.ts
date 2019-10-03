import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { eventIdValidators } from '../eventIdValidators';

@Component({
  selector: 'app-import-bots',
  templateUrl: './import-bots.component.html',
  styleUrls: ['./import-bots.component.css']
})
export class ImportBotsComponent implements OnInit {
  importRobotsForm = new FormGroup({
    'eventID': new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{1,6}$")
    ],
    eventIdValidators.shouldExist), // TODO: Add pattern
    'classID': new FormControl()
  });

  get eventID(){
    return this.importRobotsForm.get('eventID');
  }

  constructor() { }

  ngOnInit() {
  }

}