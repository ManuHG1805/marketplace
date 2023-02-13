package edu.es.eoi.controller;

import edu.es.eoi.dto.ArticuloDto;
import edu.es.eoi.service.ArticuloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ArticuloController {
	
	@Autowired
	ArticuloService service;
	
	@GetMapping("/get/articulo")
	public ResponseEntity<List<ArticuloDto>> getArticulo(@RequestBody String nombre){

		return new ResponseEntity<List<ArticuloDto>> (service.findAllByNombre(nombre),HttpStatus.OK);
		
	}
	
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/articulo")
	public ResponseEntity<ArticuloDto> createArticulo(@RequestBody ArticuloDto articulo){
		
		try {			
			if(articulo==null||articulo.getNombre()==null) {
				return new ResponseEntity(articulo,HttpStatus.BAD_REQUEST);
			}

			articulo=service.createArticulo(articulo);
							
		} catch (Exception e) {			
			new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);	
		}		
		
		return new ResponseEntity(articulo,HttpStatus.CREATED);
	}
	
}
