import { Injectable } from '@angular/core';
 
@Injectable()
export class UserService {
    itemsInCart: any; 
    constructor() {
        this.itemsInCart = this.getStorage();
    }
    /**
     * Method used to check whether the item with some item_name already exists in the cart
     * @param item item which is checked for availability in the cart
     * @returns true if exists else false
     */
    isExists(item: any){
        return this.itemsInCart.some(function(element:any) {
          return element.item_name.toLowerCase() === item.item_name.toLowerCase();
        }); 
    }
    /**
     * Method to return the available items in the cart
     * @returns the avilable items in the cart
     */
    getStorage() {
        return JSON.parse(localStorage.getItem("cart_items") || "[]");
    }

    /**
     * Method to set the cart with the set of items
     * @param items items which needs to be added to the cart
     */
    setStorage(items: []) {
        localStorage.setItem("cart_items", JSON.stringify(items));
    }

    /**
     * Method used to set the session timeout of the logged in user
     */
    setSession() {
        let currentDate = new Date();
        let presentTimeInMS = currentDate.getTime();
        localStorage.setItem("session_timeout", String(presentTimeInMS+180000));
    }

    /**
     * Method used to get the session timeout of the logged in user
     */
    getSession() {
        return Number(localStorage.getItem("session_timeout")) || 0;
    }

    /**
     * Method used to get the next available index to be assigned for the new item
     */
    getIndex() {
        return Number(localStorage.getItem("items_index")) || 0;
    }

    /**
     * Method to set the index value based on the type param
     * @param type indicates what operation to be performed
     * If "increase" means sets the index with the increment value by 1
     * else if "decrease" means sets the index with the decrement value by 1
     */
    setIndex(type:string) {
        if (type == "increase") {
            localStorage.setItem("items_index", String(this.getIndex()+1));
        } else if (type == "decrease") {
            localStorage.setItem("items_index", String(this.getIndex()-1));
        }
    }
} 