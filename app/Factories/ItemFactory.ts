import { Item } from "../Items/Item"

enum ProductCategory {
  REGULAR,
  CHEESY,
  BACKSTAGEPASS,
  LEGENDARY,
}

export class ItemFactory {
    createItem(name: string, sellIn: number, quality: number): Item {
      // Logic to determine and create the appropriate Item subclass
      if (name.includes("Brie")) {
        return new AgedBrieItem(name, sellIn, quality);
      } else if (name.includes("Sulfuras")) {
        return new LegendaryItem(name, sellIn, quality);
      } else if (name.includes("Backstage")) {
        return new BackstagePassItem(name, sellIn, quality);
      } else {
        return new RegularItem(name, sellIn, quality);
      }
    }
  }

  // Subclasses for different types of items
class AgedBrieItem extends Item {
    category: ProductCategory = ProductCategory.CHEESY
  }
  
  class LegendaryItem extends Item {
    category: ProductCategory = ProductCategory.LEGENDARY
  }
  
  class BackstagePassItem extends Item {
    category: ProductCategory = ProductCategory.BACKSTAGEPASS
  }
  
  class RegularItem extends Item {
    category: ProductCategory = ProductCategory.REGULAR
  }