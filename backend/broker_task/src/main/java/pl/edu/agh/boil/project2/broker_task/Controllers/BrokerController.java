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
		return bm;
	}
	
}
