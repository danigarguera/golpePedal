package com.golpedepedal.exception;

public class HttpErrorResponse {

    private String error;

    public HttpErrorResponse(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }
}
