import { Injectable } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

@Injectable()
export class SocialSharingService {
  constructor(private socialSharing: SocialSharing) {}

  share(message: string, url: string): Promise<void> {
    return this.socialSharing.share(message, undefined, [], url);
  }
}
