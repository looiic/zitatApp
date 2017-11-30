import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import 'rxjs/Rx';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  //private ip = '192.168.0.46';
  private ip = '77.56.120.125';
  private port = '6969';
  private url = 'http://' + this.ip + ':' + this.port + '/api';

  private headers: Headers;
  private requestOpts: RequestOptions;


  constructor(public http: Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('apikey', 'sifogizitat');
    this.requestOpts = new RequestOptions({headers: this.headers});

  }

  getZitate(): any{
    console.log(this.url);
    return this.http.get(this.url + '/zitat', this.requestOpts)
      //.map(res => res.json());
      .map((res: Response) => res.json())
  }

  getSingleZitat(id: string){
    return this.http.get(this.url + '/zitat/' + id, this.requestOpts)
      //.map(res => res.json());
      .map((res: Response) => res.json())
  }

  addZitat(name: string, datum: string, zitat: string, beschreibung: string){
      let body = {
        "name": name,
        "datum": datum,
        "zitat": zitat,
        "beschreibung": beschreibung
      }
     return this.http.post(this.url + '/zitat', JSON.stringify(body), this.requestOpts)
    .subscribe(res => {
      console.log(res);
      }, (err) => {
        //reject(err);
      });
  }

  changeZitat(id: string, name: string, datum: string, zitat: string, beschreibung: string){
    let body = {
      "name": name,
      "datum": datum,
      "zitat": zitat,
      "beschreibung": beschreibung
    }
    return this.http.put(this.url + '/zitat/' + id, JSON.stringify(body), this.requestOpts)
   .subscribe(res => {
     console.log(res);
     }, (err) => {
       //reject(err);
     });
  }

  deleteZitat(id: string){
    return this.http.delete(this.url + '/zitat/' + id, this.requestOpts)
   .subscribe(res => {
     console.log(res);
       }, (err) => {
         //reject(err);
       });
  }

}
