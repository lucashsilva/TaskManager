package com.si1.lab03.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.si1.lab03.models.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	public User findByEmail(String email);
	public void deleteByEmail(String email);
}
