import { Environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { Page } from '../../models/page';
import { Connections } from '../../models/connections';
import { ConnYearStatus } from './../../models/connYearStatus';
import { ConnStatus } from '../../models/connStatus';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private environment: Environment = new Environment();
  private apiUrl: string = this.environment.apiUrl;


  constructor(private http:HttpClient) { }


  fetchConnections(page: number = 0, size: number = 10): Observable<Page> { 
    return this.http.get<Page>(`${this.apiUrl}/conn/conn-all?page=${page}&size=${size}`);
  }


  fetchConnectionWithId(id:number): Observable<Connections> {
    return this.http.get<Connections>(`${this.apiUrl}/conn/appid?appId=${id}`);
  }

  fetchConnWithDateRange(start:string, end:string, page: number = 0, size: number = 10): Observable<Page>{
    return this.http.get<Page>(`${this.apiUrl}/conn/date-range?start=${start}&end=${end}&page=${page}&size=${size}`)
  }

  updateConnectionrDtls(userDtls:Connections){
    return this.http.put(`${this.apiUrl}/conn/update-conn`, userDtls)
  }

  fetchConnectionByYear(year:number = 0):Observable<ConnYearStatus[]>{
    if(year == null){
      year = 0
    }
    return this.http.get<ConnYearStatus[]>(`${this.apiUrl}/conn/fetch-conns/${year}`)
  }

}
