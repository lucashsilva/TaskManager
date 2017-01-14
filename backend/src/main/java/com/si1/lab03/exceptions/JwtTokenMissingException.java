package com.si1.lab03.exceptions;

public class JwtTokenMissingException extends Exception {
	public JwtTokenMissingException() {}
	public JwtTokenMissingException(String message) {
		super(message);
	}
}
