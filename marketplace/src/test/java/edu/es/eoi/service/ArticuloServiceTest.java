package edu.es.eoi.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.dto.ArticuloDto;

@SpringBootTest
class ArticuloServiceTest {

	@Autowired
	ArticuloService service;
		
	@Test
	public void createAndFind() {		

		ArticuloDto articulo= new ArticuloDto();
		articulo.setNombre("CF_TEST");
		articulo.setPrecio(10.0);
		articulo.setStock(2);				
		
		articulo=service.createArticulo(articulo);
		
		assertNotNull(service.findArticulo(articulo.getId()));
		assertEquals(1, service.findAllByNombre("CF_TEST").size());
		assertEquals(1, service.findAllByNombre("CF_TES").size());
		assertEquals(0, service.findAllByNombre("AAA").size());		
		
		assertNull(service.findArticulo(0));
		
	}	
	
	@Test
	public void update() {		

		ArticuloDto articulo= new ArticuloDto();
		articulo.setNombre("U_TEST");
		articulo.setPrecio(3.0);
		articulo.setStock(5);	
		
		this.service.createArticulo(articulo);
		
		List<ArticuloDto> articulos=service.findAllByNombre("U_TEST");
		
		ArticuloDto temp=articulos.get(0);
		
		temp.setNombre("U_TEST_UPDATED");
	
		service.updateArticulo(temp);		
	
		assertEquals("U_TEST_UPDATED", service.findAllByNombre("U_TEST_UPDATED").get(0).getNombre());
	
	}



}
