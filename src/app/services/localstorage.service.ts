import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private toast: HotToastService) {
    
  }

  itemSubject = new BehaviorSubject(this.get())




  add(item) {
    const allItems = this.get()
    allItems.push(item)
    localStorage.setItem("customers", JSON.stringify(allItems));
    this.itemSubject.next(allItems);
  }

  addAll(item) {
    localStorage.setItem("customers", JSON.stringify(item));
    this.itemSubject.next(item);
  }


  get() {
    const item = localStorage.getItem('customers');
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  }


  delete(email) {
    let customers: Customer[] = this.get()
    const afterItemDeletedCustomers = customers.filter(i => i.email !== email);
    const updatedCustomers = afterItemDeletedCustomers;
    this.addAll(updatedCustomers)
  }



  update(customer) {
    const all = this.get()
    const current = all.findIndex(i => i.email === customer.email);
    all[current] = customer;
    this.addAll(all)

  }

  deleteAllStorageItems(key: string): void {
    localStorage.removeItem(key);
    this.itemSubject.next([]);

  }






}

