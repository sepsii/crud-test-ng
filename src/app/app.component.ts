import { Component } from '@angular/core';
import { OnInit } from '@angular/core/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './models/customer.model';
import { PhoneNumberValidator } from './validators/phone-number-validator';
import { MatDialog } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';
import { HotToastService } from '@ngneat/hot-toast';
import { EditComponent } from './components/edit/edit.component';
import { CustomerService } from './services/customer.service';
import { LocalStorageService } from './services/localstorage.service';



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
  searchedCustomer: Customer


  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private toast: HotToastService
  ) {

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, PhoneNumberValidator]],
      email: ['', [Validators.required, Validators.email]],
      bankAccountNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.localStorageService.itemSubject.subscribe(res => {
      this.AllCustomers = res
    })
  }

  generaterRandomUser() {
    this.customerForm.reset()
    this.customerForm.controls['phoneNumber'].setValue(faker.phone.number('202-456-####'))
    this.customerForm.controls['firstName'].setValue(faker.name.firstName())
    this.customerForm.controls['lastName'].setValue(faker.name.lastName())
    this.customerForm.controls['email'].setValue(faker.internet.email())
    this.customerForm.controls['dateOfBirth'].setValue(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))
    this.customerForm.controls['bankAccountNumber'].setValue(faker.datatype.number({ min: 1000000 }))
    this.customerService.addCustomer(this.customerForm.value),
      this.toast.success('random user succesfully generated!!', { duration: 1000 });

  }



  clearAll() {
    this.localStorageService.deleteAllStorageItems('customers')
    this.toast.success('local storage cleared!!', { duration: 1000 });

  }


  search() {
    if (this.searchItem) {
      const searchResult = this.customerService.findCustomer(this.searchItem.trim())
      if (searchResult) {
        this.dialog.open(EditComponent, {
          data: searchResult
        })
      }
      else {
        this.toast.error('couldnt find user', { duration: 1000 })
      }
    }

    else {
      this.toast.error('please fill this with an email address', { duration: 1000 })

    }
  }

}