import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './localstorage.service';
import { Customer } from '../models/customer.model';
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
describe('CustomerServiceService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.setItem("customers", JSON.stringify(mockData));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  get', () => {
    const items = service.get()

    items.map(element => {
      element.dateOfBirth = new Date(element.dateOfBirth)
    });
    expect(items).toEqual(mockData)
  });


  it('should  add', () => {
    service.add(mockUser)
    const items = JSON.parse(localStorage.getItem('customers'))
    items.map(element => {
      element.dateOfBirth = new Date(element.dateOfBirth)
    });
    expect(items).toEqual(mockData2)
  });

  it('should  delete all ', () => {
    service.deleteAllStorageItems('customers')
    const items = JSON.parse(localStorage.getItem('customers'))
    expect(items).toBeFalsy()
  });


  it('should  add all ', () => {
    service.addAll(mockData2)
    const items = JSON.parse(localStorage.getItem('customers'))
    items.map(element => {
      element.dateOfBirth = new Date(element.dateOfBirth)
    });
    expect(items).toEqual(mockData2)
  });

  it('should  delete  ', () => {
    service.delete(mockData[0].email)
    const items = JSON.parse(localStorage.getItem('customers'))
    items.map(element => {
      element.dateOfBirth = new Date(element.dateOfBirth)
    });
    expect(items[0]).toEqual(mockData[1])
  });


  it('should  update  ', () => {
    const updatedData = mockData[0]
    updatedData.firstName = 'mina'
    service.update(updatedData)
    const items = JSON.parse(localStorage.getItem('customers'))
    items.map(element => {
      element.dateOfBirth = new Date(element.dateOfBirth)
    }); 
    expect(items[0]).toEqual(updatedData)
  });
});
