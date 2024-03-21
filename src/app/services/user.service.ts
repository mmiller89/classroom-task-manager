import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user-data/user';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { Location, LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {


 
 

//   constructor(private httpClient: HttpClient,  private location: Location, private locationStrategy: LocationStrategy) { }

//   private baseUrl = 'http://localhost:8080';
//   // private baseUrl:string=this.location.path();

//   getUserList(): Observable<User[]> {
//     return this.httpClient.get<GetResponse>(this.baseUrl + "/api/users").pipe(
//       map(response => response._embedded.users)
//     )
//   }

//   addUser(user: User): Observable<User> {
//     return this.httpClient.post<User>(this.baseUrl + "/api/users", user)
//   }

//   putUser(user: User): Observable<User> {
//     return this.httpClient.put<User>(this.baseUrl + "/api/users" + `/${user.id}`, user);
//   }
// }

// interface GetResponse{
//   _embedded:{
//     users: User[];
//   }

}
