import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-robot-modal',
  templateUrl: './robot-modal.component.html',
  styleUrls: ['./robot-modal.component.css']
})
export class RobotModalComponent {

  constructor(private modalService: NgbModal) { }

}