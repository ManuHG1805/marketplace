package edu.es.eoi.dto;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PedidoDto {
	
	private int id;

	private String nombre;
	
	private Date fecha;

	private List<ArticuloPedidoDto> articulos;
	
	

}
