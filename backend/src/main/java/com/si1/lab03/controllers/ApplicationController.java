package com.si1.lab03.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ApplicationController {//Serves main index.html
 
	@RequestMapping({ "/login", "/tasks", "/lists", "/contact", "/dashboard"})
	public String index() {
	    return "forward:/index.html";
	}
       
         
}
