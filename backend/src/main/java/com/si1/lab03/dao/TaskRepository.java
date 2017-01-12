package com.si1.lab03.dao;

import org.springframework.data.repository.CrudRepository;

import com.si1.lab03.models.Task;

public interface TaskRepository extends CrudRepository<Task,Integer>{

}
