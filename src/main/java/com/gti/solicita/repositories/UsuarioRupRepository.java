package com.gti.solicita.repositories;

import com.gti.solicita.entities.UsuarioRup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRupRepository extends JpaRepository<UsuarioRup, Long> {
    Optional<UsuarioRup> findUsuarioRupByCodCNPJ(Integer cnpj);

    Optional<UsuarioRup> findUsuarioRupByEmail(String email);
}
