import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Elevator } from '../common/elevator';
import { ElevatorArrival, ElevatorStatus, NewElevatorRoute } from '../common/types';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {
  elevators: Elevator[];
  private choosenElevator: BehaviorSubject<ElevatorArrival | undefined>;
  choosenElevatorObservable: Observable<ElevatorArrival | undefined>;

  constructor(private configService: ConfigService) {
    this.elevators = [];
    this.choosenElevator = new BehaviorSubject<ElevatorArrival | undefined>(undefined);
    this.choosenElevatorObservable = this.choosenElevator.asObservable();
  }

  addElevator() {
    this.elevators.push(new Elevator(0, ElevatorStatus.IDLE));
  }

  removeElevator(index: number) {
    this.elevators.splice(index, 1);
  }

  getElevators() {
    return this.elevators;
  }

  // finds an elevator with the most efficient route based on travelTime
  findElevator(startFloor: number, endFloor: number) {
    if (startFloor && endFloor) {
      let bestElevatorRoute: NewElevatorRoute | undefined;
      let bestElevator: Elevator | undefined;

      for (const elevator of this.elevators) {
        const newElevatorRoute = elevator.getPossiblyNewElevatorRoute(startFloor, endFloor, this.configService.getConfig());
        if (!bestElevatorRoute || newElevatorRoute.travelTime < bestElevatorRoute.travelTime) {
          bestElevatorRoute = newElevatorRoute;
          bestElevator = elevator;
        }
      }
      if (!bestElevator || !bestElevatorRoute) {
        alert('Could not find a suitable elevator. Try again!');
        return;
      }
      bestElevator.updateQueue(bestElevatorRoute.newQueue)
      this.choosenElevator.next({ // emit the new value to show arrival info in other component
        startFloor: startFloor,
        endFloor: endFloor,
        elevator: this.elevators.indexOf(bestElevator) + 1,
        estimatedWaitTime: bestElevatorRoute.travelTime
      });
    } else {
      alert('Pick the floor first!')
    }
  }
}
