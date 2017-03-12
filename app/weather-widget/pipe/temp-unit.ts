import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})
export class tempUnit implements PipeTransform {
    transform(temp:number, unitType: string) {
        //if mph return miles
        switch(unitType) {
            case "C":
            const FH = (temp -32) * 1.8
            return FH;
            default:
            return temp;
        }
        //if kph return mph
    }
}