package com.si1.lab03.api.auth;

import java.util.Collection;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.lab03.api.login.LoginRequest;
import com.si1.lab03.api.services.UserService;
import com.si1.lab03.api.token.Token;
import com.si1.lab03.api.user.User;

@RestController
public class AuthController {
	@RequestMapping(
			value = "api/auth",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Token> authenticate(@RequestBody LoginRequest loginRequest) {
		Token token = UserService.getInstance().authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		
		if (token != null){
			return new ResponseEntity<Token>(token, HttpStatus.OK);
		} else {
			return new ResponseEntity<Token>(token, HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(
			value = "api/users",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<User>> getUsers() {
		return new ResponseEntity<Collection<User>>(UserService.getInstance().getUsers(), HttpStatus.OK);
	}
	
	static {
		UserService.getInstance().mockSetUp();
	}
}
