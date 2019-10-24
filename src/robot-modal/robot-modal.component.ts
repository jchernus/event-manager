import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-robot-modal',
  templateUrl: './robot-modal.component.html',
  styleUrls: ['./robot-modal.component.css']
})
export class RobotModalComponent {

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open(robotDetails) {
    this.modalService.open(robotDetails, {ariaLabelledBy: 'modal-basic-title'});
  }
}