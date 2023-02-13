package edu.es.eoi.repository;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.entity.Usuario;

@SpringBootTest
class UsuarioRepositoryTest {

	@Autowired
	UsuarioRepository repository;
	
	@Test
	public void create() {		

		Usuario usuario= new Usuario();
		usuario.setNombre("TEST");
		usuario.setPassword("PW");
		
		usuario=repository.save(usuario);
		
		Usuario tmp=repository.findById(usuario.getId()).get();
		
		assertNotNull(tmp);				
		assertEquals("TEST",tmp.getNombre());
		assertEquals("PW",tmp.getPassword());
	
		
	}
	


}
