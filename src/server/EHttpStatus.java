package server;

public enum EHttpStatus {
    INTERNAL_ERROR("Internal Server Error"),
    OK("OK");

    private String value;

    EHttpStatus(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
