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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="tasks")
public class Task implements Serializable {
	
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
	@ManyToMany(mappedBy="tasks")
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
	
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	public Set<String> getTaskLists() {
		Set<String> lists = new HashSet<String>();
		
		for(TaskList list: this.taskLists) {
			lists.add(list.getTitle());
		}
		
		return lists;
	}
	
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = false)
	public void setTaskLists(Set<TaskList> taskLists) {
		this.taskLists = taskLists;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", title=" + title + ", description=" + description + ", timestamp=" + timestamp
				+ ", priority=" + priority + ", done=" + done + "]";
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
