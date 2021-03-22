import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '@hnc/models/item.interface';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import {Router} from '@angular/router';

@Component({
  selector: 'hnc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  {
  @Input() item!: Item;
  @Output() toShare = new EventEmitter<Item>();

  constructor(
    private actionCtrl: ActionSheetController,
    private router: Router
  ) {}

  share(): void {
    this.toShare.emit(this.item);
  }

  presentActions(): void {
    const actions: ActionSheetButton[] = [
      { text: 'Share', icon: 'assets/heroicon-share.svg', handler: this.share.bind(this) },
    ];

    if (this.item.kids?.length) {
      actions.push({
        text: `${this.item.kids.length} comments`,
        icon: 'chatbubbles',
        handler: () => this.router.navigate(['/comments', this.item.id]),
      });
    }

    this.actionCtrl.create({
      header: 'More',
      buttons: actions
    }).then(sheet => sheet.present());
  }
}
