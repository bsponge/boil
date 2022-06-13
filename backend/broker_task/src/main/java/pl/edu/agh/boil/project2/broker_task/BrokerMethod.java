package pl.edu.agh.boil.project2.broker_task;

import java.util.ArrayList;
import java.util.List;

public class BrokerMethod {
	
	private Customer[] customers;
	private Provider[] providers;
	private Route[][] routes;
	
	private int trials;
	
	public BrokerMethod() {
		
	}
	
	public BrokerMethod(Customer[] customers, Provider[] providers, Route[][] routes) {
		this.customers = new Customer[customers.length+1];
		this.providers = new Provider[providers.length+1];
		this.routes = new Route[providers.length+1][customers.length+1];
		
		trials = 50;
		
		double totalSupply = 0;
		double totalDemand = 0;
		for(int i = 0; i < providers.length; ++i) {
			totalSupply += providers[i].getSupply();
		}
		for(int i = 0; i < customers.length; ++i) {
			totalDemand += customers[i].getDemand();
		}
		
		Provider fd = new Provider(providers.length, "FD", totalDemand, 0);
		Customer fo = new Customer(customers.length, "FO", totalSupply, 0);
		
		for(int i = 0; i < providers.length; ++i) {
			this.providers[i] = providers[i];
			this.providers[i].setSupplyLeft(this.providers[i].getSupply());
		}
		this.providers[providers.length] = fd;
		this.providers[providers.length].setSupplyLeft(this.providers[providers.length].getSupply());
		
		for(int i = 0; i < customers.length; ++i) {
			this.customers[i] = customers[i];
			this.customers[i].setDemandLeft(this.customers[i].getDemand());
		}
		this.customers[customers.length] = fo;
		this.customers[customers.length].setDemandLeft(this.customers[customers.length].getDemand());
		
		for(int i = 0; i < routes.length; ++i) {
			for(int j = 0; j < routes[i].length; ++j) {
				this.routes[i][j] = routes[i][j];
			}
			this.routes[i][routes[i].length] = new Route(i, routes[i].length, 0);
		}
		for(int j = 0; j <= routes[0].length; ++j) {
			this.routes[routes.length][j] = new Route(routes.length, j, 0);
		}
		
		prepare();
	}
	
	private void prepare() {
		
		for(int i = 0; i < customers.length; ++i) {
			//System.out.print(customers[i].getName()+":"+customers[i].getDemand()+":"+customers[i].getDemandLeft()+":"+customers[i].getSellingPrice()+"\t");
		}
		//System.out.println();
		//System.out.println();
		for(int i = 0; i < providers.length; ++i) {
			//System.out.print(providers[i].getName()+":"+providers[i].getSupply()+":"+providers[i].getSupplyLeft()+":"+providers[i].getCostOfPurchase()+"\t");
		}
		//System.out.println();
		//System.out.println();
		for(int i = 0; i < routes.length; ++i) {
			for(int j = 0; j < routes[i].length; ++j) {
				//System.out.print(routes[i][j].getCostOfTransport()+"\t");
			}
			//System.out.println();
		}
		
		
		//Obliczenie zysku
		for(int i = 0; i < (routes.length-1); ++i) {
			for(int j = 0; j < (routes[i].length-1); ++j) {
				double profit = customers[j].getSellingPrice() - routes[i][j].getCostOfTransport() - providers[i].getCostOfPurchase();
				routes[i][j].setProfit(profit);
				//System.out.println(i+" "+j+" = "+profit);
			}
		}
		
		//System.out.println("==========================");
		
		while(true) {
			
			//Wyznaczanie najwiekszego elementu macierzy dopoki jest to mozliwe
			double max = Integer.MIN_VALUE;
			int row = -1;
			int column = -1;
			for(int i = 0; i < routes.length; ++i) {
				for(int j = 0; j < routes[i].length; ++j) {
//					//System.out.println(i+" "+j+": "+routes[i][j].getAmountOfGoods()+"\t"+providers[i].getSupplyLeft()+"\t"+customers[j].getDemandLeft());
					if(providers[i].getSupplyLeft() <= 0)
						continue;
					if(customers[j].getDemandLeft() <= 0)
						continue;
					if(routes[i][j].getProfit() < max)
						continue;
					//System.out.println(i+" "+j+" = "+routes[i][j].getProfit()+"\t"+max);
					max = routes[i][j].getProfit();
					row = i;
					column = j;
				}
			}
//			System.out.println(">>>>>>>>>>>>>>>>>>>>>>");
			if(row < 0 || column < 0)
				break;

//			System.out.println(row+" "+column+" = "+routes[row][column].getProfit());
			
			double toTake;
			if(providers[row].getSupplyLeft() < customers[column].getDemandLeft()) {
				toTake = providers[row].getSupplyLeft();
			} else {
				toTake = customers[column].getDemandLeft();
			}
			providers[row].setSupplyLeft(providers[row].getSupplyLeft() - toTake);
			customers[column].setDemandLeft(customers[column].getDemandLeft() - toTake);
			routes[row][column].setAmountOfGoods(routes[row][column].getAmountOfGoods() + toTake);
//			System.out.println(row+" "+column+": "+routes[row][column].getAmountOfGoods()+"\t"+providers[row].getSupplyLeft()+"\t"+customers[column].getDemandLeft());
			
		}
	}

	public void optimize() {
		double alfas[] = new double[routes.length];
		double betas[] = new double[routes[0].length];
		
		alfas[0] = 0;	//Ustawiamy wartosc pierwszej alfy na 0
		List<Double[]> matrixAsList = new ArrayList<>();
		int equations = 0;
		List<Double> profitsAsList = new ArrayList<>();
		for(int i = 0; i < routes.length; ++i) {
			for(int j = 0; j < routes[i].length; ++j) {
//				//System.out.println(i+" "+j+": "+routes[i][j].getAmountOfGoods()+"\t"+providers[i].getSupplyLeft()+"\t"+customers[j].getDemandLeft());
				if(routes[i][j].getAmountOfGoods() == 0)
					continue;
				//System.out.println(i+" "+j+": "+routes[i][j].getAmountOfGoods()+"\t"+routes[i][j].getProfit());
				++equations;
				profitsAsList.add(routes[i][j].getProfit());
//				Double tmp[] = new Double[alfas.length+betas.length-1];
//				if(i > 0) {
//					tmp[i-1] = 1.0;
//				}
//				tmp[alfas.length+j-1] = 1.0;
//				matrixAsList.add(tmp);
			}
		}
		

		int skip = alfas.length+betas.length - equations;
		for(int i = 0; i < routes.length; ++i) {
			for(int j = 0; j < routes[i].length; ++j) {
				if(routes[i][j].getAmountOfGoods() == 0)
					continue;
				Double tmp[] = new Double[alfas.length+betas.length-skip];
				if(i >= skip)
					tmp[i-skip] = 1.0;
				tmp[alfas.length+j-skip] = 1.0;
				matrixAsList.add(tmp);
			}
		}
		
		
		Double[] profitsAsArray = new Double[profitsAsList.size()];
		profitsAsList.toArray(profitsAsArray);
		Double[][] matrixAsArray = new Double[equations][equations];
		matrixAsList.toArray(matrixAsArray);
		
//		////System.out.println(routes.length);
//		////System.out.println(alfas.length);
//		////System.out.println(betas.length);
//		////System.out.println(customers.length);
//		////System.out.println(providers.length);
//		////System.out.println(matrixAsList.size());
//		////System.out.println(profitsAsList.size());
//		////System.out.println(profitsAsArray.length);
//		////System.out.println(matrixAsArray.length);
		
		//Zerowanie elementow null w tablicach
		for(int i = 0; i < matrixAsArray.length; ++i) {
			for(int j = 0; j < matrixAsArray[i].length; ++j) {
				if(matrixAsArray[i][j] == null)
					matrixAsArray[i][j] = 0.;
			}
			if(profitsAsArray[i] == null)
				profitsAsArray[i] = 0.;
		}
		
//		for(int i = 0; i < matrixAsArray.length; ++i) {
//			for(int j = 0; j < matrixAsArray[i].length; ++j) {
//				if(matrixAsArray[i][j] != null)
//					//System.out.print(matrixAsArray[i][j]);
////				//System.out.print("\t");
//			}
////			//System.out.println();
//		}
		
//		//System.out.println();
//		for(int i = 0; i < matrixAsArray.length; ++i) {
//			for(int j = 0; j < matrixAsArray[i].length; ++j) {
//				//System.out.print(matrixAsArray[i][j]+"\t");
//			}
//			//System.out.println();
//		}
		Double[][] invMatrix = Matrix.inverse(matrixAsArray);
		
		Double[] result = new Double[equations+skip];
		for(int i = 0; i < skip; ++i)
			result[i] = 0.;
		
		for(int row = 0; row < invMatrix.length; ++row) {
			double toAdd = 0;
			for(int column = 0; column < invMatrix[row].length; ++column) {
				toAdd += invMatrix[row][column]*profitsAsArray[column];
			}
			result[row+skip] = toAdd;
		}
		
		for(int i = 0; i < alfas.length; ++i) {
			alfas[i] = result[i];
		}
		
		for(int i = alfas.length; i < (alfas.length+betas.length); ++i) {
			betas[i-alfas.length] = result[i];
		}
		
		double max = 0;
		int row = -1;
		int column = -1;
		double[][] deltas = new double[routes.length][routes[0].length];
		
		for(int i = 0; i < routes.length; ++i) {
			for(int j = 0; j < routes[i].length; ++j) {
				if(routes[i][j].getAmountOfGoods() > 0) {
					continue;
				}
				deltas[i][j] = routes[i][j].getProfit() - alfas[i] - betas[j];
				if(deltas[i][j] > max) {
					max = deltas[i][j];
					row = i;
					column = j;
				}
			}
		}
		
		if(max <= 0) {
			return;
		}
		if(trials <= 0) {
			return;
		}
		--trials;
		
		for(int i = 0; i < deltas.length; ++i) {
			int row2,column2;
			int row3,column3;
			int row4,column4;
			
			if(i == row)
				continue;
			if(deltas[i][column] != 0)
				continue;
			row2 = i; column2 = column;
			for(int j = 0; j < deltas[i].length; ++j) {
				if(j == column)
					continue;
				if(deltas[i][j] != 0)
					continue;
				if(deltas[row][j] != 0)
					continue;
				row3 = i; column3 = j;
				row4 = row; column4 = j;
				
				double toChange;
				if(routes[row2][column2].getAmountOfGoods() < routes[row4][column4].getAmountOfGoods())
					toChange = routes[row2][column2].getAmountOfGoods();
				else
					toChange = routes[row4][column4].getAmountOfGoods();
				
				routes[row][column].setAmountOfGoods(
						routes[row][column].getAmountOfGoods()+toChange);
				routes[row3][column3].setAmountOfGoods(
						routes[row3][column3].getAmountOfGoods()+toChange);
				routes[row2][column2].setAmountOfGoods(
						routes[row2][column2].getAmountOfGoods()-toChange);
				routes[row4][column4].setAmountOfGoods(
						routes[row4][column4].getAmountOfGoods()-toChange);
				optimize();
				return;
			}
		}

		return;
		
	}

	public Customer[] getCustomers() {
		return customers;
	}

	public Provider[] getProviders() {
		return providers;
	}

	public Route[][] getRoutes() {
		return routes;
	}
	
}