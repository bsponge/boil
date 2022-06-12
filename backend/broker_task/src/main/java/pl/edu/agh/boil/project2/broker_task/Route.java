package pl.edu.agh.boil.project2.broker_task;

/**
 * 
 * @author CopperV
 *
 */
public class Route {
	
	private int provider;
	private int customer;
	private double costOfTransport;
	private double amountOfGoods;
	
	private double profit;
	
	public Route() {
		this.profit = 0;
	}

	public Route(int provider, int customer, double costOfTransport) {
		super();
		this.provider = provider;
		this.customer = customer;
		this.costOfTransport = costOfTransport;
		this.amountOfGoods = 0;
		this.profit = 0;
	}

	public int getProvider() {
		return provider;
	}

	public void setProvider(int provider) {
		this.provider = provider;
	}

	public int getCustomer() {
		return customer;
	}

	public void setCustomer(int customer) {
		this.customer = customer;
	}

	public double getCostOfTransport() {
		return costOfTransport;
	}

	public void setCostOfTransport(double costOfTransport) {
		this.costOfTransport = costOfTransport;
	}

	public double getAmountOfGoods() {
		return amountOfGoods;
	}

	public void setAmountOfGoods(double amountOfGoods) {
		this.amountOfGoods = amountOfGoods;
	}

	public double getProfit() {
		return profit;
	}

	public void setProfit(double profit) {
		this.profit = profit;
	}
	
}
