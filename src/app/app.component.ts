import { Component } from '@angular/core';
import { OnInit } from '@angular/core/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-test-angular-latest';


ngOnInit(): void {
  console.log('test')
}
}
