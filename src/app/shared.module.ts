import {NgModule} from "@angular/core";
import {SafeHtmlPipe} from "./_helpers/safe-html.pipe";
import {FilterPipe} from "./_helpers/filter.pipe";


@NgModule({
  declarations: [SafeHtmlPipe, FilterPipe],
// exports is required so you can access your component/pipe in other modules
  exports: [SafeHtmlPipe, FilterPipe]
})
export class SharedModule{}
