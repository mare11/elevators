import { Component } from '@angular/core';
import { AppMaterialModule } from '../app-material-module';
import { ElevatorComponent } from "../elevator/elevator.component";
import { ElevatorService } from '../service/elevator.service';

@Component({
  selector: 'app-elevator-list',
  imports: [AppMaterialModule, ElevatorComponent],
  templateUrl: './elevator-list.component.html',
  styleUrl: './elevator-list.component.css'
})
export class ElevatorListComponent {

  constructor(public elevatorService: ElevatorService) { }
}
