import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user-service';
 
@Injectable()
export class FetchItemsService { 
    public itemsInCart: any = {};
    public headers:any = [];
    constructor(private userService: UserService,
        private router: Router) {
        this.itemsInCart = this.userService.getStorage();
        this.headers = ['Id', 'Item', 'Description', 'Price', 'Quantity'];
    }

    getAvailableItemsFromCart() {
        return this.itemsInCart;
    }
    getAllPropertiesofItems() {
        return this.headers;
    }
    setItemInLocalStorage(item_to_add: any) {
        this.itemsInCart.push(item_to_add);
        this.userService.setStorage(this.itemsInCart);
        this.userService.setIndex("increase");
        this.orderItems();
    }
    updateItemInLocalStorage(item_to_update: any) {
        var i =0;
        for (let each_item of this.itemsInCart) {
            if (each_item.id == item_to_update.id) {
                this.itemsInCart[i] = item_to_update;
                this.userService.setStorage(this.itemsInCart);
                this.router.navigate(['home']);
                break;
            }  
            i++;    
        }
    }
    removeItemInLocalStorage(item_to_delete: any) {
        for (let each_item of this.itemsInCart) {
            if (each_item.item_name == item_to_delete.item_name) {
                this.itemsInCart.splice(this.itemsInCart.indexOf(item_to_delete), 1);
                this.userService.setStorage(this.itemsInCart);
                break;
            }      
        }
        this.userService.setIndex("decrease");
        this.orderItems();
    }
    orderItems() {
        var i =1;
        for (let each_item of this.itemsInCart) {
            each_item.id = i;
            i++;    
        }
        this.userService.setStorage(this.itemsInCart);
    }
} 