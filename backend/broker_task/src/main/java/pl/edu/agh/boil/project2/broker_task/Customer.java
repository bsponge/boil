package pl.edu.agh.boil.project2.broker_task;

/**
 * 
 * @author CopperV
 *
 */
public class Customer {

	private int column;
	private String name;
	private double demand;
	private double sellingPrice;
	
	private double demandLeft;
	
	public Customer() {
		
	}

	public Customer(int column, String name, double demand, double sellingPrice) {
		super();
		this.column = column;
		this.name = name;
		this.demand = demand;
		this.sellingPrice = sellingPrice;
		this.demandLeft = demand;
	}

	public int getColumn() {
		return column;
	}

	public void setColumn(int column) {
		this.column = column;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getDemand() {
		return demand;
	}

	public void setDemand(double demand) {
		this.demand = demand;
	}

	public double getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(double sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public double getDemandLeft() {
		return demandLeft;
	}

	public void setDemandLeft(double demandLeft) {
		this.demandLeft = demandLeft;
	}
}
