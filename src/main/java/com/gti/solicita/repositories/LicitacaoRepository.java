package com.gti.solicita.repositories;

import com.gti.solicita.entities.Licitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicitacaoRepository extends JpaRepository<Licitacao, Long> {
}
