package org.amidani.labs.om.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Outgoing {
	@Id
	private Long id;
	@JsonProperty
	private String label;
	@JsonProperty
	private int amount;
	@JsonProperty
	private String type;
	@JsonProperty
	private boolean spent; 
	@JsonProperty @Index
	private String sheetId;
	@JsonProperty @Index
	private String userId;
	
	public Outgoing(){}
	
	public Outgoing(Long id, String label, int amount, String type){
		this.id = id;
		this.label = label;
		this.amount = amount;
		this.type = type;
	}
	

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}


	public boolean isSpent() {
		return spent;
	}

	public void setSpent(boolean spent) {
		this.spent = spent;
	}

	public String getSheetId() {
		return sheetId;
	}


	public void setSheetId(String sheetId) {
		this.sheetId = sheetId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
}
