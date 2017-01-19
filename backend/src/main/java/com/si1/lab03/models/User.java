package com.si1.lab03.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity(name="t_users")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String email;
	private String password;
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
    private List<Task> tasks;
	
	public User() {
		this.tasks = new ArrayList<Task>();

	}
	
	public User(String email, String password) {
		this.email = email;
		this.password = password;
		this.tasks = new ArrayList<Task>();
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
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
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void addTask(Task task) {
		this.tasks.add(task);
		
	}

	public void deleteTask(Integer id) {
		for (Task task: this.tasks) {
			if (task.getId().equals(id)) {
				this.tasks.remove(task);
				return;
			}
		}
		
	} 


}
