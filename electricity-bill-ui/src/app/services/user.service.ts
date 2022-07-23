import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_API_V1 = environment.API_SERVER_URI + "/v1/user";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers() {
    return this.httpClient.get(this.USER_API_V1);
  }

  public createUser(createUserRequest: any) {
    return this.httpClient.post(this.USER_API_V1, createUserRequest);
  }

  public getUser(userId: string) {
    return this.httpClient.get(this.USER_API_V1 + `/${userId}`);
  }

  public getUserBills(userId: any, pageNumber: number = 1, pageSize: number = 10, sortAmount: any = null) {
    const paginationPath = `?skip=${pageNumber}&limit=${pageSize}`;
    const sortingPath = sortAmount ? `&sortAmount=${sortAmount}` : ''
    return this.httpClient.get(this.USER_API_V1 + `/${userId}/bills` + paginationPath + sortingPath);
  }

}