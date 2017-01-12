package com.si1.lab03.dao;

import org.springframework.data.repository.CrudRepository;

import com.si1.lab03.models.User;

public interface UserRepository extends CrudRepository<User,Integer>{

}
