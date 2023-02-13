package edu.es.eoi.entity;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(nullable = false)
	private Date fecha;

	@Column(length = 100, nullable = false)
	private String nombre;

	@ManyToOne(targetEntity = Usuario.class, fetch = FetchType.LAZY)
	private Usuario usuario;
	
	@OneToMany(targetEntity = PedidoArticuloRelationship.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	List<PedidoArticuloRelationship> articulosPedido;

}
