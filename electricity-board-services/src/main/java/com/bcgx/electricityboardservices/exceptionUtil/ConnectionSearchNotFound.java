package com.bcgx.electricityboardservices.exceptionUtil;

public class ConnectionSearchNotFound extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ConnectionSearchNotFound() {
        super(String.format("No Connections found for the search, please try with a different search."));
    }

}
