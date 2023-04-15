import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { PhoneNumberValidator } from 'src/app/validators/phone-number-validator';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  customer: Customer
  customerForm: FormGroup;
  formError: string
  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder,
    private customerService: CustomerService
    , private dialogRef: MatDialogRef<EditComponent>,) {

    this.customerForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      dateOfBirth: [data.dateOfBirth, Validators.required],
      phoneNumber: [data.phoneNumber, [Validators.required, PhoneNumberValidator]],
      email: [data.email, [Validators.required, Validators.email]],
      bankAccountNumber: [data.bankAccountNumber, Validators.required]
    });
  }
  onSubmit() {
    if (this.customerForm.valid) {
      if (this.customerService.isItemUnique(this.customerForm.value)) {

        this.customerService.updateCustomer(this.customerForm.controls['email'].value, this.customerForm.value)
        this.dialogRef.close();
      }
      else {
        this.formError = 'this user with this first name and last name and birthday already exists'

      }
    }
    else {
      this.customerForm.markAllAsTouched();

    }


  }
  getEmailError() {
    if (this.customerForm.controls['email'].errors['email']) {

      return 'Please write a valid email address'
    }
    else {
      return 'You should fill this field!'
    }

  }
  getPhoneError() {

    if (this.customerForm.controls['phoneNumber'].errors['invalidphone']) {

      return 'Please write a valid phone number eg: 202-456-7698'
    }
    else {
      return 'You should fill this field!'
    }

  }
}
