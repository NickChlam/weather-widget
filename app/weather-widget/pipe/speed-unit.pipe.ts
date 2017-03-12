import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    transform(speed:number, unitType: string) {
        //if mph return miles
        switch(unitType) {
            case "mph":
            const miles = speed * 1.6;
            return miles ;
            default:
            return speed ;
        }
        //if kph return mph
    }
}