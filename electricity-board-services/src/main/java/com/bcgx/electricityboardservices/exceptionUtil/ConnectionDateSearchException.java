package com.bcgx.electricityboardservices.exceptionUtil;

public class ConnectionDateSearchException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ConnectionDateSearchException() {
        super(String.format("No Connections found for the search result, Please try with a different date range."));
    }

}