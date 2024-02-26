package com.bcgx.electricityboardservices.dto;

public class ConnectionStatus {
	
	private Integer total;
	private Integer pending;
	private Integer approved;
	
	
	public ConnectionStatus() {
		// TODO Auto-generated constructor stub
	}


	public ConnectionStatus(Integer total, Integer pending, Integer approved) {
		super();
		this.total = total;
		this.pending = pending;
		this.approved = approved;
	}


	public Integer getTotal() {
		return total;
	}


	public void setTotal(Integer total) {
		this.total = total;
	}


	public Integer getPending() {
		return pending;
	}


	public void setPending(Integer pending) {
		this.pending = pending;
	}


	public Integer getApproved() {
		return approved;
	}


	public void setApproved(Integer approved) {
		this.approved = approved;
	}
	
	
	
}
