const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://myphotogallery-one-two-three.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
