import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { EditComponent } from '../edit/edit.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchItem: string;

  constructor(private customerService: CustomerService,
    public dialog: MatDialog, private toast: HotToastService) { }

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
        this.toast.error('couldnt find user', { duration: 1000 })
      }
    }

    else {
      this.toast.error('please fill this with an email address', { duration: 1000 })

    }
  }
}
