import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '../common/types';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: BehaviorSubject<Config>;
  configObservable: Observable<Config>;

  constructor() {
    // default values
    this.config = new BehaviorSubject({
      numberOfFloors: 10,
      elevatorSpeed: 2,
      waitingPerFloor: 2
    });
    this.configObservable = this.config.asObservable();
  }

  getConfig() {
    return this.config.value;
  }

  updateConfig(newConfig: Config) {
    this.config.next(newConfig);
  }
}
