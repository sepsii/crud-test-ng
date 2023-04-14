import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/services/localstorage-service.service';
import { PhoneNumberValidator } from 'src/app/validators/phone-number-validator';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  customer: Customer
  customerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private localStorageService: LocalStorageService
  , private dialogRef: MatDialogRef<EditComponent>,) {

    this.customerForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      // DateOfBirth: ['', Validators.required],
      phoneNumber: [data.phoneNumber, [Validators.required, PhoneNumberValidator]],
      email: [data.email, [Validators.required, Validators.email]],
      bankAccountNumber: [data.bankAccountNumber, Validators.required]
    });
  }
  onSubmit() {
    console.log('1234',this.customerForm.controls['email'].value);
    
    this.localStorageService.updateItem(this.customerForm.controls['email'].value,this.customerForm.value)
    this.dialogRef.close();

  }
}
