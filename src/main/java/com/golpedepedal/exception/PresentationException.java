package com.golpedepedal.exception;

import org.springframework.http.HttpStatus;

public class PresentationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private HttpStatus httpStatus;

    public PresentationException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
