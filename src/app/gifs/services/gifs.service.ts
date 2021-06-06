import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKEY: string = '4QIqnfY2A9Nxw6zZhi8JAhEV8ZMS4ThO';
  private _history: string[] = [];
  private apiURL = 'https://api.giphy.com/v1/gifs';

  //TODO: cambiar any por su tipo correspondiente
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  deleteHistory(){
    if(localStorage.getItem('history')){
      this._history = [];
      this.results = [];
      localStorage.removeItem('history');
      localStorage.removeItem('results');
    }
  }

  searchGifs(query: string){

    query = query.trim().toLowerCase();

    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('history', JSON.stringify(this._history));

    }

    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=4QIqnfY2A9Nxw6zZhi8JAhEV8ZMS4ThO&q=dragon&limit=10')
      .then(resp=>{
        resp.json().then(data => console.log(data));
      })*/

    /*const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=4QIqnfY2A9Nxw6zZhi8JAhEV8ZMS4ThO&q=dragon&limit=10');
    const data = await resp.json();
    console.log(data);*/

    const params = new HttpParams()
      .set('api_key', this.apiKEY)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.apiURL}/search`,{params})
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      })
  }
}

