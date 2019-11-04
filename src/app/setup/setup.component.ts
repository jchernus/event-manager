import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { eventIdValidators } from './eventIdValidators';

import { RobotsService } from '../robots.service';

import importRobotsFormBuildersDB from '../js/import-robots.js';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
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
    // console.log(importRobotsFormBuildersDB);
  }

  pullClassIds(eventID: number){
    // Collect any classIDs that exist for the given eventID
  }

  importBots(){
/*
    importRobotsFormBuildersDB(1,2);
*/
  }
}