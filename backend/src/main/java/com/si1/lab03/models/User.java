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
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.si1.lab03.exceptions.TaskListNotFoundException;
import com.si1.lab03.exceptions.TaskNotFoundException;

@Entity(name="t_users")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String email;
	private String password;
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="owner_id")
    private List<Task> tasks;
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="owner_id")
    private List<TaskList> lists;
	
	public User() {
		this.tasks = new ArrayList<Task>();
		this.lists = new ArrayList<TaskList>();
	}
	
	public User(String email, String password) {
		this.email = email;
		this.password = password;
		this.tasks = new ArrayList<Task>();
		this.lists = new ArrayList<TaskList>();
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

	public List<TaskList> getLists() {
		return lists;
	}

	public void setLists(List<TaskList> lists) {
		this.lists = lists;
	}
	
	public void addTaskList(TaskList list) throws TaskNotFoundException {
		for(Integer id: list.getTasks()) {
			if (!this.containsTask(id)) {
				throw new TaskNotFoundException();
			}
		}
		
		this.lists.add(list);
	}

	public boolean containsTask(Integer id) {
		for(Task task: this.tasks){
			if(task.getId().equals(id)){
				return true;
			}
		}
		return false;
	}
	
	public TaskList getTaskList(Integer id){
		for(TaskList taskList: this.lists){
			if(taskList.getId().equals(id)){
				return taskList;
			}
		}
		return null;
	}

	public void updateTaskList(TaskList list) throws TaskListNotFoundException, TaskNotFoundException {
		TaskList taskList = this.getTaskList(list.getId());
		
		if(taskList != null) {
			this.removeTaskList(list);
			this.addTaskList(list);
			return;
		}
		
		throw new TaskListNotFoundException();
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
		throw new TaskListNotFoundException();
		
	}


}
