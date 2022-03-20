import axios from "axios";
import { Image } from "semantic-ui-react";

import baseUrl from "../utils/baseUrl";

import PhotoAttributes from "../components/Photo/PhotoAttributes";

function Photo({ photo }) {
  return(
    <>
      <Image src={photo.mediaUrl}/>
      <PhotoAttributes {...photo} />
    </>
  );
}

Photo.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/photo`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { photo: response.data };
};

export default Photo;