package com.si1.lab03.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.si1.lab03.dao.UserRepository;
import com.si1.lab03.exceptions.InvalidUserException;
import com.si1.lab03.exceptions.UserNotFoundException;
import com.si1.lab03.models.Task;
import com.si1.lab03.models.User;

@Service
@Transactional
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
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

	public void create(User user) throws InvalidUserException {
		if (!exists(user.getEmail())) {
			userRepository.save(user);
		} else {
			throw new InvalidUserException();
		}
	}

	public boolean exists(String email) {
		return findUserByEmail(email) != null;
	}

	public User findUserByEmail(String email) {
		for (User user : userRepository.findAll()) {
			if (user.getEmail().equals(email)) {
				return user;
			}
		}
		
		return null;
	}

	public void update(Integer id, User user) throws UserNotFoundException, InvalidUserException {
		if (!id.equals(user.getId())) {
			throw new InvalidUserException();
		} else if (userRepository.exists(id)) {
			userRepository.save(user);
		} else {
			throw new UserNotFoundException();
		}
	}

	public void delete(Integer id) throws UserNotFoundException {
		if (userRepository.exists(id)) {
			userRepository.delete(id);
		} else {
			throw new UserNotFoundException();
		}
	}

	public void addTask(Task task) {

	}
}
