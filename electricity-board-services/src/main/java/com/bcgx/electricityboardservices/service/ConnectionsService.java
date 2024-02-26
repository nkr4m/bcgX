package com.bcgx.electricityboardservices.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.bcgx.electricityboardservices.dto.ConnectionStatus;
import com.bcgx.electricityboardservices.dto.ConnectionsDto;
import com.bcgx.electricityboardservices.entity.Connections;

public interface ConnectionsService {
	
	Page<Connections> fetchConnections(Optional<Integer> page, Optional<Integer> size);

	ConnectionsDto fetchConnectionsByAppId(Integer appId);
	
	Page<Connections> fetchWithDateRange(Date start, Date end, Optional<Integer> page, Optional<Integer> size);
	
	public void updateConnection(ConnectionsDto userDto) throws Exception;
	
	List<ConnectionStatus> findConnectionsByYear(Integer year) throws Exception;
	

}
