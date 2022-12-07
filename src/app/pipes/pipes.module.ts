import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeemorePipe} from './seemore.pipe';
import {NoSanitizePipe} from './no-sanitize.pipe';
import {DurationPipe} from './duration.pipe';


@NgModule({
  declarations: [SeemorePipe, NoSanitizePipe, DurationPipe],
  exports: [DurationPipe, SeemorePipe, NoSanitizePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
