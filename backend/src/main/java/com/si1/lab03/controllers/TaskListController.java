package com.si1.lab03.controllers;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
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
	public ResponseEntity<Collection<TaskList>> getTaskLists(@RequestHeader(value="Authorization") String token) {
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
	public ResponseEntity getTaskList(@PathVariable("id") Integer id, @RequestHeader(value="Authorization") String token, @RequestParam(value = "format", required = false) String format) throws FileNotFoundException {
		String email = tokenService.extractEmail(token);
		TaskList taskList;
		try {
			taskList = userService.getTaskList(id, email);
			
			if(format != null && format.equalsIgnoreCase("pdf")){
		        Document document = new Document();
		        ByteArrayOutputStream baos = new ByteArrayOutputStream();
		        try {
					 PdfWriter.getInstance(document, baos);
			         document.open();
			         Paragraph titulo = new Paragraph("Lista de Tarefas - Resumo");
			         titulo.setAlignment(1);
			         document.add(titulo);
			         document.add(new Paragraph(taskList.toString()));
			         // step 5
			         document.close();
			         
			         byte[] contents = baos.toByteArray();

			         HttpHeaders headers = new HttpHeaders();
			         headers.setContentType(MediaType.parseMediaType("application/pdf"));
			         String filename = "output.pdf";
			         headers.setContentDispositionFormData(filename, filename);
			         headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			         return new ResponseEntity<byte[]>(contents, headers, HttpStatus.OK);
			  } catch (DocumentException e) {
				 return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
			  }
			}
			
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
	public ResponseEntity<TaskList> addTaskList(@RequestBody TaskListRequest taskList, @RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		try {
			userService.addTaskList(email, taskList);
			return new ResponseEntity<TaskList>(HttpStatus.CREATED);
		} catch (TaskNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<TaskList>(HttpStatus.FORBIDDEN);
		}
	}
	
	@CrossOrigin
	@RequestMapping(
			value = "api/lists/{id}",
			method = RequestMethod.PUT,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TaskList> updateTask(@PathVariable("id") Integer id, @RequestBody TaskListRequest taskList, @RequestHeader(value="Authorization") String token) {	
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
			value = "api/lists/{listId}/{taskIds}",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TaskList> addTasksToList(@PathVariable("listId") Integer listId, @PathVariable("taskIds") Set<Integer> taskIds, @RequestHeader(value="Authorization") String token) {	
		String email = tokenService.extractEmail(token);

		try {
			userService.addTasksToList(email, taskIds, listId);
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
	public ResponseEntity<Task> deleteTaskList(@PathVariable("id") Integer id, @RequestHeader(value="Authorization") String token) {
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
	
	@CrossOrigin
	@RequestMapping(
			value = "api/lists/{listId}/{taskId}",
			method = RequestMethod.DELETE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> deleteTaskFromList(@PathVariable("listId") Integer listId, @PathVariable("taskId") Integer taskId,@RequestHeader(value="Authorization") String token) {
		String email = tokenService.extractEmail(token);
		try {
			userService.deleteTaskFromList(email, taskId, listId);
			return new ResponseEntity<Task>(HttpStatus.OK);
		} catch (TaskListNotFoundException | TaskNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Task>(HttpStatus.FORBIDDEN);
		}
	}
}
