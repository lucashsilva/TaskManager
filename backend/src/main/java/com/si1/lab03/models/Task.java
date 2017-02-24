package com.si1.lab03.models;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tasks")
public class Task implements Serializable {
	
	private static final String LINE_SEPARATOR = System.lineSeparator();
	private static final long serialVersionUID = 1L;
	@Column
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	@NotNull
	private String title;
	@Column
	private String description;
	@Column
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	@Column
	@NotNull
	@Enumerated(EnumType.STRING)
	private Priority priority;
	@Column
	@NotNull
	private boolean done;
	@Column
	private String category;
	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="parent_id")
	private Set<Subtask> subtasks;
	@ManyToMany(mappedBy="tasks", cascade = CascadeType.ALL)
	private Set<TaskList> taskLists;

	public Task() {} 
	
	public Task(String title, String description, Date timestamp, Priority priority, boolean done) {
		this.title = title;
		this.description = description;
		this.timestamp = timestamp;
		this.priority = priority;
		this.done = done;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}
	
	public Set<Subtask> getSubtasks() {
		return subtasks;
	}

	public void setSubtasks(Set<Subtask> subtasks) {
		this.subtasks = subtasks;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
	public Set<TaskListInfo> getTaskLists() {
		Set<TaskListInfo> taskLists = new HashSet<TaskListInfo>();
		
		for(TaskList list: this.taskLists) {
			taskLists.add(new TaskListInfo(list.getId(), list.getTitle()));
		}
		
		return taskLists;
	}
	
	public void setTaskLists(Set<TaskList> taskLists) {
		this.taskLists = taskLists;
	}

	@Override
	public String toString() {
		String output = "Título: " + getTitle() + LINE_SEPARATOR;
		if(getDescription() != null) {
			output += "Descrição: " + getDescription() + LINE_SEPARATOR;
		}
		
		output += "Prioridade: " + getPriority(getPriority()) + LINE_SEPARATOR 
				+ "Data: " + getTimestamp().toString() + LINE_SEPARATOR
				+ "Status: " + getStatus();
		
		if(this.getSubtasks().size() > 0) {
			output += LINE_SEPARATOR + "Subtarefas:";
			
			for(Subtask subtask: this.getSubtasks()) {
				output += LINE_SEPARATOR + "- " + subtask;
			}
		}
		
		return output;
	}
	
	private String getPriority(Priority priority) {
		if(priority == Priority.HIGH) {
			return "Alta";
		} else if (priority == Priority.NORMAL) {
			return "Média";
		} else {
			return "Baixa";
		}
	}

	private String getStatus() {
		if(this.isDone()) {
			return "Terminada";
		} else {
			return "Pendente";
		}
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
		Task other = (Task) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	

	
}
