import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public usersList: any[] = [];
  public selectedUser: any;
  public enableCreateUserForm = false;
  public userCreateRequest = { name: "", mobile: "", address: "", pincode: "" };
  public isUserCreateRequestValid = true;

  public userOperationsMsg = "";
  public enableUserOperationsMsg = false;

  @Output() userSelected = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUsers();
  }

  userSelectionChange(event: any) {
    if (event && event.value) {
      this.selectedUser = event.value;
      this.userSelected.emit(JSON.stringify(this.selectedUser));
    } else {
      this.selectedUser = null;
      this.userSelected.emit(undefined);
    }
  }

  getCurrentUsers() {
    this.usersList = [];
    this.userService.getAllUsers().subscribe((response: any) => {
      console.log(response);
      if (response && response.status === 200) {
        this.usersList = response.data;
      }
    })
  }

  cancelCreateUser() {
    this.enableCreateUserForm = false;
    this.isUserCreateRequestValid = true;
  }

  createUser() {
    for(const fieldValue of Object.values(this.userCreateRequest)) {
      if (!fieldValue) {
        this.isUserCreateRequestValid = false;
        return;
      }
    }
    this.userService.createUser(this.userCreateRequest).subscribe((response: any) => {
      this.enableUserOperationsMsg = true;
      if (response && response.status === 200) {
        this.usersList.push(response.data);
        this.userOperationsMsg = "User created successfully";
      } else {
      }
      this.cancelCreateUser();
      setTimeout(() => {
        this.enableUserOperationsMsg = false;
      }, 3000);
    })
  }

}
