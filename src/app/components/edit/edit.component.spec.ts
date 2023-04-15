import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

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
describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let service: CustomerService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [MatDialogModule,
        ReactiveFormsModule,
        FormsModule,],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialogModule, useValue: {} },
      ]
    })
      .compileComponents();
    service = TestBed.inject(CustomerService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when invalid phone', () => {
    const form = mockData[0]
    form.phoneNumber = '123456789'
    expect(component.customerForm.valid).toBeFalsy();
  });

  it('form cant be submitted if user is not unique', () => {
    const itemSpy = spyOn(service, 'isItemUnique').and.returnValue(false).and.callThrough()
    const addSpy = spyOn(service, 'addCustomer').and.callThrough()
    expect(itemSpy).not.toHaveBeenCalled()
    component.onSubmit()
    expect(addSpy).not.toHaveBeenCalled()
  });

  it('form cant be submitted if user is not unique', () => {
    const itemSpy = spyOn(service, 'isItemUnique').and.returnValue(false).and.callThrough()
    const addSpy = spyOn(service, 'addCustomer').and.callThrough()
    expect(itemSpy).not.toHaveBeenCalled()
    component.onSubmit()
    expect(addSpy).not.toHaveBeenCalled()
  });

  it('form can submit with correct data', () => {
    const addSpy = spyOn(service, 'addCustomer').and.callThrough()
    component.customerForm.setValue(mockData[0])
    component.onSubmit()
    fixture.detectChanges()

    fixture.whenStable().then(() => {

      expect(addSpy).toHaveBeenCalled()
    })
  });

  it('form closes when submit', () => {
    component.customerForm.setValue(mockData[0])
    component.onSubmit()
    fixture.detectChanges()

    fixture.whenStable().then(() => {

    })
  });

});
