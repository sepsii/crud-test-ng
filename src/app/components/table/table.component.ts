import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { EditComponent } from '../edit/edit.component';
import { formatDate } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableData: Customer[]


  constructor(private customerService: CustomerService, public dialog: MatDialog,
    private toast: HotToastService
    ) { }

  ngOnInit(): void {
  }
  openDialog(customer?: Customer) {
    this.dialog.open(EditComponent, {
      data: customer
    })
  }
  deleteItem(customer: Customer) {
    this.customerService.deleteCustomer(customer.email)
    this.toast.success('Customer deleted!!', { duration: 1000 });

  }
  getDate(date) {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    return formattedDate

  }
}
