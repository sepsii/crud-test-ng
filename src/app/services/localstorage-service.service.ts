import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private customers: Customer[] = [];

  constructor() { }

  
  addItem(customer: Customer) {
    const customers: Customer[] = this.getAllLocalStorageItems('customers')
    if (this.isEmailUnique(customer.email) && this.isItemUnique(customer)) {
      customers.push(customer);
      localStorage.setItem("customers", JSON.stringify(this.customers));
    } else {
      // add error 
    }
  }


  getAllLocalStorageItems(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  }


  deleteItem(email: string) {
    const customers: Customer[] = this.getAllLocalStorageItems('customers')
    const afterItemDeletedCustomers = customers.filter(i => i.email !== email);
    this.customers = afterItemDeletedCustomers;
    localStorage.setItem("customers", JSON.stringify(this.customers));;
  }


  deleteAllStorageItems(key: string): void {
    localStorage.removeItem(key);
  }



  updateItem(email: string, customer: Customer) {
    const customers: Customer[] = this.getAllLocalStorageItems('customers')
    const customerExist = customers.findIndex(i => i.email === email);
    if (customerExist) {
      if (!this.isItemUnique(customer)) {
        this.customers[customerExist] = customer;
        localStorage.setItem("customers", JSON.stringify(this.customers));
      } else {
        // add error
      }

    } else {
      // add error 
    }
  }

  findItem(email: string) {
    const customers: Customer[] = this.getAllLocalStorageItems('customers')

    return customers.find(i => i.email === email);
  }




  isItemUnique(customer: Customer): boolean {
    const customers: Customer[] = this.getAllLocalStorageItems('customers')
    return !customers.some(c => c.firstName === customer.firstName && c.lastName === customer.lastName &&
      c.dateOfBirth === customer.dateOfBirth);
  }


  isEmailUnique(email: string): boolean {
    const customers: Customer[] = this.getAllLocalStorageItems('customers')
    return !customers.some(c => c.email === email);
  }


}

