class Provider {
  constructor(name, row=0, supply=0, supplyLeft=0, costOfPurchase=0) {
    this.name = name
    this.row = row
    this.supply = supply
    this.supplyLeft = supplyLeft
    this.costOfPurchase = costOfPurchase
  }
}

export default Provider;