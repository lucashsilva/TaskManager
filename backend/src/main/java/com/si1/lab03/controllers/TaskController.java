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

import com.si1.lab03.exceptions.InvalidTaskException;
import com.si1.lab03.exceptions.TaskNotFoundException;
import com.si1.lab03.models.Task;
import com.si1.lab03.services.TaskService;

@RestController
public class TaskController {

	@Autowired
	private TaskService taskService;

	@RequestMapping(
			value = "/api/tasks",
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Task>> getTasks() {
		return new ResponseEntity<Collection<Task>>(taskService.findAll(), HttpStatus.OK);
		
	}
	
	@RequestMapping(
			value = "/api/tasks/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> getTask(@PathVariable("id") Integer id) {
		Task task;
		try {
			task = taskService.findOne(id);
			return new ResponseEntity<Task>(task, HttpStatus.OK);
		} catch (TaskNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.BAD_REQUEST);
		}

	}
	@RequestMapping(
			value = "api/tasks",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> addTask(@RequestBody Task task) {
		taskService.create(task);
		System.out.println(task.getTitle());
		return new ResponseEntity<Task>(task, HttpStatus.CREATED);
	}
	
	@RequestMapping(
			value = "api/tasks/{id}",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> updateTask(@PathVariable("id") Integer id, @RequestBody Task task) {	
		try {
			taskService.update(id, task);
			return new ResponseEntity<Task>(task, HttpStatus.OK);
		} catch (TaskNotFoundException | InvalidTaskException e) {
			return new ResponseEntity<Task>(HttpStatus.BAD_REQUEST);
		}

	}
	
	@RequestMapping(
			value = "/api/tasks/{id}", 
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> deleteTask(@PathVariable("id") Integer id) {
		try {
			taskService.delete(id);
			return new ResponseEntity<Task>(HttpStatus.OK);
		} catch (TaskNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
}
