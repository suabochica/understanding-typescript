/* eslint-disable @typescript-eslint/no-unused-vars */
interface MovingThing {
  speed: number;
}

// Add the necessary properties to allow for discriminating unions
interface Car extends MovingThing {
  wheels: number;
}

interface Boat extends MovingThing {
  hull: string;
}

interface Plane extends MovingThing {
  drag: number;
  engines: number;
}

interface Train extends MovingThing {
  cars: number;
  wheels: number;
}

type Vehicle = Car | Boat | Plane | Train;
function dragAmount(vehicle: Vehicle) {
  console.log(vehicle.drag);
}
function numberOfCars(vehicle: Vehicle) {
  console.log(vehicle.cars);
}