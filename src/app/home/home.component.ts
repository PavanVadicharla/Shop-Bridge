import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { FetchItemsService } from 'src/services/fetch-items-from-cart-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public itemsList: any;
  public headers: any;
  public items = [];
  public tableConfigData: any = {headers: [], data: []};

  constructor(public router: Router, private fetchItemsService: FetchItemsService) { 
  }

  ngOnInit(): void {
    this.headers = this.fetchItemsService.getAllPropertiesofItems();
    this.items = this.fetchItemsService.getAvailableItemsFromCart();
    this.tableConfigData["headers"] = this.headers;
    this.tableConfigData["data"] = this.items;
  }
}
