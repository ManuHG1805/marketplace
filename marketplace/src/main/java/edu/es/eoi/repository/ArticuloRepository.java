package edu.es.eoi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.es.eoi.entity.Articulo;

public interface ArticuloRepository extends JpaRepository<Articulo,Integer>{
	
	public List<Articulo> findAllByNombreContaining(String nombre);

}
