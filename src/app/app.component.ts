import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ShopBridge';
  itemsList: any;
  constructor(private userService: UserService){
    if(this.userService.getStorage() == '') {
      this.itemsList = [
        { id: 1, item_name: 'Tablet', description: 'High performant', price: 20000, quantity: 20 }, 
        { id: 2, item_name: 'Mobile', description: 'Low cost when compared to the market', price: 12000, quantity: 88 },
        { id: 3, item_name: 'Gaming PC', description: 'Best for gaming', price: 50000, quantity: 31 },
        { id: 4, item_name: 'TV', description: 'More % of discounts', price: 35000, quantity: 55 },
        { id: 5, item_name: 'AC', description: 'Latest automated with some cool features', price: 15000, quantity: 48 }
      ];
      this.userService.setStorage(this.itemsList); //storing the items in the cart
      this.userService.setIndex("increase"); //increasing the id value by 
    }

  }
  ngOnInit() {
    //storing the login details as "username": "admin", "password": "Admin@123" for demo purpose
    localStorage.setItem('login_credentials', '{"username": "admin", "password": "Admin@123"}');
  }
}
