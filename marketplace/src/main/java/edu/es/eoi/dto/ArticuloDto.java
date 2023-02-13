package edu.es.eoi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArticuloDto {

	private int id;	
	
	private String nombre;	
	
	private Double precio;	

	private Integer stock;

}
