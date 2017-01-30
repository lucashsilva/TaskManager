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

import com.si1.lab03.exceptions.TaskListNotFoundException;
import com.si1.lab03.exceptions.TaskNotFoundException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.Task;
import com.si1.lab03.models.TaskList;
import com.si1.lab03.models.TaskListRequest;
import com.si1.lab03.services.TokenAuthenticationService;
import com.si1.lab03.services.UserService;

@RestController
public class TaskListController {

	@Autowired
	private UserService userService;
	@Autowired
	private TokenAuthenticationService tokenService;

	@CrossOrigin
	@RequestMapping(
			value = "/api/lists",
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<TaskList>> getTasks(@RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		Set<TaskList> tasksLists;
		try {
			tasksLists = userService.getTasksLists(email);
			return new ResponseEntity<Collection<TaskList>>(tasksLists, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Collection<TaskList>>(HttpStatus.FORBIDDEN);
		}
		
	}
	
	@CrossOrigin
	@RequestMapping(
			value = "/api/lists/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TaskList> getTask(@PathVariable("id") Integer id, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		TaskList taskList;
		try {
			taskList = userService.getTaskList(id, email);
			return new ResponseEntity<TaskList>(taskList, HttpStatus.OK);
		} catch (TaskListNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.FORBIDDEN);
		}
		

	}
	
	@CrossOrigin
	@RequestMapping(
			value = "api/lists",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TaskList> addTask(@RequestBody TaskListRequest taskList, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		try {
			userService.addTaskList(email, taskList);
			return new ResponseEntity<TaskList>(HttpStatus.CREATED);
		} catch (UserNotFoundException | TaskNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.FORBIDDEN);
		}
	}
	
	@CrossOrigin
	@RequestMapping(
			value = "api/lists/{id}",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TaskList> updateTask(@PathVariable("id") Integer id, @RequestBody TaskList taskList, @RequestHeader(value="Authorization") String token) {	
		String email = tokenService.extractEmail(token);
		taskList.setId(id);

		try {
			userService.updateTaskList(email, taskList);
			return new ResponseEntity<TaskList>(HttpStatus.OK);
		} catch (TaskListNotFoundException | TaskNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.FORBIDDEN);
		}

	}
	
	@CrossOrigin
	@RequestMapping(
			value = "/api/lists/{id}", 
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> deleteTask(@PathVariable("id") Integer id, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		try {
			userService.deleteTaskList(email, id);
			return new ResponseEntity<Task>(HttpStatus.OK);
		} catch (TaskListNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.FORBIDDEN);
		}
	}
}
