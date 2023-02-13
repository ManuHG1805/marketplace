package edu.es.eoi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.es.eoi.dto.UsuarioDto;
import edu.es.eoi.entity.Usuario;
import edu.es.eoi.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private UsuarioRepository repository;

	public UsuarioDto findUsuario(Integer id) {

		try {
			return mapper.map(this.repository.findById(id).get(), UsuarioDto.class);
		} catch (Exception e) {
			return null;
		}

	}

	public UsuarioDto createUsuario(UsuarioDto usuario) {

		Usuario u = this.repository.save(mapper.map(usuario, Usuario.class));

		return mapper.map(u, UsuarioDto.class);
	}

	public boolean compruebaUsuario(UsuarioDto usuario) {

		Usuario user = this.repository.findByNombreAndPassword(usuario.getNombre(), usuario.getPassword());

		if (user == null) {
			return false;
		} else {
			return true;
		}
	}

	public UsuarioDto updateUsuario(UsuarioDto usuario) {

		Usuario u = this.repository.save(mapper.map(usuario, Usuario.class));

		return mapper.map(u, UsuarioDto.class);

	}

	public List<UsuarioDto> findAllUsuarios() {

		return this.repository.findAll().stream().map(u -> mapper.map(u, UsuarioDto.class))
				.collect(Collectors.toList());

	}

}
