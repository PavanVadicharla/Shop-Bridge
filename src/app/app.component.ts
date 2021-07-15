import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/authentication-service';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ShopBridge';
  itemsList: any;
  constructor(private userService: UserService,
    private authService: AuthService){
    if(this.userService.getStorage() == '') {
      this.itemsList = [
        { id: 1, item_name: 'Tablet', description: 'High performant', price: 20000, quantity: 20 }, 
        { id: 2, item_name: 'Mobile', description: 'low cost', price: 12000, quantity: 88 },
        { id: 3, item_name: 'PC', description: 'best for gaming', price: 50000, quantity: 31 },
        { id: 4, item_name: 'TV', description: 'more % of discounts', price: 35000, quantity: 55 },
        { id: 5, item_name: 'AC', description: 'best in the market', price: 15000, quantity: 48 }
      ];
      localStorage.setItem("cart_items", JSON.stringify(this.itemsList));
      localStorage.setItem("items_index", "6");
    }

  }
  ngOnInit() {
    localStorage.setItem('login_credentials', '{"username": "admin", "password": "Admin@123"}');
  }
}
