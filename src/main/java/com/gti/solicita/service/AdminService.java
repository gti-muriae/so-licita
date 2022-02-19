package com.gti.solicita.service;

import com.gti.solicita.dto.AdminRupDTO;
import com.gti.solicita.dto.RoleDTO;
import com.gti.solicita.dto.insertDTO.AdminRupInsertDTO;
import com.gti.solicita.entities.AdminRup;
import com.gti.solicita.entities.Role;
import com.gti.solicita.repositories.AdminRupRepository;
import com.gti.solicita.repositories.RoleRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    private final AdminRupRepository adminRupRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AdminService(AdminRupRepository adminRupRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.adminRupRepository = adminRupRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AdminRupDTO insertAdmin(AdminRupInsertDTO dto) {
        AdminRup admin = new AdminRup();
        copyToEntity(dto, admin);
        admin.setSenha(passwordEncoder.encode(dto.getSenha()));
        admin = adminRupRepository.save(admin);
        return new AdminRupDTO(admin);

    }

    private void copyToEntity(AdminRupDTO dto, AdminRup admin) {
        admin.setEmail(dto.getEmail());
        admin.setSenha(dto.getSenha());
        admin.setNomeCompleto(dto.getNomeCompleto());
        admin.setContato(dto.getContato());

        admin.getRoles().clear();
        for (RoleDTO roleDTO : dto.getRoles()) {
            Role role = roleRepository.getOne(roleDTO.getId());
            admin.getRoles().add(role);
        }
    }
}
