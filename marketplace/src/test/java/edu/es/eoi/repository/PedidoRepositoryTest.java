package edu.es.eoi.repository;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.sql.Date;
import java.util.Calendar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.entity.Pedido;

@SpringBootTest
class PedidoRepositoryTest {

	@Autowired
	PedidoRepository repository;
	
	@Test
	public void create() {		

		Pedido p=new Pedido();		
		p.setNombre("AAAA");
		p.setFecha(new Date(Calendar.getInstance().getTimeInMillis()));	
		p.setUsuario(null);
		
		Pedido pedido=repository.save(p);
		
		Pedido tmp=repository.findById(pedido.getId()).get();
		
		assertNotNull(tmp);		
		assertEquals("AAAA",tmp.getNombre());
		assertNotNull(tmp.getFecha());
		assertNull(p.getUsuario());
				
		
	}
	


}
