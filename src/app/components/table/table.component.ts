import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { LocalStorageService } from 'src/app/services/localstorage-service.service';
import { EditComponent } from '../edit/edit.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableData: Customer[]


  constructor(private localStorageService: LocalStorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(customer?: Customer) {
    this.dialog.open(EditComponent, {
      data: customer
    })
  }
  deleteItem(customer: Customer) {
    this.localStorageService.deleteItem(customer.email)
  }
  getDate(date) {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    return formattedDate

  }
}
