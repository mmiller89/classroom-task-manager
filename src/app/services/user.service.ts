// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { User } from '../user-data/user';
// import { Observable } from 'rxjs/internal/Observable';
// import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {


//   private baseUrl = 'http://localhost:8080/api/users';
 

//   constructor(private httpClient: HttpClient) { }

//   getUserList(): Observable<User[]> {
//     return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
//       map(response => response._embedded.users)
//     )
//   }

//   addUser(user: User): Observable<User> {
//     return this.httpClient.post<User>(this.baseUrl, user)
//   }

//   putUser(user: User): Observable<User> {
//     return this.httpClient.put<User>(this.baseUrl + `/${user.id}`, user);
//   }
// }

// interface GetResponse{
//   _embedded:{
//     users: User[];
//   }

// }
