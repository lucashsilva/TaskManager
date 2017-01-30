package com.si1.lab03.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.si1.lab03.models.Task;

public interface TaskRepository extends JpaRepository<Task,Integer>{

}
