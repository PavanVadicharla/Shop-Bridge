import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog-service';
import { FetchItemsService } from 'src/services/fetch-items-from-cart-service';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  public updateItem: FormGroup;
  updateBtnDisabled: boolean = true;
  constructor(private fetchItemsService: FetchItemsService, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService,
    private confirmDialogService: ConfirmationDialogService) {
    this.updateItem = this.formBuilder.group({
      id: [''],
      item_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,15}$/)]]
  });
  }
  ngOnInit(): void {
    this.updateItem.controls['id'].setValue(this.route.snapshot.paramMap.get('id'));
    this.updateItem.controls['item_name'].setValue(this.route.snapshot.paramMap.get('item_name'));
    this.updateItem.controls['description'].setValue(this.route.snapshot.paramMap.get('description'));
    this.updateItem.controls['price'].setValue(this.route.snapshot.paramMap.get('price'));
    this.updateItem.controls['quantity'].setValue(this.route.snapshot.paramMap.get('quantity'));
  }

  // convenience getter for easy access to form fields
  get formField() { 
    if (this.updateItem.valid) {
      this.updateBtnDisabled = false;
    } else {
      this.updateBtnDisabled = true;
    }
    return this.updateItem.controls; 
  }

  // Method to reset the update item form
  resetForm(){
    this.updateItem.reset();
  }
  
  /**
   * Method which instantiates the update item service method upon the confirmation dialog is selected with "YES"
   */
  update(){
    if(this.updateItem.valid){
      this.confirmDialogService.confirm('Please confirm..', 'Do you really want to update the item '+this.route.snapshot.paramMap.get('item_name')+' to '+this.updateItem.value.item_name+'?')
      .then((confirmed) => {
        if(confirmed) {
          this.fetchItemsService.updateItemInLocalStorage(this.updateItem.value);
          this.resetForm();
        }
      })
      .catch(() => console.log('User dismissed the dialog'));
    } else {
      this.flashMessages.show('Please enter all the fields!', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
  }

  // Method used to redirect the page to homepage
  goBack() {
    this.router.navigate(['home']);
  }
}
