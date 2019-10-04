import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { eventIdValidators } from './eventIdValidators'; 

import { RobotsService } from '../robots.service';

//import { importRobots } from './assets/js/import-robots';

declare function importRobots(): any;

@Component({
  selector: 'app-import-bots',
  templateUrl: './import-bots.component.html',
  styleUrls: ['./import-bots.component.css']
})
export class ImportBotsComponent implements OnInit {
  myEventID : number;
  myClassID : number;
  
  importRobotsForm = new FormGroup({
    'eventID': new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{1,6}$")
    ],
    eventIdValidators.shouldExist),
    'classID': new FormControl()
  });

  get eventID(){
    return this.importRobotsForm.get('eventID');
  }

  constructor(private robotService: RobotsService) { }

  ngOnInit() {

  }

  pullClassIds(){

  }

  importBots(){
    importRobots();

    /*
      this.importRobotsForm.setErrors({
        invalidEventID: true
        invalidClassID: true
      })
    */
  }
}