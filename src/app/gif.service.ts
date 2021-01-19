import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  baseUrl = 'https://api.tenor.com/v1'; // assigning base url

  constructor(private http: HttpClient) { }

  // trendingGIFs api
  public getTrendingGif(): Observable<any> { // observable will return set of values of any type or model of api
    return this.http.get(`${this.baseUrl}/trending?key=LIVDSRZULELA&limit=4`);
  }

  // searchGIFs api
  public getSearchGif(search: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?q=${search}&key=LIVDSRZULELA&limit=4`);
  }

  // autocomplete api
  public getAutocompleteGif(autoSearch: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/autocomplete?q=${autoSearch}&key=LIVDSRZULELA`);
  }
}
