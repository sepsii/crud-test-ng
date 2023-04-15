import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: CustomerService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [MatDialogModule,
        ReactiveFormsModule,
        FormsModule
      ],
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not search when there are no search items', () => {
    const userServiceSpy = spyOn(service, 'findCustomer').and.callThrough();
    expect(userServiceSpy).not.toHaveBeenCalled()
    const searchButton = fixture.nativeElement.querySelectorAll('span')[0]

    searchButton.click()
    expect(userServiceSpy).not.toHaveBeenCalled()
  });

  it('should  search when there are  search items', () => {
    const userServiceSpy = spyOn(service, 'findCustomer').and.callThrough();
    expect(userServiceSpy).not.toHaveBeenCalled()
    const input = fixture.nativeElement.querySelectorAll('input')[0]
    const searchButton = fixture.nativeElement.querySelectorAll('span')[0]

    input.value = 'test value'
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      searchButton.click()
      expect(userServiceSpy).toHaveBeenCalled()
    })
  });
  
});
