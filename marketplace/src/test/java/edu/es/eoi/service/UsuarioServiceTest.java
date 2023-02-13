package edu.es.eoi.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.es.eoi.dto.UsuarioDto;

@SpringBootTest
class UsuarioServiceTest {

	@Autowired
	UsuarioService service;
		
	@Test
	public void createAndFind() {		

		UsuarioDto usuario= new UsuarioDto();
		usuario.setNombre("CF_TEST");
		usuario.setPassword("PW");		
		
		usuario=service.createUsuario(usuario);
		
		UsuarioDto tmp=service.findUsuario(usuario.getId());
		
		assertNotNull(tmp);
		assertEquals("CF_TEST", tmp.getNombre());
		assertEquals("PW", tmp.getPassword());		
		assertNull(service.findUsuario(0));
		
	}	
	
	@Test
	public void compruebaUsuario() {		

		UsuarioDto usuario= new UsuarioDto();
		usuario.setNombre("CU_TEST");
		usuario.setPassword("PW");		
		
		usuario=service.createUsuario(usuario);
	
		assertTrue(service.compruebaUsuario(usuario));
		assertFalse(service.compruebaUsuario(new UsuarioDto()));
	
		
	}	
	
	@Test
	public void findAll() {		
		
		UsuarioDto usuario= new UsuarioDto();
		usuario.setNombre("PEPE");
		usuario.setPassword("PW");		
		
		usuario=service.createUsuario(usuario);
		
		assertNotNull(service.findAllUsuarios());
		
	}	
	
	@Test
	public void update() {		

		UsuarioDto usuario= new UsuarioDto();
		usuario.setNombre("U_TEST");
		usuario.setPassword("PW2");		
		
		usuario=this.service.createUsuario(usuario);
		
		UsuarioDto tmp=service.findUsuario(usuario.getId());
		
		tmp.setNombre("UPDATED");
	
		service.updateUsuario(tmp);		
	
		assertEquals("UPDATED", service.findUsuario(usuario.getId()).getNombre());
	
	}



}
