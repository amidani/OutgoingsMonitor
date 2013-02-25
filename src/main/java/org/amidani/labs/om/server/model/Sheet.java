package org.amidani.labs.om.server.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Sheet {
	
	@Id
	private String id;
	@JsonProperty
	private String name;
	@JsonProperty @Index
	private String userId;
	@Ignore
    List<Earning> earnings;	
	@Ignore
    List<Outgoing> Outgoings;
	
	public Sheet(){}
	
	public Sheet(String id, String name){
		this.id = id;
		this.name = name;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<Earning> getEarnings() {
		return earnings;
	}
	public void setEarnings(List<Earning> earnings) {
		this.earnings = earnings;
	}
	public List<Outgoing> getOutgoings() {
		return Outgoings;
	}
	public void setOutgoings(List<Outgoing> outgoings) {
		Outgoings = outgoings;
	}


}
