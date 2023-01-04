import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjToArr'
})
export class ObjToArrPipe implements PipeTransform{
    transform(object: any = []) {
        let m = Object.values(object);
        return m;
    }
}

@Pipe({
    name: 'ObjToArrValue'
})
export class ObjToArrValuePipe implements PipeTransform{
    transform(object: any = []) {
        let m = Object.keys(object);
        return m;
    }
}