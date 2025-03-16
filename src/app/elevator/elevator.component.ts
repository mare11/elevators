import { Component, DoCheck, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppMaterialModule } from '../app-material-module';
import { Elevator } from '../common/elevator';
import { Config, Direction, ElevatorStatus } from '../common/types';
import { ConfigService } from '../service/config.service';
import { ElevatorService } from '../service/elevator.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-elevator',
  imports: [AppMaterialModule],
  templateUrl: './elevator.component.html',
  styleUrl: './elevator.component.css'
})
export class ElevatorComponent implements OnInit, OnDestroy, DoCheck {
  @Input({ required: true }) id!: number;
  @Input({ required: true }) elevator!: Elevator;

  private config: Config;
  private configSubscription: Subscription | undefined;
  private timeout: NodeJS.Timeout | undefined;

  constructor(private configService: ConfigService, private elevatorService: ElevatorService) {
    this.config = this.configService.getConfig();
  }

  ngOnInit() {
    this.configSubscription = this.configService.configObservable.subscribe(newConfig => this.config = newConfig);
  }

  ngOnDestroy() {
    this.configSubscription?.unsubscribe();
  }

  // this will get triggered on every change in elevator fields (for exampling when new floors are added to the queue)
  ngDoCheck() {
    if (this.elevator.floorQueue.length > 0 && !this.timeout) {
      this.timeout = setTimeout(() => this.updateState(), this.config.waitingPerFloor * 1000);
    }
  }

  // the main function for keeping track of the elevator status
  // this is like a state machine, except that it compares the current floor and floor queue
  updateState() {
    let nextTimeout = 1 / this.config.elevatorSpeed;
    if (this.elevator.currentFloor === this.elevator.floorQueue[0]) {
      this.elevator.floorQueue.splice(0, 1);
      this.elevator.status = ElevatorStatus.WAITING;
      nextTimeout += this.config.waitingPerFloor;

    } else if (this.elevator.currentFloor < this.elevator.floorQueue[0]) {
      this.elevator.currentFloor++;
      this.elevator.status = ElevatorStatus.MOVING;
      this.elevator.direction = Direction.UP;

    } else if (this.elevator.currentFloor > this.elevator.floorQueue[0]) {
      this.elevator.currentFloor--;
      this.elevator.status = ElevatorStatus.MOVING;
      this.elevator.direction = Direction.DOWN
    }

    if (this.elevator.floorQueue.length === 0) {
      this.elevator.status = ElevatorStatus.IDLE;
      this.elevator.direction = undefined;
      clearTimeout(this.timeout);
      this.timeout = undefined;
    } else {
      setTimeout(() => this.updateState(), nextTimeout * 1000);
    }
  }

  removeElevator() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.configSubscription?.unsubscribe();
    this.elevatorService.removeElevator(this.id);
  }

}
