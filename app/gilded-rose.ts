import { Item } from "./Items/Item";
import { ItemFactory } from "./Factories/ItemFactory";

export class GildedRose {
  items: Array<Item>;
  itemFactory: ItemFactory

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.itemFactory = new ItemFactory()
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      this.items[i] = this.itemFactory.createItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
      

      //Loops through items and decreases its quality by 1, except for aged brie and backstage passes
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
        //aged brie and backstage passes increase in quality by 1
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            //passes increase by extra +1 if less 10 days or less to concert
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            //passes increase by extra +1 if less 5 days or less to concert
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }

      // decreases sellIn value by 1 for all items except Sulfuras
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      //items decrease in quality by extra -1 if sellIn is less than 0
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
            //
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }


    }

    return this.items;
  }
}
