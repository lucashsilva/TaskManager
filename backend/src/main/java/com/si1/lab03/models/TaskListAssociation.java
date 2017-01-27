package com.si1.lab03.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="t_task_list")
public class TaskListAssociation {
	@Id
	@Column(name = "task_id", nullable = false)
	private Integer taskId;
	
	public Integer getTaskId() {
		return taskId;
	}
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	
}
