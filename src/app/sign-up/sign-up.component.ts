import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { CustomValidationService } from "../services/custom-validation.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) {}

  userForm = this.fb.group(
    {
      username: [
        "",
        [Validators.required, Validators.minLength(3)],
        this.customValidator.validateUsernameNotTaken.bind(this.customValidator)
      ],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      address: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        zip: [""]
      }),
      daysAvailable: this.fb.array([this.fb.control("")])
    },
    {
      validator: this.customValidator.passwordMatchValidator(
        "password",
        "confirmPassword"
      )
    }
  );

  addDay() {
    this.daysAvailable.push(this.fb.control(""));
  }

  get daysAvailable() {
    return this.userForm.get("daysAvailable") as FormArray;
  }

  get username() {
    return this.userForm.get("username");
  }

  get confirmPassword() {
    return this.userForm.get("confirmPassword");
  }

  get password() {
    return this.userForm.get("password");
  }

  stateOptions: string[] = ["PA", "OH", "MI"];

  userAddressInfo: any = {
    street: "1234 Main Street",
    city: "My City",
    state: this.stateOptions[0],
    zip: "12345"
  };

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
