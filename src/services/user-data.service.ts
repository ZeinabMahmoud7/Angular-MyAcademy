import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../module/iuser';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  apiUrl="http://localhost:3000/user"
  constructor(private http:HttpClient) {
  }
  setUserData(data:Iuser):Observable<Iuser>
  {
   return this.http.post<Iuser>(this.apiUrl,data)
  }
  getUserData():Observable<Iuser[]>
  {
    return this.http.get<Iuser[]>(this.apiUrl)
  }
}
