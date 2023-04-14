import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, catchError } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private localStorageService: LocalStorageService, ) {

  }






  addCustomer(customer: Customer) {

    if (this.isEmailUnique(customer.email) && this.isItemUnique(customer)) {
      this.localStorageService.add(customer)
    }
  }



  deleteCustomer(email: string) {

    this.localStorageService.delete(email)

  }



  updateCustomer(email: string, customer: Customer) {
    let customers: Customer[] = this.localStorageService.get()
    const currentCustomer = customers.findIndex(i => i.email === email);
    const CustomersWithoutCurrentCustomer = customers.filter(i => i.email != email)
    if (currentCustomer != null) {
      if (this.isItemUnique(customer, CustomersWithoutCurrentCustomer)) {
        this.localStorageService.update(customer)
      } else {
      }

    } else {
    }
  }


  findCustomer(email: string) {
    let customers: Customer[] = this.localStorageService.get()

    return customers.find(i => i.email === email);
  }




  isItemUnique(customer: Customer, customers?: Customer[]): boolean {
    if (customers) {
      return !customers.some(c => c.firstName === customer.firstName && c.lastName === customer.lastName &&
        c.dateOfBirth === customer.dateOfBirth);
    }
    else {

      let customers: Customer[] = this.localStorageService.get()



      return !customers.some(c => c.firstName === customer.firstName && c.lastName === customer.lastName &&
        new Date(c.dateOfBirth).getTime() === customer.dateOfBirth.getTime());
    }
  }


  isEmailUnique(email: string): boolean {
    let customers: Customer[] = this.localStorageService.get()
    return !customers.some(c => c.email === email);
  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    Date()
    return datePipe.transform(date, format);

  }
}
