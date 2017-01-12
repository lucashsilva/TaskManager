package com.si1.lab03.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.si1.lab03.dao.TaskRepository;
import com.si1.lab03.exceptions.InvalidTaskException;
import com.si1.lab03.exceptions.TaskNotFoundException;
import com.si1.lab03.models.Task;

@Service
@Transactional
public class TaskService {
	private final TaskRepository taskRepository;
	
	public TaskService(TaskRepository taskRepository) {
		super();
		this.taskRepository = taskRepository;
	}
	
	public List<Task> findAll() {
		List<Task> tasks = new ArrayList<>();
		
		for(Task task : taskRepository.findAll()) {
			tasks.add(task);
		}
		
		return tasks;
	}

	public Task findOne(Integer id) throws TaskNotFoundException {
		Task task = taskRepository.findOne(id);
		
		if (task != null) {
			return task;
		} else { 
			throw new TaskNotFoundException();
		}
		
	}
	
	public void create(Task task) throws InvalidTaskException {
		if (!taskRepository.exists(task.getId())) {
			taskRepository.save(task);
		} else {
			throw new InvalidTaskException();
		}
	}
	
	public void update(Integer id, Task task) throws TaskNotFoundException, InvalidTaskException {
		if(!id.equals(task.getId())) {
			throw new InvalidTaskException();
		}else if (taskRepository.exists(id)) {
			taskRepository.save(task);
		} else {
			throw new TaskNotFoundException();
		}
	}
	
	public void delete(Integer id) throws TaskNotFoundException {
		if (taskRepository.exists(id)) {
			taskRepository.delete(id);
		} else {
			throw new TaskNotFoundException();
		}
	}
}
