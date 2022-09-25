var BASE_URL, MAT_URL;

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:8000/api";
} else if (process.env.NODE_ENV === "production") {
    BASE_URL = "http://localhost:8000/api";
}

export { BASE_URL };
