package com.bcgx.electricityboardservices.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Connections {
	
	@Id
	private Integer id;
	private String applicantName;
	private String gender;
	private String district;
	private String state;
	private Integer pincode;
	private String ownership;
	private String govtIdType;
	private Long idNumber;
	private String category;
	private Integer loadApplied;
	private Date DateOfApplication;
	private Date DateOfApproval;
	private Date modifiedDate;
	private String status;
	private Integer reviewerId;
	private String reviewerName;
	private String reviewerComments;
	
	public Connections() {
		
	}
	
	
	public Connections(Integer id, String applicantName, String gender, String district, String state, Integer pincode,
			String ownership, String govtIdType, Long idNumber, String category, Integer loadApplied,
			Date dateOfApplication, Date dateOfApproval, Date modifiedDate, String status, Integer reviewerId,
			String reviewerName, String reviewerComments) {
		super();
		this.id = id;
		this.applicantName = applicantName;
		this.gender = gender;
		this.district = district;
		this.state = state;
		this.pincode = pincode;
		this.ownership = ownership;
		this.govtIdType = govtIdType;
		this.idNumber = idNumber;
		this.category = category;
		this.loadApplied = loadApplied;
		DateOfApplication = dateOfApplication;
		DateOfApproval = dateOfApproval;
		this.modifiedDate = modifiedDate;
		this.status = status;
		this.reviewerId = reviewerId;
		this.reviewerName = reviewerName;
		this.reviewerComments = reviewerComments;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getApplicantName() {
		return applicantName;
	}

	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getPincode() {
		return pincode;
	}

	public void setPincode(Integer pincode) {
		this.pincode = pincode;
	}

	public String getOwnership() {
		return ownership;
	}

	public void setOwnership(String ownership) {
		this.ownership = ownership;
	}

	public String getGovtIdType() {
		return govtIdType;
	}

	public void setGovtIdType(String govtIdType) {
		this.govtIdType = govtIdType;
	}

	public Long getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(Long idNumber) {
		this.idNumber = idNumber;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getLoadApplied() {
		return loadApplied;
	}

	public void setLoadApplied(Integer loadApplied) {
		this.loadApplied = loadApplied;
	}

	public Date getDateOfApplication() {
		return DateOfApplication;
	}

	public void setDateOfApplication(Date dateOfApplication) {
		DateOfApplication = dateOfApplication;
	}

	public Date getDateOfApproval() {
		return DateOfApproval;
	}

	public void setDateOfApproval(Date dateOfApproval) {
		DateOfApproval = dateOfApproval;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(Integer reviewerId) {
		this.reviewerId = reviewerId;
	}

	public String getReviewerName() {
		return reviewerName;
	}

	public void setReviewerName(String reviewerName) {
		this.reviewerName = reviewerName;
	}

	public String getReviewerComments() {
		return reviewerComments;
	}

	public void setReviewerComments(String reviewerComments) {
		this.reviewerComments = reviewerComments;
	}
	
	
	
	
	

}
