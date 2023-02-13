package edu.es.eoi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.es.eoi.dto.ArticuloDto;
import edu.es.eoi.entity.Articulo;
import edu.es.eoi.repository.ArticuloRepository;

@Service
public class ArticuloService {

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ArticuloRepository repository;
	
	public ArticuloDto findArticulo(Integer id) {	
		try {
			return	mapper.map(this.repository.findById(id).get(),ArticuloDto.class);	
		} catch (Exception e) {
			return null;
		}	
	}	
	
	public ArticuloDto createArticulo(ArticuloDto articulo) {

		Articulo a=this.repository.save(mapper.map(articulo, Articulo.class));		
		articulo.setId(a.getId());
		
		return articulo;
	}	

	public ArticuloDto updateArticulo(ArticuloDto articulo) {
		
		Articulo a=this.repository.save(mapper.map(articulo, Articulo.class));	
		 
		 return mapper.map(a, ArticuloDto.class);

	}

	public List<ArticuloDto> findAllByNombre(String nombre) {
		
		return this.repository.findAllByNombreContaining(nombre).stream().map(u-> mapper.map(u, ArticuloDto.class)).collect(Collectors.toList());
		
	}	

}
