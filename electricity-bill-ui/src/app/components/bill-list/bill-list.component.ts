import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { BillCreateComponent } from '../bill-create/bill-create.component';
import { BillService } from 'src/app/services/bill.service';
import { BillEditViewComponent } from '../bill-edit-view/bill-edit-view.component';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit, OnChanges {

  @Input() currentUser: any;
  public currentUserObj: any;

  public userBills: any[] = [];
  public totalBillsCount: number = 0;
  displayedColumns: string[] = ['bill_created_on', 'units_consumed', 'amount', 'paid_on', 'icons'];

  public enableBillsOperationsMsg = false;
  public billsOperationsMsg = '';

  public billsPaginationObj: any;
  public amountSortType: any = null;

  constructor(private userService: UserService, private matDialog: MatDialog, private billService: BillService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
    if (changes && changes.currentUser && changes.currentUser.currentValue) {
      this.currentUserObj = changes.currentUser.currentValue;
    }
    this.getUserBills(this.currentUserObj.id);
  }

  getUserBills(userId: any, pageNumber: number = 1, pageSize: number = 10) {
    this.userBills = [];
    if (this.billsPaginationObj) {
      pageNumber = this.billsPaginationObj.pageIndex+1;
      pageSize = this.billsPaginationObj.pageSize;
    }
    this.userService.getUserBills(userId, pageNumber, pageSize, this.amountSortType).subscribe((response: any) => {
      if (response && response.status === 200) {
        this.userBills = response.data.bills;
        this.totalBillsCount = response.data.count;
      }
    })
  }

  createBill() {
    this.matDialog.open(BillCreateComponent, {
      data: {
        userId: this.currentUserObj.id
      },
      height: "60%",
      width: "50%",
      disableClose: true
    })
    .afterClosed().subscribe((response: any) => {
      if (response && response.data) {
        this.billsOperationsCallback("Bill Created Successfully");
        this.getUserBills(this.currentUserObj.id);
      }
    });
  }

  billsOperationsCallback(message: string = '') {
    this.enableBillsOperationsMsg = true;
    this.billsOperationsMsg = message;
    setTimeout(() => {
      this.enableBillsOperationsMsg = false;
    }, 3000);
  }

  editViewBillData(element: any, formType: string) {
    console.log(element);
    this.matDialog.open(BillEditViewComponent, {
      data: {
        userId: this.currentUserObj.id,
        formType,
        billObj: {
          id: element.id,
          bill_created_on: element.bill_created_on,
          paid_on: element.paid_on,
          amount: element.amount,
          units_consumed: element.units_consumed,
          house_type: element.house_type,
          user_id: element.user_id
        }
      },
      height: "60%",
      width: "50%",
      disableClose: true
    })
    .afterClosed().subscribe((response: any) => {
      if (response && response.data) {
        this.billsOperationsCallback("Bill Updated Successfully");
        this.getUserBills(this.currentUserObj.id);
      }
    });
  }

  deleteBillData(element: any) {
    console.log(element);
    if (element && element.id) {
      this.billService.deleteBill(element.id).subscribe((response: any) => {
        console.log(response);
        if (response && response.status === 200) {
          this.billsOperationsCallback("Bill Deleted Successfully");
          this.getUserBills(this.currentUserObj.id);
        }
      })
    }
  }
  
  billsPaginatorChange(event: any) {
    console.log(event);
    if (event) {
      this.billsPaginationObj = event;
      this.getUserBills(this.currentUserObj.id, event.pageIndex+1, event.pageSize);
    }
  }

  sortBillsColumnWise(columnType: string) {
    if (columnType === 'AMOUNT') {
      if (this.amountSortType == null) {
        this.amountSortType = 'ASC';
      } else {
        this.amountSortType = this.amountSortType == 'ASC' ? 'DESC' : 'ASC';
      }
      this.getUserBills(this.currentUserObj.id);
    }
  }

}
