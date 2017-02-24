package com.si1.lab03.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="subtasks")
public class Subtask implements Serializable {
	private static final long serialVersionUID = 1L;
	@Column
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	@NotNull
	private String description;
	@Column
	@NotNull
	private boolean done;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isDone() {
		return done;
	}
	public void setDone(boolean done) {
		this.done = done;
	}
	
	public String toString() {
		return this.getDescription() + " | Status: " + getStatus();
	}

	private String getStatus() {
		if(this.isDone()) {
			return "Terminada";
		} else {
			return "Pendente";
		}
	}
	
}
