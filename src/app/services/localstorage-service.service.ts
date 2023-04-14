import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // private customers: Customer[] = [];

  constructor() { 
  }
  itemSubject = new BehaviorSubject(this.item)

  set item(customers) {
    this.itemSubject.next(customers);
    localStorage.setItem("customers", JSON.stringify(customers));
  }

  get item() {
    const item = localStorage.getItem('customers');
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }  }




  addItem(customer: Customer) {

    const customers= this.item
    if (this.isEmailUnique(customer.email) && this.isItemUnique(customer)) {
      customers.push(customer);
      this.item = customers


    } else {
      // add error 
    }
  }



  deleteItem(email: string) {
    let customers: Customer[] = this.item
    const afterItemDeletedCustomers = customers.filter(i => i.email !== email);
    const updatedCustomers = afterItemDeletedCustomers;
    // localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    this.item=updatedCustomers
  }


  deleteAllStorageItems(key: string): void {
    localStorage.removeItem(key);
    this.item=[]
  }



  updateItem(email: string, customer: Customer) {
    let customers: Customer[] = this.item
    const customerExist = customers.findIndex(i => i.email === email);
    if (customerExist !=null) {
      if (this.isItemUnique(customer)) {
        customers[customerExist] = customer;
        this.item=customers
        this.item
      } else {
        // add error
      }

    } else {
      // add error 
    }
  }

  findItem(email: string) {
    let customers: Customer[] = this.item

    return customers.find(i => i.email === email);
  }




  isItemUnique(customer: Customer): boolean {
    let customers: Customer[] = this.item
    return !customers.some(c => c.firstName === customer.firstName && c.lastName === customer.lastName &&
      c.dateOfBirth === customer.dateOfBirth);
  }


  isEmailUnique(email: string): boolean {
    let customers: Customer[] = this.item
    return !customers.some(c => c.email === email);
  }


}

