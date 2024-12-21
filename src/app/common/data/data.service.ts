import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getdata() {
    let headers = new HttpHeaders();
    headers.append('x-rapidapi-key', '88832f6c39msh20b150c9e7d98e0p1ea2dcjsnfc74ae38d39c');
    headers.append('x-rapidapi-host', 'fresh-linkedin-profile-data.p.rapidapi.com');
    headers.append('Content-Type', 'application/json');
    let data = {
      name: 'Anthony James',
      company_name: '',
      job_title: 'CEO',
      location: 'US',
      keywords: '',
      limit: 5
    }
    return this.http.get<any[]>('https://dummyjson.com/products');
  }
}
