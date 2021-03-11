import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticlesService } from "./articles.service";
import { MatSnackBar } from "@angular/material";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
@Component({
  selector: "dialog-component",
  templateUrl: "dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {
  email = "";
  password = "";
  seatNumber = "";
  designation = "";
  name = "";
  intrestes: Array<any> = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  isRegister = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private _articlesService: ArticlesService,
    public snackBar: MatSnackBar
  ) {}

  onLoginClick() {
    var self=this;
    var login = this._articlesService.login({
      email: this.email,
      password: this.password
    });
    login.subscribe(x => {
      if (x && x.code == 200 && x.valMsg == "Invalid Credentials") {
        self.snackBar.open("User not Registered", "Okay", { duration: 2000 });
        self.isRegister=true;
      } else if (x && x.code == 200) {
        this.dialogRef.close({'isLoggedIn': true, 'userData': x});
        self.snackBar.open('Logged In', "Okay", { duration: 2000 });
      }
    });
  }
  onRegisterClick(): void {
    this.isRegister = true;
  }
  addintrestes() {
    this.intrestes.push("");
  }
  customTrackBy(index: number, obj: any): any {
    return index;
 }
  onSubmitClick(): void {
    var register = this._articlesService.register({
      email: this.email,
      password: this.password,
      location: this.seatNumber,
      designation: this.designation,
      interests: this.intrestes,
      name:this.name
    });
    register.subscribe(x => {
      if (x && x.code == 200 && x.valMsg == "Invalid Credentials") {
      } else if (x && x.code == 200) {
        this.dialogRef.close({'isLoggedIn': true, 'userData': x});
      }
    });
  }
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.intrestes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(interest: any): void {
    let index = this.intrestes.indexOf(interest);

    if (index >= 0) {
      this.intrestes.splice(index, 1);
    }
  }
}
