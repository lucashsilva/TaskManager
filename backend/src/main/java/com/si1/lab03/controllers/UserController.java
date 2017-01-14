package com.si1.lab03.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.lab03.exceptions.InvalidUserException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.User;
import com.si1.lab03.services.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	
	@RequestMapping(
			value = "api/users",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> addUser(@RequestBody User user) {
		try {
			userService.create(user);
		
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		} catch (InvalidUserException e) {
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping(
			value = "api/users",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> updateUser(@RequestBody User user) {	
		try {
			userService.update(user);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (UserNotFoundException | InvalidUserException e) {
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}

	}
	
	@RequestMapping(
			value = "/api/users/{id}", 
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id) {
		try {
			userService.delete(id);
			return new ResponseEntity<User>(HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
}
