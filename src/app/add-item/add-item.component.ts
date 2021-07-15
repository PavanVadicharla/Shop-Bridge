import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FetchItemsService } from 'src/services/fetch-items-from-cart-service';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public addItem: FormGroup;
  public itemsInCart: any;
  addBtnDisabled: Boolean = true;
  msg: string = '';
  constructor(private fetchItemsService: FetchItemsService, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private flashMessages: FlashMessagesService) {
    this.itemsInCart = this.fetchItemsService.getAvailableItemsFromCart();
    this.addItem = this.formBuilder.group({
      id: [''],
      item_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,10}(?:\.\d{1,4})?|\.\d{1,4}$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,10}$/)]]
  });
  }
  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get formField() { 
    if (this.addItem.valid) {
      this.addBtnDisabled = false;
    } else {
      this.addBtnDisabled = true;
    }
    return this.addItem.controls; 
  }

  resetForm(){
    this.addItem.reset();
  }
  add(){
    if(this.addItem.valid){
      let next_index = Number(localStorage.getItem("items_index"));
      this.addItem.value.id = next_index;
      if(!this.userService.isExists(this.addItem.value)) {
        this.fetchItemsService.setItemInLocalStorage(this.addItem.value);
        this.flashMessages.show('Successfully added item to the cart!', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      } else {
        this.flashMessages.show('Item '+this.addItem.value.item_name+' is already present in the cart!', {
          cssClass: 'alert-warning',
          timeout: 4000
        });
      }
      this.resetForm();
    } else {
      this.flashMessages.show('Please enter all the fields!', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
