package com.si1.lab03.api.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.si1.lab03.api.task.Task;
import com.si1.lab03.api.token.Token;

public class User {
	private long id;
	private String email;
	private String password;
	private List<Task> tasks;
	private Set<Token> tokens;
	private static long nextId = 0;
	
	public User() {
		this.tasks = new ArrayList<Task>();
		this.tokens = new HashSet<Token>();
	}
	
	public User(String email, String password) {
		this.id = nextId++;
		this.email = email;
		this.password = password;
		this.tasks = new ArrayList<Task>();
		this.tokens = new HashSet<Token>();
	}
	
	public boolean addToken(Token token) {
		return this.tokens.add(token);
	}
	
	public boolean hasToken(Token token) {
		return this.tokens.contains(token);
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Collection<Task> getTasks() {
		return tasks;
	}
	
	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	
	public boolean authenticate(String password) {
		return this.password.equals(password);
	}

	public void addTask(Task task) {
		this.tasks.add(task);
		
	}

}
