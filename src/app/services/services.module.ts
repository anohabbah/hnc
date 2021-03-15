import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemService} from '@hnc/services/item/item.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ItemService]
})
export class ServicesModule { }
