package com.si1.lab03.models;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.si1.lab03.exceptions.TaskListNotFoundException;
import com.si1.lab03.exceptions.TaskNotFoundException;

@Entity
@Table(name="users")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Column
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	@NotNull
	private String email;
	@Column
	@NotNull
	private String password;
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="owner_id")
    private Set<Task> tasks;
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="owner_id")
    private Set<TaskList> lists;
	
	public User() {
		this.tasks = new HashSet<Task>();
		this.lists = new HashSet<TaskList>();
		
	}
	
	public User(String email, String password) {
		this.email = email;
		this.password = password;
		this.tasks = new HashSet<Task>();
		this.lists = new HashSet<TaskList>();
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
	
	public void setTasks(Set<Task> tasks) {
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

	public Set<TaskList> getLists() {
		return lists;
	}

	public void setLists(Set<TaskList> lists) {
		this.lists = lists;
	}
	

	public boolean containsTask(Integer id) {
		return getTask(id) != null;
	}
	
	public Task getTask(Integer id) {
		Task returnTask = null;
		
		for(Task task: this.tasks){
			if(task.getId().equals(id)){
				returnTask = task;
			}
		}
		return returnTask;
	}
	
	public TaskList getTaskList(Integer id) throws TaskListNotFoundException{
		for(TaskList taskList: this.lists){
			if(taskList.getId().equals(id)){
				return taskList;
			}
		}
		
		throw new TaskListNotFoundException();
	}

	public void updateTaskList(TaskList list) throws TaskListNotFoundException, TaskNotFoundException {
		TaskList taskList = this.getTaskList(list.getId());
		
		if(taskList != null) {
//			taskList.merge(list);
			
			return;
		}
		
	}

	
	public void removeTaskList(TaskList list) {
		this.lists.remove(list);
	}

	
	public void removeTaskList(Integer id) throws TaskListNotFoundException {
		TaskList taskList = this.getTaskList(id);
		
		if(taskList != null){
			this.lists.remove(taskList);
			return;
		}
		
		
	}

	public void addTaskList(TaskList list) {
		this.lists.add(list);
		
	}


}
