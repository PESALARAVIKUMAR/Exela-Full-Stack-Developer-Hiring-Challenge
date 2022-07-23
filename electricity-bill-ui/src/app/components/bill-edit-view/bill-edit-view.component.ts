import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-edit-view',
  templateUrl: './bill-edit-view.component.html',
  styleUrls: ['./bill-edit-view.component.css']
})
export class BillEditViewComponent implements OnInit {

  public disbleBillEdit = false;
  public billDataObj: any = null;
  public HOUSE_TYPES = [
    { value: 'HOUSE_HOLD', name: 'House' },
    { value: 'COMMERCIAL', name: 'Commercial' }
  ];

  public billsOperationsMsg = '';
  public enableBillsOperationsMsg = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<BillEditViewComponent>,
    private billService: BillService) {
    console.log(this.data);
    if (data) {
      this.disbleBillEdit = data.formType === 'EDIT' ? false : true;
      this.billDataObj = data.billObj;
    }
    console.log(this.disbleBillEdit);
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateBill() {
    console.log(this.billDataObj);
    if (this.isUpdateBillRequestValid()) {
      this.billService.updateBill(this.billDataObj.id, this.billDataObj).subscribe((response: any) => {
        console.log(response);
        if (response && response.status === 200) {
          this.dialogRef.close({data: response.data});
        } else {
          this.enableBillsOperationsMsg = true;
          this.billsOperationsMsg = "Something error occured";
        }
      })
    }
  }

  isUpdateBillRequestValid() {
    this.enableBillsOperationsMsg = false;
    this.billsOperationsMsg = "";
    for (const value of Object.values(this.billDataObj)) {
      if (value == null) {
        this.enableBillsOperationsMsg = true;
        this.billsOperationsMsg = "Please all the fields";
        return false;
      }
    }

    return true;
  }

}
