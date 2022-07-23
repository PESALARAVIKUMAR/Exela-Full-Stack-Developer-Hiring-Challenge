import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private BILL_API_V1 = environment.API_SERVER_URI + "/v1/bill";

  constructor(private httpClient: HttpClient) { }

  public getAllBills() {
    return this.httpClient.get(this.BILL_API_V1);
  }

  public getBill(billId: string) {
    return this.httpClient.get(this.BILL_API_V1 + `/${billId}`);
  }

  public createBill(billCreateRequest: any) {
    return this.httpClient.post(this.BILL_API_V1, billCreateRequest);
  }

  public deleteBill(billId: any) {
    return this.httpClient.delete(this.BILL_API_V1 + `/${billId}`);
  }

  public updateBill(billId: any, billUpdateRequest: any) {
    return this.httpClient.post(this.BILL_API_V1 + `/${billId}`, billUpdateRequest);
  }
}