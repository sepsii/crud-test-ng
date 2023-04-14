import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/services/localstorage-service.service';
import { PhoneNumberValidator } from 'src/app/validators/phone-number-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService) {

   this.customerForm = this.formBuilder.group({
     firstName: ['', Validators.required],
     lastName: ['', Validators.required],
     dateOfBirth: ['', Validators.required],
     phoneNumber: ['', [Validators.required, PhoneNumberValidator]],
     email: ['', [Validators.required, Validators.email]],
     bankAccountNumber: ['', Validators.required]
   });
 }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('customer formmm',this.customerForm);
    
    if (this.customerForm.valid) {

      const customer: Customer = this.customerForm.value;
      this.localStorageService.addItem(customer)
    }
  }
}
