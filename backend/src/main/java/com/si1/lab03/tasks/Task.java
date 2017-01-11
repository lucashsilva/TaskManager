package com.si1.lab03.tasks;

public class Task {
	private String id;
	private String title;
	private String description;
	private String timestamp;
	private String priority;
	private boolean done;
	
	public Task() {} 
	
	public Task(String id, String title, String description, String timestamp, String priority, boolean done) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.timestamp = timestamp;
		this.priority = priority;
		this.done = done;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}
	

	
}
