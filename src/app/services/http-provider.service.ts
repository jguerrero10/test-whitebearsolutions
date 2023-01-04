import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { FormService } from './form.service';

var url = 'https://63b2fe5b5901da0ab3742ed6.mockapi.io/form'

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private formService: FormService) { }

  public getFormById(id: any): Observable<any> {
    return this.formService.get(`${url}/${id}`);
  }

  public putFormById(id: any, data: any): Observable<any>{
    return this.formService.post(`${url}/${id}`, data)
  }
}
