export class Fruit {
  name: string;
  protected sweetness: number;
  private isEdible = true;

  constructor(name: string, sweetness = 50) {
    this.name = name;
    this.sweetness = sweetness;
  }

  get tasty() {
    if (this.sweetness > 60) return true;
    return false;
  }

  static cook(fruit: Fruit) {
    return `Cooked ${fruit.name}`;
  }
}

export class Apple extends Fruit {
  constructor(public variety: string) {
    super("Apple", 80);
  }
}
