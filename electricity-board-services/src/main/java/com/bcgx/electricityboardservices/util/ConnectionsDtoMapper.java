package com.bcgx.electricityboardservices.util;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.bcgx.electricityboardservices.dto.ConnectionsDto;
import com.bcgx.electricityboardservices.entity.Connections;
import java.text.ParseException;
import java.text.SimpleDateFormat;
@Component
public class ConnectionsDtoMapper {
	
	public List<ConnectionsDto> connectionsDtoMapper(List<Connections> entityList){
		List<ConnectionsDto> userDtoList = new ArrayList<>();
		
		for(Connections user : entityList) {
			ConnectionsDto dto = new ConnectionsDto();
			dto.setId(user.getId());
			dto.setApplicantName(user.getApplicantName());
			dto.setGender(user.getGender());
			dto.setDistrict(user.getDistrict());
			dto.setState(user.getState());
			dto.setPincode(user.getPincode());
			dto.setOwnership(user.getOwnership());
			dto.setGovtIdType(user.getGovtIdType());
			dto.setIdNumber(user.getIdNumber());
			dto.setCategory(user.getCategory());
			dto.setLoadApplied(user.getLoadApplied());
			dto.setDateOfApplication(user.getDateOfApplication());
			dto.setDateOfApproval(user.getDateOfApproval());
			dto.setModifiedDate(user.getModifiedDate());
			dto.setStatus(user.getStatus());
			dto.setReviewerId(user.getReviewerId());
			dto.setReviewerName(user.getReviewerName());
			dto.setReviewerComments(user.getReviewerComments());
			userDtoList.add(dto);
		}
		
		return userDtoList;
	}
	
	public ConnectionsDto connectionsDtoObjMapper(Connections user) {
		ConnectionsDto dto = new ConnectionsDto();
		dto.setId(user.getId());
		dto.setApplicantName(user.getApplicantName());
		dto.setGender(user.getGender());
		dto.setDistrict(user.getDistrict());
		dto.setState(user.getState());
		dto.setPincode(user.getPincode());
		dto.setOwnership(user.getOwnership());
		dto.setGovtIdType(user.getGovtIdType());
		dto.setIdNumber(user.getIdNumber());
		dto.setCategory(user.getCategory());
		dto.setLoadApplied(user.getLoadApplied());
		dto.setDateOfApplication(user.getDateOfApplication());
		dto.setDateOfApproval(user.getDateOfApproval());
		dto.setModifiedDate(user.getModifiedDate());
		dto.setStatus(user.getStatus());
		dto.setReviewerId(user.getReviewerId());
		dto.setReviewerName(user.getReviewerName());
		dto.setReviewerComments(user.getReviewerComments());
		return dto;
	}
	
	public Date convertStringToDate(String dateString) {
	    // Define the date format of the input string
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	    try {
	        // Parse the string to obtain a java.util.Date object
	        java.util.Date utilDate = dateFormat.parse(dateString);

	        // Convert to java.sql.Date
	        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

	        // Return the java.sql.Date
	        return sqlDate;
	    } catch (ParseException e) {
	        // Handle parsing exception if the string format is incorrect
	        System.err.println("Error parsing date: " + e.getMessage());
	        return null; // Or throw an exception, depending on your error handling strategy
	    }
	}
	
	public Connections connectionsDtoToEntityObjMapper(ConnectionsDto dto) {
		  Connections user = new Connections();
		  user.setId(dto.getId());
		  user.setApplicantName(dto.getApplicantName());
		  user.setGender(dto.getGender());
		  user.setDistrict(dto.getDistrict());
		  user.setState(dto.getState());
		  user.setPincode(dto.getPincode());
		  user.setOwnership(dto.getOwnership());
		  user.setGovtIdType(dto.getGovtIdType());
		  user.setIdNumber(dto.getIdNumber());
		  user.setCategory(dto.getCategory());
		  user.setLoadApplied(dto.getLoadApplied());
		  user.setDateOfApplication(dto.getDateOfApplication());
		  user.setDateOfApproval(dto.getDateOfApproval());
		  user.setModifiedDate(dto.getModifiedDate());
		  user.setStatus(dto.getStatus());
		  user.setReviewerId(dto.getReviewerId());
		  user.setReviewerName(dto.getReviewerName());
		  user.setReviewerComments(dto.getReviewerComments());
		  return user;
		}

}
