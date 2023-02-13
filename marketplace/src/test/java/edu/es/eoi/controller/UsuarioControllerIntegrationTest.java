package edu.es.eoi.controller;

import org.json.JSONException;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import edu.es.eoi.dto.UsuarioDto;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UsuarioControllerIntegrationTest {

	@LocalServerPort
	private int port;
	
	private static final String URI = "http://localhost:";
	private static final String CONTROLLERNAME = "/usuario";
	
	final HttpHeaders headers = new HttpHeaders();
	
	@Test
	public void create() throws JSONException {
		
		// Arrange	
		UsuarioDto dto= new UsuarioDto();
		dto.setNombre("USUARIO TEST");
		dto.setPassword("PW TEST");
		// Act		
		RestTemplate restTemplate= new RestTemplate();		
		
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		ResponseEntity<UsuarioDto> response = restTemplate.postForEntity(
				URI.concat(String.valueOf(port)).concat(CONTROLLERNAME),
						new HttpEntity<>(dto, headers),UsuarioDto.class);
		// Assert	
		Assert.assertEquals(HttpStatus.CREATED, response.getStatusCode());		
	
	}
	
}
