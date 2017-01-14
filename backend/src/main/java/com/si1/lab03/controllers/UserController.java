package com.si1.lab03.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.lab03.exceptions.UserAlreadyExistsException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.User;
import com.si1.lab03.services.TokenAuthenticationService;
import com.si1.lab03.services.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private TokenAuthenticationService tokenService;
	
	
	@RequestMapping(
			value = "api/users",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> addUser(@RequestBody User user) {
		try {
			userService.create(user);
		
			return new ResponseEntity<User>(HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
		
	}
	
	@RequestMapping(
			value = "api/users",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> updateUser(@RequestHeader(value="Authorization") String token, @RequestBody User user) {	
		try {
			String email = tokenService.extractEmail(token);
		
			userService.update(email, user);
			return new ResponseEntity<User>(HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.FORBIDDEN);
		}

	}
	
	@RequestMapping(
			value = "/api/users", 
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> deleteUser(@RequestHeader(value="Authorization") String token) {
		try {
			String email = tokenService.extractEmail(token);
			
			userService.delete(email);
			return new ResponseEntity<User>(HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.FORBIDDEN);
		}
		
	}
	
}
