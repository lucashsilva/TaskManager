package com.si1.lab03.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.si1.lab03.dao.TaskRepository;
import com.si1.lab03.dao.UserRepository;
import com.si1.lab03.exceptions.TaskListNotFoundException;
import com.si1.lab03.exceptions.TaskNotFoundException;
import com.si1.lab03.exceptions.UserAlreadyExistsException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.Task;
import com.si1.lab03.models.TaskList;
import com.si1.lab03.models.TaskListRequest;
import com.si1.lab03.models.User;

@Service
@Transactional
public class UserService {
	private final UserRepository userRepository;
	private final TaskRepository taskRepository;

	public UserService(UserRepository userRepository, TaskRepository taskRepository) {
		super();
		this.userRepository = userRepository;
		this.taskRepository = taskRepository;
	}

	public List<User> findAll() {
		List<User> users = new ArrayList<>();

		for (User user : userRepository.findAll()) {
			users.add(user);
		}

		return users;
	}

	public User findOne(Integer id) throws UserNotFoundException {
		User user = userRepository.findOne(id);

		if (user != null) {
			return user;
		} else {
			throw new UserNotFoundException();
		}

	}

	public void create(User user) throws UserAlreadyExistsException {
		if (!exists(user.getEmail())) {
			userRepository.save(user);
		} else {
			throw new UserAlreadyExistsException();
		}
	}

	public boolean exists(String email) {
		return email != null && userRepository.findByEmail(email) != null;
	}

	public void update(String email, User user) throws UserNotFoundException {
		if (email != null) {
			User userUpdated = userRepository.findByEmail(email);
			
			if (userUpdated != null) {
				userUpdated.setEmail(user.getEmail());
				userUpdated.setPassword(user.getPassword());
				
				userRepository.save(userUpdated);
				return;
			}
		} 
		
		throw new UserNotFoundException();
	
	}

	public void delete(String email) throws UserNotFoundException {
		if (email != null && exists(email)) {
			userRepository.deleteByEmail(email);
		} else {
			throw new UserNotFoundException();
		}
	}

	public Set<Task> getTasks(String email) throws UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			return (Set<Task>) user.getTasks();
		} else {
			throw new UserNotFoundException();
		}
	}
	
	public boolean authenticate(String email, String password) {
		User user = userRepository.findByEmail(email);
		
		return (user != null && user.getPassword().equals(password));
	}

	public Task getTask(Integer id, String email) throws TaskNotFoundException, UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			for (Task task: user.getTasks()) {
				if (task.getId().equals(id)) {
					return task;
				}
			}
			
			throw new TaskNotFoundException();
		} else {
			throw new UserNotFoundException();
		}
	
	}

	public void addTask(String email, Task task) throws UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			user.addTask(task);
	
			userRepository.save(user);
		} else {
			throw new UserNotFoundException();
		}
	}

	public void updateTask(String email, Task taskToBeUpdated) throws UserNotFoundException, TaskNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			for (Task task: user.getTasks()) {
				if (task.getId().equals(taskToBeUpdated.getId())) {;
					taskRepository.save(taskToBeUpdated);
					
					return;
				}
			}
			throw new TaskNotFoundException();
		} else {
			throw new UserNotFoundException();
		}
		
	}

	public void deleteTask(String email, Integer id) throws TaskNotFoundException, UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			for (Task task: user.getTasks()) {
				if (task.getId().equals(id)) {
					user.deleteTask(id);
				
					userRepository.save(user);
					
					return;
				}
			}
			
			throw new TaskNotFoundException();
		} else {
			throw new UserNotFoundException();
		}
		
	}

	public Set<TaskList> getTasksLists(String email) throws UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			return (Set<TaskList>) user.getLists();
		} else {
			throw new UserNotFoundException();
		}
	}

	public TaskList getTaskList(Integer id, String email) throws TaskListNotFoundException, UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			for (TaskList taskList: user.getLists()) {
				if (taskList.getId().equals(id)) {
					return taskList;
				}
			}
			
			throw new TaskListNotFoundException();
		} else {
			throw new UserNotFoundException();
		}
	}

	public void addTaskList(String email, TaskListRequest taskList) throws UserNotFoundException, TaskNotFoundException{
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			TaskList list = new TaskList();
			list.setTitle(taskList.getTitle());
			
			for(Integer id: taskList.getTasks()) {
				list.addTask(getTask(id, email));
			}
			
			user.addTaskList(list);
	
			userRepository.saveAndFlush(user);
		} else {
			throw new UserNotFoundException();
		}
		
	}

	public void updateTaskList(String email, TaskListRequest taskListRequest) throws TaskListNotFoundException, TaskNotFoundException, UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			getTaskList(taskListRequest.getId(), email).setTitle(taskListRequest.getTitle());;
		
			userRepository.save(user);
		
		} else {
			throw new UserNotFoundException();
		}
		
		
	}


	public void deleteTaskList(String email, Integer id) throws UserNotFoundException, TaskListNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			user.removeTaskList(id);
		
			userRepository.saveAndFlush(user);
		
		} else {
			throw new UserNotFoundException();
		}
		

	}

	public void addTaskToList(String email, Integer taskId, Integer listId) throws UserNotFoundException, TaskNotFoundException, TaskListNotFoundException {
		User user = userRepository.findByEmail(email);
		
		Task task = this.getTask(taskId, email);
		TaskList taskList = user.getTaskList(listId);
		taskList.addTask(task);
		
		userRepository.saveAndFlush(user);
	}

	public void deleteTaskFromList(String email, Integer taskId, Integer listId) throws TaskNotFoundException, UserNotFoundException, TaskListNotFoundException {
		User user = userRepository.findByEmail(email);
		
		Task task = this.getTask(taskId, email);
		TaskList taskList = user.getTaskList(listId);
		taskList.removeTask(task);
		
		userRepository.saveAndFlush(user);
		
	}



}
