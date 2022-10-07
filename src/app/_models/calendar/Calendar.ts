import {CalendarEvent} from "angular-calendar";
import {Appointment} from "../appointment/Appointment";

export class Calendar {
  id: string;
  name: string;
  icon: string;
  color: {primary: string, secondary: string};
  type: 'sectionaal' | 'openslaande';
  events: CalendarEvent[];
  appointments: Appointment[];
}
