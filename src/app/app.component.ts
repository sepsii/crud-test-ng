import { Component } from '@angular/core';
import { OnInit } from '@angular/core/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './models/customer.model';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneNumberValidator } from './validators/phone-number-validator';
import { LocalStorageService } from './services/localstorage-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditComponent } from './components/edit/edit.component';
import { faker } from '@faker-js/faker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  AllCustomers: Customer[]
  customerForm: FormGroup;
  customers: Customer[];
  searchItem: string;

  constructor(private formBuilder: FormBuilder,
     private localStorageService: LocalStorageService, public dialog: MatDialog) {

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, PhoneNumberValidator]],
      email: ['', [Validators.required, Validators.email]],
      bankAccountNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.AllCustomers = this.localStorageService.getAllLocalStorageItems('customers')
    this.localStorageService.itemSubject.subscribe(res => {
      this.AllCustomers = res
    })
  }

  generaterRandomUser() {
    this.customerForm.reset()
    this.customerForm.controls['phoneNumber'].setValue(faker.phone.phoneNumber('202-456-####'))
    this.customerForm.controls['firstName'].setValue(faker.name.firstName())
    this.customerForm.controls['lastName'].setValue(faker.name.lastName())
    this.customerForm.controls['email'].setValue(faker.internet.email())
    this.customerForm.controls['bankAccountNumber'].setValue(faker.datatype.number({ min: 1000000 }))
    console.log('user', this.customerForm);
  }

  showLocal() {
    const localStorageItem = localStorage.getItem('customers');
    console.log('local items', localStorageItem);
  }


  onSubmit() {
    if (this.customerForm.valid) {

      const customer: Customer = this.customerForm.value;
      this.localStorageService.addItem(customer)
    }
  }

  clearAll() {
    this.localStorageService.deleteAllStorageItems('customers')
  }






  search() {
    const searchResult = this.localStorageService.findItem(this.searchItem)
    if (searchResult) {
      console.log('search result = ', searchResult);
      console.log('form', this.customerForm);
      this.customerForm.setValue(searchResult)

    }
    else {

    }

  }

}