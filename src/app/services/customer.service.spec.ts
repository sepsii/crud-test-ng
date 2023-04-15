import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';
import { LocalStorageService } from './localstorage.service';
const mockData: Customer[] = [
  {
    firstName: 'sepehr',
    lastName: 'sharifi',
    email: 'sepehr@gmail.com',
    phoneNumber: '202-456-7894',
    bankAccountNumber: '123456789',
    dateOfBirth: new Date('1/1/1994'),
  },
  {
    firstName: 'setare',
    lastName: 'ahmadi',
    email: 'setare@gmail.com',
    phoneNumber: '202-456-9874',
    bankAccountNumber: '987654321',
    dateOfBirth: new Date('9/9/1999'),
  },

]
const mockUser: Customer = {
  firstName: 'maryam',
  lastName: 'rezaei ',
  email: 'maryam@gmail.com',
  phoneNumber: '202-456-1234',
  bankAccountNumber: '456123789',
  dateOfBirth: new Date('2/2/2007'),
}
const mockData2: Customer[] = [
  {
    firstName: 'sepehr',
    lastName: 'sharifi',
    email: 'sepehr@gmail.com',
    phoneNumber: '202-456-7894',
    bankAccountNumber: '123456789',
    dateOfBirth: new Date('1/1/1994'),
  },
  {
    firstName: 'setare',
    lastName: 'ahmadi',
    email: 'setare@gmail.com',
    phoneNumber: '202-456-9874',
    bankAccountNumber: '987654321',
    dateOfBirth: new Date('9/9/1999'),
  },
  {
    firstName: 'maryam',
    lastName: 'rezaei ',
    email: 'maryam@gmail.com',
    phoneNumber: '202-456-1234',
    bankAccountNumber: '456123789',
    dateOfBirth: new Date('2/2/2007'),
  }
]
describe('CustomerService', () => {

  let customerService: CustomerService;
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        LocalStorageService,
      ]
    });
    customerService = TestBed.inject(CustomerService);
    localStorageService = TestBed.inject(LocalStorageService);
  });


  it('should be created', () => {
    expect(customerService).toBeTruthy();
  });


  it('should add customer if email is unique and item is unique', () => {
    spyOn(localStorageService, 'add');
    spyOn(customerService, 'isEmailUnique').and.returnValue(true);
    spyOn(customerService, 'isItemUnique').and.returnValue(true);
    customerService.addCustomer(mockUser);
    expect(localStorageService.add).toHaveBeenCalledWith(mockUser);
  });

  it('should not add customer if email is not unique', () => {
    spyOn(localStorageService, 'add');
    spyOn(customerService, 'isEmailUnique').and.returnValue(false);
    spyOn(customerService, 'isItemUnique').and.returnValue(true);
    customerService.addCustomer(mockUser);
    expect(localStorageService.add).not.toHaveBeenCalled();
  });

  it('should not add customer if item is not unique', () => {
    spyOn(localStorageService, 'add');
    spyOn(customerService, 'isEmailUnique').and.returnValue(true);
    spyOn(customerService, 'isItemUnique').and.returnValue(false);
    customerService.addCustomer(mockUser);
    expect(localStorageService.add).not.toHaveBeenCalled();
  });



  it('should delete customer', () => {
    spyOn(localStorageService, 'delete');
    customerService.deleteCustomer(mockUser.email);
    expect(localStorageService.delete).toHaveBeenCalledWith(mockUser.email);
  });

  it('should update customer if item is unique', () => {
    spyOn(localStorageService, 'update');
    spyOn(customerService, 'isItemUnique').and.returnValue(true);
    customerService.updateCustomer(mockUser.email, mockUser);
    expect(localStorageService.update).toHaveBeenCalledWith(mockUser);
  });

  it('should not update customer if item is not unique', () => {
    spyOn(localStorageService, 'update');
    spyOn(customerService, 'isItemUnique').and.returnValue(false);
    customerService.updateCustomer(mockUser.email, mockUser);
    expect(localStorageService.update).not.toHaveBeenCalled();
  })
});



