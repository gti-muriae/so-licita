package com.gti.solicita.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
public class ControllerServerConfig extends ResourceServerConfigurerAdapter {
    @Autowired
    private JwtTokenStore jwtTokenStore;

    private static final String[] PUBLIC = {"/oauth/token", "/v1/usuario/registro", "/v1/admin/registro", "/v1/s3/**", "/v1/prefeitura"};
    private static final String[] USER_GET = {"/v1/licitacao/**"};
    private static final String[] USER = {"/v1/usuario/**"};
    private static final String[] ADMIN = {"/v1/usuario/**", "/v1/prefeitura/registro", "/v1/licitacao/**", "/v1/admin/**"};


    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenStore(jwtTokenStore);

    }

    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests().antMatchers(PUBLIC).permitAll().
                antMatchers(HttpMethod.GET, USER_GET).permitAll()
                .anyRequest()
                .authenticated();
    }
}
