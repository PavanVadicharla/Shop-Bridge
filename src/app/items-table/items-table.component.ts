import { Component, Input, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { FetchItemsService } from 'src/services/fetch-items-from-cart-service';
import { UserService } from 'src/services/user-service';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog-service';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {
  @Input() tableConfigData: any;
  public headers: any=[];
  public data: any=[];
  constructor(private router: Router, 
    private fetchItemsService: FetchItemsService, 
    private confirmDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.headers = this.tableConfigData["headers"];
    this.data = this.tableConfigData["data"];
  }
  public addItems() {
    this.router.navigate(['add-item']);
  }

  public updateItems(item: any) {
    this.router.navigate(['update-item', item]);
  }

  public removeItems(item: any) {
    this.confirmDialogService.confirm('Please confirm..', 'Do you really want to delete the item '+item.item_name+'?')
    .then((confirmed) => {
      if(confirmed) {
        this.fetchItemsService.removeItemInLocalStorage(item);
      }
    })
    .catch(() => console.log('User dismissed the dialog'));
  }

  originalOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return 0;
  }
}
