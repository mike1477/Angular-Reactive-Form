import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  userForm = this.fb.group({
    username: [""],
    password: [""],
    confirmPassword: [""],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zip: [""]
    })
  });
  stateOptions: string[] = ["PA", "OH", "MI"];

  userAddressInfo: any = {
    street: "1234 Main Street",
    city: "My City",
    state: this.stateOptions[0],
    zip: "12345"
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  autoFillAddress() {
    this.userForm.patchValue({
      address: {
        street: this.userAddressInfo.street,
        city: this.userAddressInfo.city,
        state: this.userAddressInfo.state,
        zip: this.userAddressInfo.zip
      }
    });
  }

  clear() {
    this.userForm.reset();
    //this.username.setValue("");
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
