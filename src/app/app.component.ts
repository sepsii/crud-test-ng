import { Component } from '@angular/core';
import { OnInit } from '@angular/core/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './models/customer.model';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneNumberValidator } from './validators/phone-number-validator';
import { LocalStorageService } from './services/localstorage-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  AllCustomers: Customer[]
  customerForm: FormGroup;
  customers: Customer[];
  playerName: string;

  constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

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
    // this.AllCustomers = this.localStorageService.getAllLocalStorageItems('customers')
    this.localStorageService.itemSubject.subscribe(res => {
      this.AllCustomers = res
    })
  }


  addUser1() {
    this.customerForm.reset()
    this.customerForm.controls['phoneNumber'].setValue('202-456-1234')
    this.customerForm.controls['firstName'].setValue('setare')
    this.customerForm.controls['lastName'].setValue('sharifi')
    this.customerForm.controls['email'].setValue('setare@gmail.com')
    this.customerForm.controls['bankAccountNumber'].setValue('919414470')
    console.log('user', this.customerForm);
  }


  addUser2() {
    this.customerForm.reset()
    this.customerForm.controls['phoneNumber'].setValue('202-456-1414')
    this.customerForm.controls['firstName'].setValue('sep')
    this.customerForm.controls['lastName'].setValue('sharifi')
    this.customerForm.controls['email'].setValue('sepehr@gmail.com')
    this.customerForm.controls['bankAccountNumber'].setValue('919414470')
    console.log('user', this.customerForm);
  }


  showLocal() {
    const localStorageItem = localStorage.getItem('customers');
    console.log('local items', localStorageItem);
  }


  onSubmit() {
    const customer: Customer = this.customerForm.value;
    this.localStorageService.addItem(customer)
  }

  clearAll() {
    this.localStorageService.deleteAllStorageItems('customers')
  }



  deleteItem(customer: Customer) {
    this.localStorageService.deleteItem(customer.email)
  }


  test1() {
    console.log('playername',this.playerName);
    
    return this.playerName;

  }

}