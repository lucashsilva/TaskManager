package com.si1.lab03.api.tasks;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.si1.lab03.tasks.Task;

@RestController
public class TaskController {

private static Map<String, Task> tasks;
	
	@RequestMapping(
			value = "/api/tasks",
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Task>> getTasks() {
		Collection<Task> tasks = this.tasks.values();
		
		return new ResponseEntity<Collection<Task>>(tasks, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/api/tasks/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> getTask(@PathVariable("id") String id) {
		Task task = tasks.get(id);
		
		if (task != null) {
			return new ResponseEntity<Task>(task, HttpStatus.OK);
		} else {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		}
	}
	@RequestMapping(
			value = "api/tasks",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> addTask(@RequestBody Task task) {
		if (create(task)) {
			return new ResponseEntity<Task>(HttpStatus.CREATED);
		}
		
		return new ResponseEntity<Task>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@RequestMapping(
			value = "api/tasks",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> updateTask(@RequestBody Task task) {	
		if (update(task)) {
			return new ResponseEntity<Task>(HttpStatus.OK);
		} 
		
		return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(
			value = "/api/tasks/{id}", 
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> deleteTask(@PathVariable("id") String id) {
		if (tasks.remove(id) != null) {
			return new ResponseEntity<Task>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<Task>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	static {
		tasks = new HashMap<String, Task>();
		Task task = new Task("1", "Teste", "Teste", "1", "Urgent", true);
		
		create(task);
	}
	
	private static boolean update(Task task) {
		Task old = tasks.get(task.getId());
		
		if (old != null) {
			tasks.put(task.getId(), task);
			return true;
		}
		
		return false;
	}
	
	private static boolean create(Task task) {
		if (!tasks.containsKey(task.getId())) {
			tasks.put(task.getId(), task);
			return true;
		}
		
		return false;
	}
}
