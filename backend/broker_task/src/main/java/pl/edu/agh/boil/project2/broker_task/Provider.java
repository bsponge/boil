package pl.edu.agh.boil.project2.broker_task;

/**
 * 
 * @author CopperV
 *
 */
public class Provider {

	
	private int row;
	private String name;
	private double supply;
	private double costOfPurchase;
	
	private double supplyLeft;
	
	public Provider() {
		
	}
	
	public Provider(int row, String name, double supply, double costOfPurchase) {
		super();
		this.row = row;
		this.name = name;
		this.supply = supply;
		this.costOfPurchase = costOfPurchase;
		this.supplyLeft = supply;
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getSupply() {
		return supply;
	}

	public void setSupply(double supply) {
		this.supply = supply;
	}

	public double getCostOfPurchase() {
		return costOfPurchase;
	}

	public void setCostOfPurchase(double costOfPurchase) {
		this.costOfPurchase = costOfPurchase;
	}

	public double getSupplyLeft() {
		return supplyLeft;
	}

	public void setSupplyLeft(double supplyLeft) {
		this.supplyLeft = supplyLeft;
	}
	
}
