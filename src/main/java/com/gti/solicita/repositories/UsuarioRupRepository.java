package com.gti.solicita.repositories;

import com.gti.solicita.entities.UsuarioRup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRupRepository extends JpaRepository<UsuarioRup, Long> {
    Optional<UsuarioRup> findUsuarioRupByCodCNPJ(Integer cnpj);

    Optional<UsuarioRup> findUsuarioRupByEmail(String email);

    @Query(value = "SELECT * FROM tb_usuario_rup AS UP INNER JOIN tb_categoria_usuario AS C  ON UP.id = C.id_usuario WHERE C.id_categoria = ?1 ", nativeQuery = true)
    List<UsuarioRup> listUserCategoria(Long id);
}
