import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { PhoneNumberValidator } from 'src/app/validators/phone-number-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  customerForm: FormGroup;
  formError: string
  customer: Customer

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService) {

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, PhoneNumberValidator]],
      email: ['', [Validators.required, Validators.email]],
      bankAccountNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('valid', this.customerForm.valid);

  }


  onSubmit() {
    this.customer = this.customerForm.value;
    this.trimAllFields()


    if (this.customerForm.valid) {

      if (this.customerService.isEmailUnique(this.customerForm.controls['email'].value) &&
        this.customerService.isItemUnique(this.customerForm.value)) {

        this.customerService.addCustomer(this.customer)
        this.customerForm.reset()
        this.formError = null
      }
      else {
        if (!this.customerService.isEmailUnique(this.customerForm.controls['email'].value)) {
          this.formError = 'this email already exists'
        }
        else if (!this.customerService.isItemUnique(this.customerForm.value)) {
          this.formError = 'this user with this first name and last name and birthday already exists'
        }
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

  isButtonDisabled() {
    return !this.customerForm.valid
  }



  trimAllFields() {
    this.customer.firstName = this.customer.firstName.trim()
    this.customer.lastName = this.customer.lastName.trim()
    this.customer.bankAccountNumber = this.customer.bankAccountNumber.trim()
    this.customer.email = this.customer.email.trim()
    this.customer.phoneNumber = this.customer.phoneNumber.trim()
  }
}
