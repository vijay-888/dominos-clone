import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OdometerDirective } from './directives/odometer.directive';

@NgModule({
    declarations: [OdometerDirective],
    imports: [CommonModule],
    exports: [OdometerDirective]
})
export class SharedModule { }


