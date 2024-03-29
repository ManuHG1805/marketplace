package edu.es.eoi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.es.eoi.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido,Integer>{
	
	public List<Pedido> findAllByNombreContaining(String nombre);


}
