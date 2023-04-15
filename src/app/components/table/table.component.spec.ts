import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { Customer } from 'src/app/models/customer.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
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
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let service: CustomerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
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
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableData = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data in the table correctly', () => {
    const firstTableRow = fixture.nativeElement.querySelectorAll('tr')[1].querySelectorAll('td')

    expect(firstTableRow[0].textContent).toContain('sepehr')
    expect(firstTableRow[1].textContent).toContain('sharifi')
    expect(firstTableRow[2].textContent).toContain('sepehr@gmail.com')
    expect(firstTableRow[3].textContent).toContain('202-456-7894')
    expect(firstTableRow[4].textContent).toContain('123456789')
    expect(firstTableRow[5].textContent).toContain('01/01/1994')
    expect(firstTableRow[6].textContent).toContain('edit')
    expect(firstTableRow[7].textContent).toContain('delete')


    const secondRowItems = fixture.nativeElement.querySelectorAll('tr')[2].querySelectorAll('td')

    expect(secondRowItems[0].textContent).toContain('setare')
    expect(secondRowItems[1].textContent).toContain('ahmadi')
    expect(secondRowItems[2].textContent).toContain('setare@gmail.com')
    expect(secondRowItems[3].textContent).toContain('202-456-9874')
    expect(secondRowItems[4].textContent).toContain('987654321')
    expect(secondRowItems[5].textContent).toContain('09/09/1999')
    expect(secondRowItems[6].textContent).toContain('edit')
    expect(secondRowItems[7].textContent).toContain('delete')

    const headerItems = fixture.nativeElement.querySelectorAll('th')
    expect(headerItems[0].textContent).toContain('Firstname')
    expect(headerItems[1].textContent).toContain('Lastname')
    expect(headerItems[2].textContent).toContain('Email')
    expect(headerItems[3].textContent).toContain('PhoneNumber')
    expect(headerItems[4].textContent).toContain('Bank Account')
    expect(headerItems[5].textContent).toContain('Date Of Birth')
    expect(headerItems[6].textContent).toContain('Edit')
    expect(headerItems[7].textContent).toContain('Delete')
  });

  
  it('should open edit component when on edit is called', () => {
    const openDialogSpy = spyOn(component.dialog, 'open')
    component.openDialog(mockData[0])
    expect(openDialogSpy).toHaveBeenCalled();
  });


  it('should delete data if delete is called', () => {
    const userServiceSpy = spyOn(service, 'deleteCustomer').and.callThrough();
    expect(userServiceSpy).not.toHaveBeenCalled()
    const firstTableRow = fixture.nativeElement.querySelectorAll('tr')[1].querySelectorAll('td')
    firstTableRow[7].click()
    expect(userServiceSpy).toHaveBeenCalled()
  });


});
