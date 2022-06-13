class Customer {
  constructor(name, column=0, demand=0, demandLeft=0, sellingPrice=0) {
    this.name = name
    this.column = column
    this.demand = demand
    this.demandLeft = demandLeft
    this.sellingPrice = sellingPrice
  }
}

export default Customer;