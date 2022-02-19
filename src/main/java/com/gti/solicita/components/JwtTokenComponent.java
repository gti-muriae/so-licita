package com.gti.solicita.components;

import com.gti.solicita.entities.UsuarioRup;
import com.gti.solicita.repositories.UsuarioRupRepository;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class JwtTokenComponent implements TokenEnhancer {
    private final UsuarioRupRepository repository;
    public JwtTokenComponent(UsuarioRupRepository repository) {
        this.repository = repository;
    }

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {
        Optional<UsuarioRup> usuario = repository.findUsuarioRupByEmail(oAuth2Authentication.getName());
        Map<String, Object> json = new HashMap<>();
        json.put("id", usuario.get().getId());
        json.put("e-mail", usuario.get().getEmail());

        DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) oAuth2AccessToken;
        token.setAdditionalInformation(json);
        return oAuth2AccessToken;
    }
}
