const ENV_URL = process.env.NODE_ENV === "development" ? "http://web.localhost:8080" : "https://web.reppo.io"
export default ENV_URL;
