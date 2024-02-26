package com.bcgx.electricityboardservices.service;

import java.sql.Date;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.bcgx.electricityboardservices.dto.ConnectionStatus;
import com.bcgx.electricityboardservices.dto.ConnectionsDto;
import com.bcgx.electricityboardservices.entity.Connections;
import com.bcgx.electricityboardservices.exceptionUtil.ConnectionDateSearchException;
import com.bcgx.electricityboardservices.exceptionUtil.ConnectionSearchNotFound;
import com.bcgx.electricityboardservices.exceptionUtil.ResourceNotFoundException;
import com.bcgx.electricityboardservices.repository.ConnectionsRepository;
import com.bcgx.electricityboardservices.util.ConnectionsDtoMapper;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ConnectionsServiceImpl implements ConnectionsService {
	
	private static Logger logger = LoggerFactory.getLogger(ConnectionsServiceImpl.class);
	
	@Autowired
	ConnectionsRepository connectionsRepo;
	
	@Autowired
	ConnectionsDtoMapper connDtoMapper;

	/** 
	 * Fetches connection.
	 *
	 * @param name Optional parameter for the applicant name filter.
	 * @param page Optional parameter for the page number (default is 0).
	 * @param size Optional parameter for the page size (default is 10).
	 * @return Page of Connections containing connections that match the specified applicant name.
	 */
	@Override
	public Page<Connections> fetchConnections(Optional<Integer> page, Optional<Integer> size) {
			// Specify the sort order based on id
		    Sort sort = Sort.by("id").ascending();
	        Page<Connections> connList = connectionsRepo.findAll(PageRequest.of(page.orElse(0), size.orElse(10), sort));
	        
	        if (connList.isEmpty()) {
	            throw new ConnectionSearchNotFound();
	        } else {
	        	return connList;
	        }
	}


	/**
	 * Fetches connection by application ID.
	 *
	 * @param appId The ID of the application for which connections are to be fetched.
	 * @return ConnectionsDto object representing the fetched connection.
	 */
	@Override
	public ConnectionsDto fetchConnectionsByAppId(Integer appId) {
	    
	        Connections conn = connectionsRepo.findApplicationById(appId);
	        if(conn == null) {
	        	logger.error("Error while fetching connection by appId: {}", appId);
	        	throw new ResourceNotFoundException("Conenction", "connection id", appId + "");
	        }
	        ConnectionsDto connDto = connDtoMapper.connectionsDtoObjMapper(conn);
	        
	        return connDto;
	}


	/**
	 * Fetches connections within a specified date range.
	 *
	 * @param start The start date of the date range.
	 * @param end   The end date of the date range.
	 * @param page  Optional parameter for the page number (default is 0).
	 * @param size  Optional parameter for the page size (default is 10).
	 * @return Page of Connections containing connections within the specified date range.
	 */
	@Override
	public Page<Connections> fetchWithDateRange(Date start, Date end, Optional<Integer> page, Optional<Integer> size) {
	    
	        // Retrieve a Page of Connections from the repository based on the provided date range and pagination parameters.
	        Page<Connections> connList = connectionsRepo.findByDateBetween(start, end, PageRequest.of(page.orElse(0), size.orElse(10)));
	        if (connList.isEmpty()) {
	            throw new ConnectionDateSearchException();
	        } else {
	        	return connList;
	        }
	}

	/**
	 * Updates a connection based on the provided ConnectionsDto.
	 *
	 * @param connDto The ConnectionsDto object containing updated connection information.
	 */
	@Override
	public void updateConnection(ConnectionsDto connDto) throws Exception {
	   
	        Connections conn = connDtoMapper.connectionsDtoToEntityObjMapper(connDto);
	        connectionsRepo.saveAndFlush(conn);
	}

	/**
	 * Finds connection statuses for each month in a specified year.
	 *
	 * @param year The year for which connection statuses are to be retrieved.
	 * @return List of ConnectionStatus objects representing the statuses for each month.
	 * @throws Exception 
	 */
	@Override
	public List<ConnectionStatus> findConnectionsByYear(Integer year) throws Exception {
	    List<ConnectionStatus> res = new ArrayList<>();
	        TreeMap<Integer, ConnectionStatus> map = new TreeMap<>();
	        for (int i = 1; i <= 12; i++) {
	            int approved = 0;
	            int pending = 0;
	            int total = 0;
	            List<Connections> li = connectionsRepo.getApps(year, i);
	            for (Connections c : li) {
	                String status = c.getStatus().toLowerCase();
	                if (status.equalsIgnoreCase("pending")) {
	                    pending++;
	                } else if (status.equalsIgnoreCase("approved")) {
	                    approved++;
	                }
	                total++;
	            }
	            map.put(i, new ConnectionStatus(total, pending, approved));
	        }
	        boolean flag = map.values().stream().anyMatch(status -> status.getTotal() > 0);
	        if (!flag) {
	            throw new ResourceNotFoundException("Conenctions", "year", year + "");
	        }
	        for(int i : map.keySet()) {
	        	res.add(map.get(i));
	        }
	    return res;
	}
	
	
//    public Page<ConnectionsDto> convertPage(Page<Connections> customerPage) {
//        List<ConnectionsDto> ConnectionsDtoList = customerPage.getContent().stream()
//                .map(this::convertToDto) // Assuming you have a method to convert Customer to CustomerDto
//                .collect(Collectors.toList());
//
//        return new PageImpl(ConnectionsDtoList, customerPage.getPageable(), customerPage.getTotalElements());
//    }
	
//    private ConnectionsDto convertToDto(Connections customer) {
//        // Implement the conversion logic from Customer to CustomerDto
//        return new ConnectionsDto(customer.getId(),), /* other fields */);
//    }
	
	

	

}
