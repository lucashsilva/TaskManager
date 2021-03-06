package com.si1.lab03.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.si1.lab03.exceptions.TaskNotFoundException;

@Entity
@Table(name="task_lists")
public class TaskList implements Serializable {

	private static final long serialVersionUID = 1L;
	@Column
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column
	@NotNull
	private String title;
	@ManyToMany
	@JoinTable(name="task_list", 
	      joinColumns=@JoinColumn(name="list_id"),
	      inverseJoinColumns=@JoinColumn(name="task_id"))  
	private Set<Task> tasks;
	
	public TaskList() {
		this.tasks = new HashSet<Task>();
	}
	
	public TaskList(Integer id, String title) {
		this.tasks = new HashSet<Task>();
		this.id = id;
		this.title = title;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<Task> getTasks() {
		return this.tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}
	
	public void addTask(Task task) {
		this.tasks.add(task);
	}
	
	public boolean removeTask(Task task) throws TaskNotFoundException {
		if(!this.tasks.remove(task)){
			throw new TaskNotFoundException();
		}
		
		return true;
	}
	
	public boolean containsTask(Integer id) {
		for (Task task: this.tasks) {
			if(task.getId().equals(id)) {
				return true;
			}
		}
		
		return false;
	}
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TaskList other = (TaskList) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public String toString() {
		String output = "Título da lista: " + getTitle() + System.lineSeparator();
		
		for(Task task: this.tasks) {
			output += "-----------------------------------------------------" + System.lineSeparator();
			output += task.toString() + System.lineSeparator();
		}
		
		return output;
	}

	
	

}
