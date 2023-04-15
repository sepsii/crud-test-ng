import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { EditComponent } from '../edit/edit.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchItem: string;

  constructor(private customerService: CustomerService,
    public dialog: MatDialog, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.searchItem) {
      const searchResult = this.customerService.findCustomer(this.searchItem.trim())
      if (searchResult) {
        this.dialog.open(EditComponent, {
          data: searchResult
        })
      }
      else {
        this.notificationService.error('couldnt find user', 1000)
      }
    }

    else {
      this.notificationService.error('please fill this with an email address', 1000)

    }
  }
}
