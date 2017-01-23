package com.si1.lab03.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.si1.lab03.dao.TaskRepository;
import com.si1.lab03.dao.UserRepository;
import com.si1.lab03.exceptions.TaskNotFoundException;
import com.si1.lab03.exceptions.UserAlreadyExistsException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.Task;
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

	public List<Task> getTasks(String email) throws UserNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user != null) {
			return (List<Task>) user.getTasks();
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
}
