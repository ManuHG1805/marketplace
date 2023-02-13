package edu.es.eoi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.es.eoi.dto.UsuarioDto;
import edu.es.eoi.service.UsuarioService;

@RestController
public class UsuarioController {
	
	@Autowired
	UsuarioService service;
	
	@GetMapping("/usuario")
	public ResponseEntity<List<UsuarioDto>> getUsuarios(){
		
		return new ResponseEntity<List<UsuarioDto>> (service.findAllUsuarios(),HttpStatus.OK);
		
	}
	
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/usuario")
	public ResponseEntity<UsuarioDto> createUsuario(@RequestBody UsuarioDto usuario){
		
		try {			
			if(usuario==null||usuario.getNombre()==null||usuario.getPassword()==null) {
				return new ResponseEntity(usuario,HttpStatus.BAD_REQUEST);
			}
				
			usuario=service.createUsuario(usuario);	
							
		} catch (Exception e) {			
			new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);	
		}		
		
		return new ResponseEntity(usuario,HttpStatus.CREATED);
	}
	
}
