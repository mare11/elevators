import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppMaterialModule } from '../app-material-module';
import { ElevatorArrival } from '../common/types';
import { ElevatorService } from '../service/elevator.service';

@Component({
  selector: 'app-elevator-arrival',
  imports: [AppMaterialModule, DatePipe],
  templateUrl: './elevator-arrival.component.html',
  styleUrl: './elevator-arrival.component.css'
})
export class ElevatorArrivalComponent implements OnInit, OnDestroy {
  isVisible = true;
  elevatorArrival: ElevatorArrival | undefined;
  private arrivalSubscription: Subscription | undefined;
  private hideTimeout: NodeJS.Timeout | undefined;

  constructor(private elevatorService: ElevatorService) { }

  ngOnInit() {
    this.arrivalSubscription = this.elevatorService.choosenElevatorObservable.subscribe(elevatorArrival => {
      if (elevatorArrival) {
        this.elevatorArrival = elevatorArrival;
        this.isVisible = true;

        this.resetHideTimeout();
      }
    });
  }

  ngOnDestroy() {
    this.arrivalSubscription?.unsubscribe();
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  resetHideTimeout() {
    // replace the existing timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    this.hideTimeout = setTimeout(() => {
      this.isVisible = false;
    }, 8000);
  }

  hideArrivalInfo() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
    this.isVisible = false;
  }

}
