import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let service: CustomerService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule, MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule, NoopAnimationsModule],
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
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.customerForm.valid).toBeFalsy();
  });

  it('form invalid when invalid email', () => {
    const form = mockData[0]
    form.email = 'test'
    expect(component.customerForm.valid).toBeFalsy();
  });

  it('form invalid when invalid phone', () => {
    const form = mockData[0]
    form.phoneNumber = '123456789'
    expect(component.customerForm.valid).toBeFalsy();
  });

  it('form invalid when no bank account number', () => {
    const form = mockData[0]
    form.bankAccountNumber = ''
    expect(component.customerForm.valid).toBeFalsy();
  });

  it('shows error when email field is touched but doesnt have value', () => {
    component.customerForm.controls['email'].markAsTouched()
    expect(component.getEmailError()).toBe('You should fill this field!');
  });
  it('shows error when email field is touched and  have  wrong value', () => {
    component.customerForm.controls['email'].markAsTouched()
    component.customerForm.controls['email'].setValue('sepehr')
    expect(component.getEmailError()).toBe('Please write a valid email address');
  });
  it('shows error when phone field is touched but doesnt have value', () => {
    component.customerForm.controls['phoneNumber'].markAsTouched()
    expect(component.getPhoneError()).toBe('You should fill this field!');
    component.customerForm.controls['phoneNumber'].setValue('123456')
    expect(component.getPhoneError()).toBe('Please write a valid phone number eg: 202-456-7698');
  });


  it('shows error when name field is touched but doesnt have value', () => {
    component.customerForm.controls['firstName'].markAsTouched()
    fixture.detectChanges()

    fixture.whenStable().then(() => {
      const errors = fixture.debugElement.queryAll(By.css('error'))
      console.log('errors', errors);
      let error = errors[1].nativeElement
      expect(error.textContent).toBe('You should fill this field!');
    })
  });

  it('shows error when email is duplicated', () => {
    const emailSpy = spyOn(service, 'isEmailUnique').and.returnValue(false).and.callThrough()
    const addSpy = spyOn(service, 'addCustomer').and.callThrough()
    expect(emailSpy).not.toHaveBeenCalled()
    component.onSubmit()
    expect(addSpy).not.toHaveBeenCalled()
  });

  it('form cant be submited and shows error when user is not unique', () => {
    const itemSpy = spyOn(service, 'isItemUnique').and.returnValue(false).and.callThrough()
    const addSpy = spyOn(service, 'addCustomer').and.callThrough()
    expect(itemSpy).not.toHaveBeenCalled()
    component.onSubmit()
    expect(addSpy).not.toHaveBeenCalled()
  });

  it('form cant be submited and shows error when user is not unique', () => {
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




});
