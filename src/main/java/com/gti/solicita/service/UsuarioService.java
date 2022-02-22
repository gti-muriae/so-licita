package com.gti.solicita.service;

import com.gti.solicita.dto.CategoriaDTO;
import com.gti.solicita.dto.RoleDTO;
import com.gti.solicita.dto.UsuarioRupDTO;
import com.gti.solicita.dto.insertDTO.UsuarioRupInsertDTO;
import com.gti.solicita.entities.Categoria;
import com.gti.solicita.entities.Role;
import com.gti.solicita.entities.UsuarioRup;
import com.gti.solicita.repositories.CategoriaRepository;
import com.gti.solicita.repositories.RoleRepository;
import com.gti.solicita.repositories.UsuarioRupRepository;
import com.gti.solicita.service.exceptions.ConstraintException;
import com.gti.solicita.service.exceptions.ResourceNotException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    private static Logger logger = LoggerFactory.getLogger(UsuarioService.class);
    private final UsuarioRupRepository usuarioRupRepository;
    private final CategoriaRepository categoriaRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRupRepository usuarioRupRepository, CategoriaRepository categoriaRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRupRepository = usuarioRupRepository;
        this.categoriaRepository = categoriaRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioRupDTO insertUsuario(UsuarioRupInsertDTO dto) {

        try {
            UsuarioRup usuarioRup = new UsuarioRup();
            copyToEntity(dto, usuarioRup);
            usuarioRup.setSenha(passwordEncoder.encode(dto.getSenha()));
            usuarioRup = usuarioRupRepository.save(usuarioRup);
            return new UsuarioRupDTO(usuarioRup);
        } catch (ConstraintViolationException e) {
            throw new ConstraintException("Integrity violation");
        }

    }

    @Transactional(readOnly = true)
    public UsuarioRupDTO findByUsuarioCnpj(Integer cnpj) {
        Optional<UsuarioRup> obj = usuarioRupRepository.findUsuarioRupByCodCNPJ(cnpj);
        UsuarioRup usuarioRup = obj.orElseThrow(() -> new ResourceNotException("Usuario não encontrado"));
        return new UsuarioRupDTO(usuarioRup, usuarioRup.getCategorias());
    }

    @Transactional(readOnly = true)
    public UsuarioRupDTO findByEmail(String email) {
        Optional<UsuarioRup> obj = usuarioRupRepository.findUsuarioRupByEmail(email);
        logger.info(email);
        UsuarioRup usuarioRup = obj.orElseThrow(() -> new ResourceNotException("E-mail não encontrado"));

        return new UsuarioRupDTO(usuarioRup, usuarioRup.getCategorias());
    }

    private void copyToEntity(UsuarioRupDTO dto, UsuarioRup usuario) {
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());
        usuario.setNomeCompleto(dto.getNomeCompleto());
        usuario.setCpf(dto.getCpf());
        usuario.setContato(dto.getContato());
        usuario.setComplemento(dto.getComplemento());
        usuario.setEndereco(dto.getEndereco());
        usuario.setBairro(dto.getBairro());
        usuario.setNumEndereco(dto.getNumEndereco());
        usuario.setCidade(dto.getCidade());
        usuario.setCodCep(dto.getCodCep());
        usuario.setUf(dto.getUf());
        usuario.setCodCNPJ(dto.getCodCNPJ());
        usuario.setRazSocial(dto.getRazSocial());
        usuario.setFcmToken(dto.getFcmToken());
        usuario.setDatAbertura(dto.getDatAbertura());

        usuario.getCategorias().clear();
        for (CategoriaDTO categoriaDTO : dto.getCategorias()) {
            Categoria categoria = categoriaRepository.getOne(categoriaDTO.getId());
            usuario.getCategorias().add(categoria);
        }
        usuario.getRoles().clear();
        for (RoleDTO roleDTO : dto.getRoles()) {
            Role role = roleRepository.getOne(roleDTO.getId());
            usuario.getRoles().add(role);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UsuarioRup> usuario = usuarioRupRepository.findUsuarioRupByEmail(username);

        if (!usuario.isPresent()) {
            logger.error("E-mail not found: " + username);
            throw new UsernameNotFoundException("E-mail não encontrado");
        }
        logger.info("E-mail found " + usuario.get().getEmail()
        );
        return usuario.get();
    }
}
