import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '@hnc/services/item/item.service';
import { OpenPageService } from '@hnc/services/open-page/open-page.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ItemService, OpenPageService]
})
export class ServicesModule {}
