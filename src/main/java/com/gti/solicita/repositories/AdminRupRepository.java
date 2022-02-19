package com.gti.solicita.repositories;

import com.gti.solicita.entities.AdminRup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRupRepository extends JpaRepository<AdminRup, Long> {
}
