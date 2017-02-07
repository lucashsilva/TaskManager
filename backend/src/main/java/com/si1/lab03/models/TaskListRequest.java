package com.si1.lab03.models;

import java.util.HashSet;
import java.util.Set;

public class TaskListRequest {
	private Integer id;
	private String title;
	private Set<Task> tasks;
	
	public TaskListRequest() {
		this.tasks = new HashSet<Task>();
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Set<Task> getTasks() {
		return tasks;
	}
	
	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	

}
