import { GildedRose, } from '@/gilded-rose';
import { Item } from "@/Items/Item";

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    
    expect(items[0].name).toBe('foo');
  });

  it('legendary item has fixed quality day 0', () => {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    console.log(items);
    expect(items[0].quality).toBe(80);
  });

  it('legendary item does not degrade in quality day 5', () => {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it('aged brie increases in quality', () => {
    const initialQuality: number = 10
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, initialQuality)]);
  
    const days: number = 5;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    const finalQuality = initialQuality + days
    expect(gildedRose.items[0].quality).toBe(finalQuality);
  });

  it('aged brie quality does not exceed 50', () => {
    const initialQuality: number = 47
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, initialQuality)]);
  
    const days: number = 5;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(50);
  });

  it('item quality does not drop below 0', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
  
    const days: number = 50;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBeGreaterThan(-1);
  });

  it('item quality degrades twice as fast past sellIn', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 2, 20)]);
  
    const days: number = 3;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(16);
  });

  it('backstage passes increase in quality by 1 when sellIn value is greater than 10', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30)]);
  
    const days: number = 2;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(32);
  });

  it('backstage passes increase in quality by 2 when sellIn value is less than 10 but more than 5', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30)]);
  
    const days: number = 2;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(34);
  });

  it('backstage passes increase in quality by 3 when sellIn value is 5 or less', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)]);
  
    const days: number = 2;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(36);
  });

  it('backstage passes quality drops to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)]);
  
    const days: number = 6;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(0);
  });

});
