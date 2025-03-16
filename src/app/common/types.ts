export enum ElevatorStatus {
    IDLE = 'IDLE',
    MOVING = 'MOVING',
    WAITING = 'WAITING'
};

export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN'
}

export interface NewElevatorRoute {
    newQueue: number[];
    travelTime: number;
}

export interface ElevatorArrival {
    startFloor: number;
    endFloor: number;
    elevator: number;
    estimatedWaitTime: number;
}

export interface Config {
    numberOfFloors: number;
    elevatorSpeed: number;
    waitingPerFloor: number;
}