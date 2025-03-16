import { Elevator } from './elevator';
import { Direction, ElevatorStatus } from './types';

describe('Elevator', () => {
    it('test elevators', () => {
        console.log("elevator1");
        const elevator1 = new Elevator(7, ElevatorStatus.MOVING, Direction.DOWN);
        elevator1.floorQueue = [2, 6, 8, 6];
        console.log(elevator1.getFloorIndexesForNewRoute(5, 3)); // [5, 3, 2, 6, 8, 6]
        elevator1.floorQueue = [2, 6, 8, 6];
        console.log(elevator1.getFloorIndexesForNewRoute(1, 5)); // [2, 6, 8, 6, 1, 5]
        elevator1.floorQueue = [2, 6, 8, 6];
        console.log(elevator1.getFloorIndexesForNewRoute(2, 7)); // [2, 6, 7, 8, 6]

        console.log("elevator2");
        const elevator2 = new Elevator(2, ElevatorStatus.MOVING, Direction.UP);
        elevator2.floorQueue = [4, 6, 8];
        console.log(elevator2.getFloorIndexesForNewRoute(3, 5)); // [3, 4, 5, 6, 8]
        elevator2.floorQueue = [4, 6, 8];
        console.log(elevator2.getFloorIndexesForNewRoute(5, 9)); // [4, 5, 6, 8, 9]
        elevator2.floorQueue = [4, 6, 8];
        console.log(elevator2.getFloorIndexesForNewRoute(10, 12)); // [4, 6, 8, 10, 12]

        console.log("elevator3");
        const elevator3 = new Elevator(2, ElevatorStatus.MOVING, Direction.UP);
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(0, 6)); // [6, 8, 6, 0, 6]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(2, 6)); // [2, 6, 8, 6]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(2, 3)); // [2, 3, 6, 8, 6]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(2, 7)); // [2, 6, 7, 8, 6]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(5, 4)); // [6, 8, 6, 5, 4]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(6, 4)); // [6, 8, 6, 4]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(7, 0)); // [6, 8, 7, 6, 0]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(2, 1)); // [6, 8, 6, 2, 1]
        elevator3.floorQueue = [6, 8, 6];
        console.log(elevator3.getFloorIndexesForNewRoute(3, 8)); // [3, 6, 8, 6]
    });
});
