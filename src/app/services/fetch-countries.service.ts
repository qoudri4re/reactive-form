import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}
  private url: string = 'https://flagcdn.com/en/codes.json';

  getCountries(): Observable<any> {
    let countryData: any = this.http.get<any>(this.url);
    return countryData;
  }
}
