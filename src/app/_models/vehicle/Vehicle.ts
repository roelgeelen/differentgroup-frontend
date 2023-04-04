export class Vehicle {
  id: string;
  asset_id: string;
  alias: string;
  manufacturer: {name:string};
  model: {name:string};
  license_plate: {name:string};
  location: {latitude: number, longitude: number, in_movement: boolean, course: number, timestamp: Date};
}
