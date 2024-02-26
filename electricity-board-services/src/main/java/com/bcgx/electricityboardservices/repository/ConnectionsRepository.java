package com.bcgx.electricityboardservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bcgx.electricityboardservices.entity.Connections;

import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ConnectionsRepository extends JpaRepository<Connections, Integer> {
	Page<Connections> findAll(Pageable pageable);
	
	Connections findApplicationById(Integer id);
	
	@Query(value = "SELECT * FROM connections u WHERE u.Date_of_Application BETWEEN :startDate AND :endDate",
	           countQuery = "SELECT COUNT(*) FROM connections u WHERE u.Date_of_Application BETWEEN :startDate AND :endDate",
	           nativeQuery = true)
	    Page<Connections> findByDateBetween(@Param("startDate") Date startDate,
	                                 @Param("endDate") Date endDate,
	                                 Pageable pageable);

	
	@Query(value = "SELECT * FROM connections "
	        + "WHERE YEAR(date_of_application) = :year "
	        + "AND MONTH(date_of_application) = :month", nativeQuery = true)
	List<Connections> getApps(@Param("year") Integer year, @Param("month") Integer month);
	
	
	
	}
	
	
	

	
	

	

	

