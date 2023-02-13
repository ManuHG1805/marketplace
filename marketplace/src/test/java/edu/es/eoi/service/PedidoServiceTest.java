package edu.es.eoi.service;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.sql.Date;
import java.util.Calendar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.dto.PedidoDto;

@SpringBootTest
public class PedidoServiceTest {

	@Autowired
	private PedidoService pedidoService;
	
	@Test
	public void createAndFind() {		

		PedidoDto p=new PedidoDto();		
		p.setNombre("CF_PEDIDO");
		p.setFecha(new Date(Calendar.getInstance().getTimeInMillis()));	
			
		PedidoDto pedido=pedidoService.createPedido(p);
		
		PedidoDto tmp=pedidoService.findPedido(pedido.getId());
		
		assertNotNull(tmp);		
		assertEquals("CF_PEDIDO",tmp.getNombre());
		assertNotNull(tmp.getFecha());				
		assertEquals(1, pedidoService.findAllPedidosByNombre("CF_PEDIDO").size());
		assertEquals(1, pedidoService.findAllPedidosByNombre("CF_PEDID").size());
		assertEquals(0, pedidoService.findAllPedidosByNombre("EEEE").size());
		
	}
	
	@Test
	public void update() {		

		PedidoDto p=new PedidoDto();		
		p.setNombre("U_PEDIDO");
		p.setFecha(new Date(Calendar.getInstance().getTimeInMillis()));	
			
		PedidoDto pedido=pedidoService.createPedido(p);
				
		pedido.setNombre("U_PEDIDO_UPDATED");
		
		pedidoService.updatePedido(pedido);
		
		PedidoDto tmp=pedidoService.findPedido(pedido.getId());
		
		assertNotNull(tmp);		
		assertEquals("U_PEDIDO_UPDATED",tmp.getNombre());
		assertNotNull(tmp.getFecha());				
		
	}
	
	@Test
	public void delete() {		

		PedidoDto p=new PedidoDto();		
		p.setNombre("D_PEDIDO");
		p.setFecha(new Date(Calendar.getInstance().getTimeInMillis()));	
			
		PedidoDto pedido=pedidoService.createPedido(p);
	
		pedidoService.deletePedido(pedido.getId());
		
		PedidoDto tmp=pedidoService.findPedido(pedido.getId());
		
		assertNull(tmp);
	}


}
