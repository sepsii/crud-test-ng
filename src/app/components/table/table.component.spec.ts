import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { Customer } from 'src/app/models/customer.model';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const mockData: Customer[] = [{
  firstName: 'sepehr',
  lastName: 'sharifi',
  email: 'sepehr@gmail.com',
  phoneNumber: '202-456-7894',
  bankAccountNumber: '123456789',
  dateOfBirth: new Date('1/1/1994'),

}]
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports:[  MatDialogModule,
        ReactiveFormsModule,
        FormsModule, ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialogModule, useValue: {} },
      ]
    })
      .compileComponents();

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

  it('should display data in the table', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('td');
    expect(tableRows[0].textContent).toContain('sepehr')
  });
});
