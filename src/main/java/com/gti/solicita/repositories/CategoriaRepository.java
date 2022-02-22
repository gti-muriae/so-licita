package com.gti.solicita.repositories;

import com.gti.solicita.dto.UsuarioRupDTO;
import com.gti.solicita.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
