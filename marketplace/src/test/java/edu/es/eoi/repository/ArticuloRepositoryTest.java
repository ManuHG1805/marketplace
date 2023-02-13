package edu.es.eoi.repository;


import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.entity.Articulo;

@SpringBootTest
class ArticuloRepositoryTest {

	@Autowired
	ArticuloRepository repository;
	
	@Test
	public void create() {	
		
		Articulo articulo=new Articulo();
		articulo.setNombre("TEST");
		articulo.setPrecio(100.0);
		articulo.setStock(2);
		
		repository.save(articulo);
		
		Articulo tmp=repository.findById(articulo.getId()).get();
		
		assertEquals("TEST",tmp.getNombre());
		assertEquals(100,tmp.getPrecio().longValue());
		assertEquals(2,tmp.getStock().intValue());
					
		
	}
	


}
