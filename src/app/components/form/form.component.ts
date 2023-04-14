import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/services/localstorage-service.service';
import { PhoneNumberValidator } from 'src/app/validators/phone-number-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  customerForm: FormGroup;
  @Input() searchItem: Customer


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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchItem'].currentValue) {
      console.log('yayy', changes['searchItem']);
      const customer = changes['searchItem'].currentValue
      this.customerForm.setValue(customer)


    }
  }
  onSubmit() {
    console.log('customer formmm', this.customerForm);

    if (this.customerForm.valid) {

      const customer: Customer = this.customerForm.value;
      this.localStorageService.addItem(customer)
    }
  }
}
