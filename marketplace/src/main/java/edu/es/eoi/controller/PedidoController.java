package edu.es.eoi.controller;


import edu.es.eoi.dto.PedidoDto;
import edu.es.eoi.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PedidoController {
	
	@Autowired
	PedidoService service;
	
	@GetMapping("/pedido")
	public ResponseEntity<List<PedidoDto>> getPedido(){

		String nombre = null;
		return new ResponseEntity<List<PedidoDto>> (service.findAllPedidosByNombre(nombre),HttpStatus.OK);
		
	}
	
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/pedido")
	public ResponseEntity<PedidoDto> createPedido(@RequestBody PedidoDto pedido){
		
		try {			
			if(pedido==null||pedido.getNombre()==null) {
				return new ResponseEntity(pedido,HttpStatus.BAD_REQUEST);
			}

			pedido=service.createPedido(pedido);
							
		} catch (Exception e) {			
			new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);	
		}		
		
		return new ResponseEntity(pedido,HttpStatus.CREATED);
	}
	
}
