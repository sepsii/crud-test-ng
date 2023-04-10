import { Component } from '@angular/core';
import { OnInit } from '@angular/core/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './models/customer.model';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneNumberValidator } from './validators/phone-number-validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // customerForm: FormGroup;
  title = 'hello'
  localStorageCustomersList: Customer[]
  customerForm: FormGroup;
  customers: Customer[]
  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // DateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, PhoneNumberValidator]],
      email: ['', [Validators.required, Validators.email]],
      bankAccountNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clearLocaldata()
    this.getCustomersListFromLocalStorage()


  }




  getCustomersListFromLocalStorage() {
    // debugger
    let localStorageItem = localStorage.getItem('customers');

    if (localStorageItem && localStorageItem != '') {
      this.customers = JSON.parse(localStorageItem);
    }
    else {
      this.customers = []
    }
  }

  onSubmit() {
    // this.clearLocaldata()
    this.tt()
    console.log();

    const customer: Customer = this.customerForm.value;
    // this.customerForm.controls['PhoneNumber'].setErrors(PhoneNumberValidator)



    if (this.isCustomerUnique(customer) && this.isEmailUnique(customer.email)) {



      this.saveCustomer(customer);
    }
    console.log('local', JSON.parse(localStorage.getItem('customers')));

  }

  tt() {
    this.customerForm.controls['phoneNumber'].setValue('202-456-1414')
    this.customerForm.controls['firstName'].setValue('sep')
    this.customerForm.controls['lastName'].setValue('919414470')
    this.customerForm.controls['email'].setValue('ser@gmail.com')
    this.customerForm.controls['bankAccountNumber'].setValue('919414470')

  }

  saveCustomer(customer: Customer) {
    const customers: Customer[] = JSON.parse(localStorage.getItem('customers')) || [];
    customers.push(customer);



    localStorage.setItem('customers', JSON.stringify(customers));
    this.customerForm.reset();
  }

  isCustomerUnique(customer: Customer): boolean {

    const customers: Customer[] = JSON.parse(localStorage.getItem('customers')) || [];

    this.customers
    return !customers.some(c => c.firstName === customer.firstName && c.lastName === customer.lastName && c.dateOfBirth === customer.dateOfBirth);
  }

  isEmailUnique(email: string): boolean {
    this.getCustomersListFromLocalStorage()
    return !this.customers.some(c => c.email === email);
  }
  clearLocaldata() {
    // localStorage.setItem('customers', '');
    localStorage.removeItem('customers')
    this.customers = [];
  }
}