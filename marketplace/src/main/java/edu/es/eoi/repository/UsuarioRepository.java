package edu.es.eoi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.es.eoi.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer>{

	public Usuario findByNombreAndPassword(String nombre, String password);
	
}
