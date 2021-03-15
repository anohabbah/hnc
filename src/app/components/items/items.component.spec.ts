import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemsComponent } from './items.component';
import { ItemComponent } from '@hnc/components/item/item.component';
import { TimeAgoPipe } from '@hnc/components/time-ago/time-ago.pipe';
import { By } from '@angular/platform-browser';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponent, ItemComponent, TimeAgoPipe ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should display a list of items', () => {
    component.items = [
      {id: 1, title: 'Test item 1', url: 'http://example.com/test/1', by: 'user1', time: 156357126, score: 4},
      {id: 2, title: 'Test item 2', url: 'http://example.com/test/2', by: 'user2', time: 156357126, score: 423},
    ];

    fixture.detectChanges();

    const debugElements = fixture.debugElement.queryAll(By.css('h2'));
    expect(debugElements.length).toBe(2);
    expect(debugElements[0].nativeElement.textContent).toContain('Test item 1');
    expect(debugElements[1].nativeElement.textContent).toContain('Test item 2');
  });

  it('should display no items', () => {
    component.items = [];
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('p'));
    expect(debugElement).not.toBeNull();
    expect(debugElement.nativeElement.textContent).toContain('No items');
  });
});
