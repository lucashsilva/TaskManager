package com.si1.lab03.controllers;

import java.util.Collection;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.lab03.exceptions.TaskNotFoundException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.Task;
import com.si1.lab03.services.TokenAuthenticationService;
import com.si1.lab03.services.UserService;

@RestController
public class TaskController {

	@Autowired
	private UserService userService;
	@Autowired
	private TokenAuthenticationService tokenService;

	@CrossOrigin
	@RequestMapping(
			value = "/api/tasks",
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Task>> getTasks(@RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		Set<Task> tasks;
		try {
			tasks = userService.getTasks(email);
			return new ResponseEntity<Collection<Task>>(tasks, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Collection<Task>>(HttpStatus.FORBIDDEN);
		}
		
	}
	
	@CrossOrigin
	@RequestMapping(
			value = "/api/tasks/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> getTask(@PathVariable("id") Integer id, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		Task task;
		try {
			task = userService.getTask(id, email);
			return new ResponseEntity<Task>(task, HttpStatus.OK);
		} catch (TaskNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.FORBIDDEN);
		}
		

	}
	@CrossOrigin
	@RequestMapping(
			value = "api/tasks",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> addTask(@RequestBody Task task, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		try {
			userService.addTask(email, task);
			return new ResponseEntity<Task>(HttpStatus.CREATED);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.FORBIDDEN);
		}
	}
	
	@CrossOrigin
	@RequestMapping(
			value = "api/tasks/{id}",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> updateTask(@PathVariable("id") Integer id, @RequestBody Task task, @RequestHeader(value="Authorization") String token) {	
		String email = tokenService.extractEmail(token);
		task.setId(id);

		try {
			userService.updateTask(email, task);
			return new ResponseEntity<Task>(HttpStatus.OK);
		} catch (TaskNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.FORBIDDEN);
		}

	}
	
	@CrossOrigin
	@RequestMapping(
			value = "/api/tasks/{id}", 
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> deleteTask(@PathVariable("id") Integer id, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		try {
			userService.deleteTask(email, id);
			return new ResponseEntity<Task>(HttpStatus.OK);
		} catch (TaskNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.FORBIDDEN);
		}
	}

}
