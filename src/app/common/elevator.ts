import { Config, Direction, ElevatorStatus, NewElevatorRoute } from "./types";

export class Elevator {
    currentFloor: number;
    status: ElevatorStatus;
    direction: Direction | undefined;
    floorQueue: number[];

    constructor(floor: number, status: ElevatorStatus, direction?: Direction) {
        this.currentFloor = floor;
        this.status = status;
        this.direction = direction;
        this.floorQueue = [];
    }

    getFloors() {
        return this.floorQueue;
    }

    updateQueue(newQueue: number[]) {
        this.floorQueue = newQueue;
    }

    // construct a possibly new elevator queue with startFloor and endFloor and measure its time distance from a passenger
    getPossiblyNewElevatorRoute(startFloor: number, endFloor: number, config: Config): NewElevatorRoute {
        let [startFloorIndex, endFloorIndex] = this.getFloorIndexesForNewRoute(startFloor, endFloor);

        // clone the queue here because we only simulate the path, not actually choosing it yet
        // we also add currentFloor because we need it to calculate time distance below
        const newQueue = [this.currentFloor, ...this.floorQueue];

        if (newQueue[startFloorIndex] !== startFloor) {
            newQueue.splice(startFloorIndex + 1, 0, startFloor); // add startFloor after the index only if there is no same floor already at the same index
            endFloorIndex++; // we move the pointer for endFloor because we just inserted a new floor
        }
        if (newQueue[endFloorIndex] !== endFloor) {
            newQueue.splice(endFloorIndex + 1, 0, endFloor); // add endFloor after the index only if there is no same floor already at the same index
        }

        let travelTime = 0;
        let numberOfStops = 0;

        // calculate time until endFloor based on distance and elevator speed
        for (let i = 0; i < endFloorIndex + 1; i++) {
            travelTime += Math.abs(newQueue[i] - newQueue[i + 1]) / config.elevatorSpeed;
            numberOfStops++;
        }

        travelTime += numberOfStops * config.waitingPerFloor; // plus time spent on each floor stop

        newQueue.splice(0, 1); // remove currentFloor as it's not needed in the queue further on

        return { newQueue, travelTime };
    }

    // this returns two indexes after which startFloor and endFloor can be inserted in the queue for this elevator
    // we go either upwards or downwards depending on the passenger direction and try to fit new floors in the existing route, without expanding it and delaying the existing passengers
    getFloorIndexesForNewRoute(startFloor: number, endFloor: number) {
        const passengerDirection = endFloor > startFloor ? Direction.UP : Direction.DOWN; // assuming there is no button to call an elevator to the same floor (startFloor == endFloor)

        const queue = [this.currentFloor, ...this.floorQueue]; // we add currentFloor here in case we need to insert a floor between currentFloor and this.floorQueue[0]

        if (passengerDirection === Direction.DOWN) {
            for (let i = 0; i < queue.length; i++) {
                // check does startFloor fit between existing neighbour floors - we are only checking the downwards direction here
                if (queue[i] >= startFloor && (i === queue.length - 1 || startFloor > queue[i + 1])) {
                    for (let j = i; j < queue.length; j++) {
                        // check if endFloor is equal to a floor (edge case), or it fits between existing neighbour floors - we are only checking the downwards direction here
                        if (queue[j] === endFloor || (queue[j] > endFloor && (j === queue.length - 1 || endFloor > queue[j + 1]))) {
                            return [i, j];
                        }
                    }
                }
            }
        } else { // UP 
            for (let i = 0; i < queue.length; i++) {
                // check does startFloor fit between existing neighbour floors - we are only checking the upwards direction here
                if (queue[i] <= startFloor && (i === queue.length - 1 || startFloor < queue[i + 1])) {
                    for (let j = i; j < queue.length; j++) {
                        // check if endFloor is equal to a floor (edge case), or it fits between existing neighbour floors - we are only checking the upwards direction here
                        if (queue[j] === endFloor || (queue[j] < endFloor && (j === queue.length - 1 || endFloor < queue[j + 1]))) {
                            return [i, j];
                        }
                    }
                }
            }
        }

        // fallback to end of the queue
        return [queue.length - 1, queue.length - 1];
    }
}