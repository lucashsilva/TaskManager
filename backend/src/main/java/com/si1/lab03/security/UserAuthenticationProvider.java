package com.si1.lab03.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.si1.lab03.services.UserService;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {

	@Autowired
    private UserService userService;
    
    @Override
    public Authentication authenticate(Authentication authentication) 
      throws AuthenticationException {
   
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();
         
        if (userService.authenticate(email, password)) {
            // use the credentials and authenticate against the third-party system
            return new UsernamePasswordAuthenticationToken(email, password, new ArrayList<>());
        } else {
            return null;
        }
    }
 
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}