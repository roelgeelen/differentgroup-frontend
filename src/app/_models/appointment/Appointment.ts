import {Location} from "./Location";
import {Time} from "@angular/common";

export class Appointment {
  id: string | undefined;
  oDataType: string | undefined;
  subject: string | undefined;
  start: { dateTime: Date };
  end: any;
  location: Location = new Location();
  distance: number = 0;
}
