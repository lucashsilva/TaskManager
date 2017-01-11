package com.si1.lab03.api.token;

import java.math.BigInteger;
import java.security.SecureRandom;

public class Token {
	private long id;
	private String token;
	private String email;
	private static SecureRandom random = new SecureRandom();
	
	public Token() {}
	
	public Token(long id, String email) {
		this.id = id;
		this.email = email;
		this.token = new BigInteger(130, random).toString(32);
	}

	public long getId() {
		return id;
	}

	public String getToken() {
		return token;
	}
	
	public String getEmail() {
		return email;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((token == null) ? 0 : token.hashCode());
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
		Token other = (Token) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id != other.id)
			return false;
		if (token == null) {
			if (other.token != null)
				return false;
		} else if (!token.equals(other.token))
			return false;
		return true;
	}


}
