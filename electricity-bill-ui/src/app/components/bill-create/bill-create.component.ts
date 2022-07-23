import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css']
})
export class BillCreateComponent implements OnInit {

  public HOUSE_TYPES = [
    { value: 'HOUSE_HOLD', name: 'House' },
    { value: 'COMMERCIAL', name: 'Commercial' }
  ];
  public billCreateRequest = {
    bill_created_on: null,
    paid_on: null,
    units_consumed: '',
    amount: '',
    house_type: '',
    user_id: null
  }
  public billCreateStatusMsg = '';
  public enableBillCreateStatusMsg = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<BillCreateComponent>,
    private billService: BillService) {
    this.billCreateRequest.user_id = this.data.userId;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createBill() {
    if (this.isCreateBillRequestValid()) {
      this.billService.createBill(this.billCreateRequest).subscribe((response: any) => {
        if (response && response.status === 200) {
          this.dialogRef.close({data: response.data});
        } else {
          this.enableBillCreateStatusMsg = true;
          this.billCreateStatusMsg = "Something error occured";
        }
      })
    }
  }

  isCreateBillRequestValid() {
    this.enableBillCreateStatusMsg = false;
    this.billCreateStatusMsg = "";
    for (const value of Object.values(this.billCreateRequest)) {
      if (value == null) {
        this.enableBillCreateStatusMsg = true;
        this.billCreateStatusMsg = "Please all the fields";
        return false;
      }
    }

    return true;
  }

  onDateChange(controlType: any, event: any) {
    console.log(controlType, event)
  }

}
