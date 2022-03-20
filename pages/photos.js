import axios from "axios";
import { parseCookies } from "nookies";

import PhotosList from "../components/PhotosList";
import baseUrl from "../utils/baseUrl";

function Photos({ photos }){
  return(
    <PhotosList photos={photos} />
  );
}

Photos.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);

  // fetch photos
  const url = `${baseUrl}/api/photos`;
  const payload = { headers: { Authorization: token, Album: "All" } };
  const response = await axios.get(url, payload);
  return { photos: response.data };
};

export default Photos;
