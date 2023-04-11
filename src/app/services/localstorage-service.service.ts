import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private customers: Customer[] = [];

  constructor() { }
  
  addItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }


removeItem(key: string): void {
  localStorage.removeItem(key);
}


getItem(key: string): any {
  const item = localStorage.getItem(key);
  
  if (item) {
    return JSON.parse(item);
  } else {
    return [];
  }
}
  }

