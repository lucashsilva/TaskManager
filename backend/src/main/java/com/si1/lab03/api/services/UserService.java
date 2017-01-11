package com.si1.lab03.api.services;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.si1.lab03.api.task.Task;
import com.si1.lab03.api.token.Token;
import com.si1.lab03.api.user.User;    

public class UserService {
	private long nextId;
	private Map<String, User> users;
	private Map<String, Token> tokens;
	
	private static UserService instance = new UserService();
	
	public UserService() {
		this.users = new HashMap<String, User>();
		this.tokens = new HashMap<String, Token>();
	}
	
	public static void mockSetUp() {
		User user = new User("lucas.henrique125@hotmail.com", "teste");
		Task task = new Task("0", "Teste", "Descrição", "1", "test", false);
		user.addTask(task);
		getInstance().users.put(user.getEmail(), user);
	}
	
	public static Collection<User> getUsers() {
		return getInstance().users.values();
	}
	
	public static UserService getInstance() {
		return instance;
	}
	
	public Token authenticate(String email, String password) {
		User user = users.get(email);
		
		if (user != null && user.authenticate(password)) {
			Token token = new Token(user.getId(), user.getEmail());
			user.addToken(token);
			tokens.put(token.getToken(), token);
			
			return token;
		}
		
		return null;
	}
	
	public boolean authorize(String email, Token token) {
		User user = this.users.get(email);
		
		return (user != null && user.hasToken(token));
	}

	public Collection<Task> getTasks(String _token) {
		Token token = this.tokens.get(_token);
		
		if (token != null && authorize(token.getEmail(), token)) {
			return users.get(token.getEmail()).getTasks();
		}
		
		return null;
	}

}
