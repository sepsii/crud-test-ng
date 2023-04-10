import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private customers: Customer[] = [];

  constructor() { }

  addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  isCustomerExists(customer: Customer): boolean {
    const isDuplicate = this.customers.some(cust =>
      cust.firstName === customer.firstName &&
      cust.lastName === customer.lastName &&
      cust.dateOfBirth === customer.dateOfBirth
    );
    return isDuplicate;
  }

  isEmailExists(email: string): boolean {
    const isDuplicate = this.customers.some(cust =>
      cust.email === email
    );
    return isDuplicate;
  }

  getCustomers(): Observable<Customer[]> {
    return new Observable<Customer[]>(observer => {
      observer.next(this.customers);
      observer.complete();
    });
  }
}
