import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material-module';
import { ConfigComponent } from './config/config.component';
import { ElevatorArrivalComponent } from "./elevator-arrival/elevator-arrival.component";
import { ElevatorListComponent } from "./elevator-list/elevator-list.component";
import { ElevatorRequestComponent } from "./elevator-request/elevator-request.component";
import { ConfigService } from './service/config.service';
import { ElevatorService } from './service/elevator.service';

const RANDOM_PASSENGERS_DELAY = 5000;

@Component({
  selector: 'app-root',
  imports: [FormsModule, AppMaterialModule, ConfigComponent, ElevatorListComponent, ElevatorRequestComponent, ElevatorArrivalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  randomPassengersInterval: NodeJS.Timeout | undefined;

  constructor(public elevatorService: ElevatorService, private configService: ConfigService) { }

  ngOnDestroy() {
    if (this.randomPassengersInterval) {
      clearInterval(this.randomPassengersInterval);
    }
  }

  addElevator() {
    this.elevatorService.addElevator();
  }

  toogleInterval() {
    if (!this.randomPassengersInterval) {
      this.randomPassengersInterval = setInterval(() => {
        const { randomStartFloor, randomEndFloor } = this.getRandomFloors();
        this.elevatorService.findElevator(randomStartFloor, randomEndFloor);

      }, RANDOM_PASSENGERS_DELAY);
    } else {
      clearInterval(this.randomPassengersInterval);
      this.randomPassengersInterval = undefined;
    }
  }

  getRandomFloors() {
    const maxFloor = this.configService.getConfig().numberOfFloors;
    const randomStartFloor = Math.floor(Math.random() * (maxFloor + 1));
    let randomEndFloor;
    do {
      randomEndFloor = Math.floor(Math.random() * (maxFloor + 1));
    } while (randomStartFloor === randomEndFloor) // repeat in case they are the same

    return { randomStartFloor, randomEndFloor };
  }
}
