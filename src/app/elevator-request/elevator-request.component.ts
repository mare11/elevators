import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AppMaterialModule } from '../app-material-module';
import { ConfigService } from '../service/config.service';
import { ElevatorService } from '../service/elevator.service';

@Component({
  selector: 'app-elevator-request',
  imports: [FormsModule, AppMaterialModule],
  templateUrl: './elevator-request.component.html',
  styleUrl: './elevator-request.component.css'
})
export class ElevatorRequestComponent {

  constructor(public elevatorService: ElevatorService, public configService: ConfigService) { }

  submitForm(form: NgForm) {
    this.elevatorService.findElevator(Number(form.value.startFloor), Number(form.value.endFloor));
    form.resetForm();
  }
}
