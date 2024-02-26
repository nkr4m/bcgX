package com.bcgx.electricityboardservices.controller;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bcgx.electricityboardservices.dto.ConnectionStatus;
import com.bcgx.electricityboardservices.dto.ConnectionsDto;
import com.bcgx.electricityboardservices.dto.SuccessResponseDto;
import com.bcgx.electricityboardservices.entity.Connections;
import com.bcgx.electricityboardservices.service.ConnectionsService;
import com.bcgx.electricityboardservices.util.ConnectionsDtoMapper;

/**
* RestController handler for managing connections (Connectins). In this context,
* code to refer to the entities involved with the connections.
*
*/


@CrossOrigin
@RestController
@RequestMapping("conn")
public class ConnectionsController {
	
	private static Logger logger = LoggerFactory.getLogger(ConnectionsController.class);
	
	@Autowired
	ConnectionsService connectionService;
	
	@Autowired
	ConnectionsDtoMapper connectionDto;
	
	/**
	 * Retrieves a page of connections for all users.
	 *
	 * @param page Optional parameter for the page number (default is 0).
	 * @param size Optional parameter for the page size (default is 10).
	 * @return ResponseEntity containing a Page of Connections and HttpStatus.OK, or an empty Page and HttpStatus.INTERNAL_SERVER_ERROR in case of an error.
	 */
	@GetMapping("conn-all")
	public ResponseEntity<Page<Connections>> fetchAllConnections(
	        @RequestParam Optional<Integer> page,
	        @RequestParam Optional<Integer> size) {
	    try {
	        // Retrieve a page of connections from the service based on the provided parameters.
	        Page<Connections> connectionsPage = connectionService.fetchConnections(page, size);

	        // Return a ResponseEntity with the Page of Connections and HttpStatus.OK.
	        return new ResponseEntity<>(connectionsPage, HttpStatus.OK);
	    } catch (Exception e) {
	        // Log an error message if an exception occurs during the process.
	        logger.error("Error while fetching all connections: {}", e);
	        // Return an empty Page and HttpStatus.INTERNAL_SERVER_ERROR in case of an error.
	        return new ResponseEntity<>(Page.empty(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	/**
	 * Retrieves connections based on the provided application ID.
	 *
	 * @param appId The unique identifier of the application.
	 * @return ResponseEntity containing a ConnectionsDto with HttpStatus.OK if successful,
	 *         or HttpStatus.NOT_FOUND if no connections are found for the specified appId.
	 */
	@GetMapping("appid")
	public ResponseEntity<ConnectionsDto> fetchConnectionsByAppId(@RequestParam Integer appId) {
		ConnectionsDto connDto = connectionService.fetchConnectionsByAppId(appId);
		return new ResponseEntity<ConnectionsDto>(connDto, HttpStatus.OK);
	}
	

	/**
	 * Retrieves a page of connections within the specified date range.
	 *
	 * @param start The start date of the date range in the format 'yyyy-MM-dd'.
	 * @param end   The end date of the date range in the format 'yyyy-MM-dd'.
	 * @param page  Optional parameter for the page number (default is 0).
	 * @param size  Optional parameter for the page size (default is 10).
	 * @return ResponseEntity containing a Page of Connections within the specified date range with HttpStatus.OK,
	 *         or an empty Page and HttpStatus.INTERNAL_SERVER_ERROR in case of an error.
	 */
	@GetMapping("date-range")
	public ResponseEntity<Page<Connections>> fetchConnetcionsWithDateRange(@RequestParam String start, @RequestParam String end, @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size) {
		Date d1 = connectionDto.convertStringToDate(start);
		Date d2 = connectionDto.convertStringToDate(end);
		Page<Connections> connPage =  connectionService.fetchWithDateRange(d1, d2, page, size);
		return new ResponseEntity<Page<Connections>>(connPage, HttpStatus.OK);
	}
	

	/**
	 * Updates a connection's information.
	 *
	 * @param conn The ConnectionsDto containing the updated connection data.
	 * @return ResponseEntity containing a SuccessResponseDto with HttpStatus.OK if the update is successful,
	 *         or HttpStatus.INTERNAL_SERVER_ERROR if an error occurs during the update.
	 * @throws Exception if an unexpected error occurs during the update process.
	 */
	@PutMapping("update-conn")
	public ResponseEntity<SuccessResponseDto> updateConnection(@RequestBody ConnectionsDto conn) throws Exception{
		connectionService.updateConnection(conn);
		SuccessResponseDto res = new SuccessResponseDto("success");
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	/**
	 * Fetches connection statuses for all applications in a specific year.
	 *
	 * @param year The year for which connection statuses are requested.
	 * @return ResponseEntity containing a List of ConnectionStatus for the specified year with HttpStatus.OK if successful,
	 *         or HttpStatus.INTERNAL_SERVER_ERROR if an error occurs during the fetch.
	 * @throws Exception if an unexpected error occurs during the fetch process.
	 */
	@GetMapping("fetch-conns/{year}")
	public ResponseEntity<List<ConnectionStatus>> fetchConnectionByYears(@PathVariable Integer year) throws Exception {
		List<ConnectionStatus> res = connectionService.findConnectionsByYear(year);
		return new ResponseEntity<List<ConnectionStatus>>(res, HttpStatus.OK);
	}
	
	

	
	
	
	
	

}
