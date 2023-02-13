package edu.es.eoi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.es.eoi.dto.PedidoDto;
import edu.es.eoi.entity.Pedido;
import edu.es.eoi.repository.PedidoRepository;

@Service
public class PedidoService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private PedidoRepository repository;

	public PedidoDto createPedido(PedidoDto pedido) {

		Pedido p = this.repository.save(mapper.map(pedido, Pedido.class));

		return mapper.map(p, PedidoDto.class);

	}

	public PedidoDto findPedido(int id) {
		try {
			return mapper.map(this.repository.findById(id).get(), PedidoDto.class);
		} catch (Exception e) {
			return null;
		}
	}

	public PedidoDto updatePedido(PedidoDto pedido) {

		Pedido p = this.repository.save(mapper.map(pedido, Pedido.class));

		return mapper.map(p, PedidoDto.class);
	}

	public void deletePedido(int id) {

		this.repository.deleteById(id);
	}

	public List<PedidoDto> findAllPedidosByNombre(String nombre) {

		return this.repository.findAllByNombreContaining(nombre).stream().map(u -> mapper.map(u, PedidoDto.class))
				.collect(Collectors.toList());
	}

}
