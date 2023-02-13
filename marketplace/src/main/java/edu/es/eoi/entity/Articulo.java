package edu.es.eoi.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Articulo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false,length = 100)
	private String nombre;
	
	@Column(nullable = false)
	private Double precio;
	
	@Column(nullable = false)
	private Integer stock;
	
	@OneToMany(targetEntity = PedidoArticuloRelationship.class)
	List<PedidoArticuloRelationship> articulosPedido;

}
