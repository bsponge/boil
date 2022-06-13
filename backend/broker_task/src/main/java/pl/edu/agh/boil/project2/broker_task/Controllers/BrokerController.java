package pl.edu.agh.boil.project2.broker_task.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.edu.agh.boil.project2.broker_task.BrokerMethod;

@RestController
@RequestMapping("/broker")
@CrossOrigin
public class BrokerController {

	/**
	 * 
	 * @param customers - tablica odbiorcow
	 * @param providers - tablica dostawcow
	 * @param routes - tablica tras
	 * Pierwszy wymiar to wiersz, czyli dostawca
	 * Drugi indeks to kolumna, czyli odbiorcy
	 * @return Zwraca najoptymalniejsza tablice tras
	 */
	@PostMapping("/calc")
	public BrokerMethod optimize(
			@RequestBody BrokerMethod method) {
//		if(routes.length != providers.length) {
//			throw new IllegalArgumentException("Liczba dostawcow nie zgadza sie z tablica tras - rozne wymiary");
//		}
//		if(routes[0].length != customers.length) {
//			throw new IllegalArgumentException("Liczba odbiorcow nie zgadza sie z tablica tras - rozne wymiary");
//		}
		BrokerMethod bm = new BrokerMethod(method.getCustomers(), method.getProviders(), method.getRoutes());
		bm.optimize();
		
		System.out.println("\nOptymalne rozwiazanie");
		double profit = 0;
		double costs = 0;
		double sell = 0;
		for(int i = 0; i < bm.getRoutes().length-1; ++i) {
			for(int j = 0; j < bm.getRoutes()[i].length-1; ++j) {
				profit += bm.getRoutes()[i][j].getAmountOfGoods() * bm.getRoutes()[i][j].getProfit();
			}
		}
		

		for(int i = 0; i < bm.getRoutes().length-1; ++i) {
			for(int j = 0; j < bm.getRoutes()[i].length-1; ++j) {
				costs += bm.getRoutes()[i][j].getAmountOfGoods() * bm.getRoutes()[i][j].getCostOfTransport();
			}
		}
//		for(int i = 0; i < bm.getProviders().length-1; ++i) {
//			costs += (bm.getProviders()[i].getSupply()) * bm.getProviders()[i].getCostOfPurchase();
//		}
		for(int i = 0; i < bm.getRoutes().length-1; ++i) {
			for(int j = 0; j < bm.getRoutes()[i].length-1; ++j) {
				costs += bm.getRoutes()[i][j].getAmountOfGoods() * bm.getProviders()[i].getCostOfPurchase();
			}
		}
		
		for(int i = 0; i < bm.getRoutes().length-1; ++i) {
			for(int j = 0; j < bm.getRoutes()[i].length-1; ++j) {
				sell += bm.getRoutes()[i][j].getAmountOfGoods() * bm.getCustomers()[j].getSellingPrice();
			}
		}
		
		
		System.out.println("Calkowite koszta:\t"+costs);
		System.out.println("Calkowity przychod:\t"+sell);
		System.out.println("Calkowity zysk:\t"+profit);
		
		System.out.println("\nTrasy:");
		System.out.print("   \t");
		for(int i = 0; i < bm.getCustomers().length; ++i) {
			System.out.print(bm.getCustomers()[i].getName()+"\t");
		}
		System.out.println(" ");
		for(int i = 0; i < bm.getRoutes().length; ++i) {
			System.out.print(bm.getProviders()[i].getName()+"\t");
			for(int j = 0; j < bm.getRoutes()[i].length; ++j) {
				System.out.print(bm.getRoutes()[i][j].getAmountOfGoods()+"\t");
			}
			System.out.println(" ");
		}
		
		System.out.println("\nTabela zyskow:");
		System.out.print("   \t");
		for(int i = 0; i < bm.getCustomers().length; ++i) {
			System.out.print(bm.getCustomers()[i].getName()+"\t");
		}
		System.out.println(" ");
		for(int i = 0; i < bm.getRoutes().length; ++i) {
			System.out.print(bm.getProviders()[i].getName()+"\t");
			for(int j = 0; j < bm.getRoutes()[i].length; ++j) {
				System.out.print(bm.getRoutes()[i][j].getProfit()+"\t");
			}
			System.out.println(" ");
		}
		
		return bm;
	}
	
}
