package edu.es.eoi.repository;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.entity.Articulo;
import edu.es.eoi.entity.Pedido;
import edu.es.eoi.entity.PedidoArticuloRelationship;
import edu.es.eoi.entity.Usuario;

@SpringBootTest
public class PedidoRepositoryIntegrationTest {

	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private ArticuloRepository articuloRepository;
	
	@Autowired 
	private UsuarioRepository usuarioRepository;
	
	@Test
	public void createPedidoIT() {	
		
		Articulo a1=new Articulo();
		a1.setNombre("PC");
		a1.setPrecio(100.0);
		a1.setStock(2);
		a1.setArticulosPedido(null);
		
		Articulo a2=new Articulo();
		a2.setNombre("TV");
		a2.setPrecio(400.0);
		a2.setStock(5);
		a2.setArticulosPedido(null);
			
	
		a1=articuloRepository.save(a1);
		a2=articuloRepository.save(a2);
		
		Usuario u1= new Usuario();
		u1.setNombre("JJ");
		u1.setPassword("PW");
		u1.setPedidos(null);
		
		usuarioRepository.save(u1);
		
		Pedido p=new Pedido();
		p.setNombre("AAAA");
		p.setFecha(new Date(Calendar.getInstance().getTimeInMillis()));
	
		p.setUsuario(u1);
		
		List<PedidoArticuloRelationship> articulos= new ArrayList<PedidoArticuloRelationship>();
		
		PedidoArticuloRelationship relation1=new PedidoArticuloRelationship();		
		relation1.setArticulo(a1);
		relation1.setPedido(p);
		relation1.setCantidad(2);		
		articulos.add(relation1);
		
		PedidoArticuloRelationship relation2=new PedidoArticuloRelationship();		
		relation2.setArticulo(a2);
		relation2.setPedido(p);
		relation2.setCantidad(3);		
		articulos.add(relation2);	
				
		p.setArticulosPedido(articulos);
		
		p=pedidoRepository.save(p);
		
		assertNotNull(pedidoRepository.findById(p.getId()));
		
		Pedido result=pedidoRepository.findById(p.getId()).get();
		
		assertEquals(2,result.getArticulosPedido().size());
		
	}
}
