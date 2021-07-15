
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

    /**
     * Method to fetch the items available in the cart
     * @returns all the items available in the cart
     */
    getAvailableItemsFromCart() {
        return this.itemsInCart;
    }

    /**
     * Method to fetch the types of items available in the cart
     * @returns all the available item types in the cart
     */
    getAllPropertiesofItems() {
        return this.headers;
    }

    /**
     * Method to add item to the cart
     * @param item_to_add item to be added to the cart
     */
    setItemInLocalStorage(item_to_add: any) {
        this.itemsInCart.push(item_to_add);
        this.userService.setStorage(this.itemsInCart);
        this.userService.setIndex("increase");
        this.orderItems();
    }

    /**
     * Method to update the existing item in the cart
     * @param item_to_update item to be updated in the cart
     */
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

    /**
     * Method to delete the item from the cart
     * @param item_to_delete item to be deleted from the cart
     */
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

    /**
     * Method to order the items available in the cart based on id attribute
     */
    orderItems() {
        var i =1;
        for (let each_item of this.itemsInCart) {
            each_item.id = i;
            i++;    
        }
        this.userService.setStorage(this.itemsInCart);
    }
} 