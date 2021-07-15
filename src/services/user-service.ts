import { Injectable } from '@angular/core';
 
@Injectable()
export class UserService {
    itemsInCart: any; 
    constructor() {
        this.itemsInCart = this.getStorage();
    }
    isExists(item: any){
        return this.itemsInCart.some(function(element:any) {
          return element.item_name.toLowerCase() === item.item_name.toLowerCase();
        }); 
    }
    getStorage() {
        return JSON.parse(localStorage.getItem("cart_items") || "[]");
    }
    setStorage(items: []) {
        localStorage.setItem("cart_items", JSON.stringify(items));
    }
    setSession() {
        let currentDate = new Date();
        let presentTimeInMS = currentDate.getTime();
        localStorage.setItem("session_timeout", String(presentTimeInMS+180000));
    }
    getSession() {
        return Number(localStorage.getItem("session_timeout")) || 0;
    }
    getIndex() {
        return Number(localStorage.getItem("items_index")) || 0;
    }
    setIndex(type:string) {
        if (type == "increase") {
            localStorage.setItem("items_index", String(this.getIndex()+1));
        } else if (type == "decrease") {
            localStorage.setItem("items_index", String(this.getIndex()-1));
        }
    }
} 