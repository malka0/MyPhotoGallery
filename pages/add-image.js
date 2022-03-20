import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  Container
} from "semantic-ui-react";
import axios from "axios";

import baseUrl from "../utils/baseUrl";
import catchedError from "../utils/catchedError";

const INITIAL_PHOTO = {
  name: "",
  description: "",
  media: ""
};

function AddImage({ user }) {
  const albumId = user.albums.find(obj => {return obj.name === "All"}).id.toString();

  const [photo, setPhoto] = React.useState(INITIAL_PHOTO);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isPhoto = photo.name && photo.media
    isPhoto ? setDisabled(false) : setDisabled(true);
  }, [photo]);

  function handleChange(event) {
    console.log(photo)
    const { name, value, files } = event.target;
    if (name === "media") {
      setPhoto(prevState => ({ ...prevState, media: files[0] }));
      try {
        setMediaPreview(window.URL.createObjectURL(files[0]));
      } catch (error) { setMediaPreview(''); }

    } else {
      setPhoto(prevState => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", photo.media);
    data.append("upload_preset", "MyPhotoGallery");
    data.append("cloud_name", "do2alopcp");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      setLoading(true);

      const mediaUrl = await handleImageUpload();

      const url = `${baseUrl}/api/photo`;
      const { name, description } = photo;
      //const payload = { name:"" , description, mediaUrl };
      const payload = { name, description, mediaUrl, albumId };
      const response = await axios.post(url, payload);
      console.log({ response });

      setLoading(false);
      setPhoto(INITIAL_PHOTO);
      setMediaPreview('');
      document.getElementById("add-image-form").reset();
      setSuccess(true);
    } catch (error) {
      catchedError(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="blue" />
        Add New Photo
      </Header>
      <Form
        id="add-image-form"
        loading={loading}
        success={success}
        error={Boolean(error)}
        onSubmit={handleSubmit}>
        <Message
          error
          icon='x'
          header="Oops!"
          content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your photo has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={photo.name}
            onChange={handleChange}
            required
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Photo"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
            required
          />

        </Form.Group>
        <Image src={mediaPreview} rounded centered size="large" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={photo.description}
        />
        <Container textAlign="right">
          <Form.Field
            control={Button}
            disabled={disabled || loading}
            color="blue"
            icon="pencil alternate"
            content="Submit"
            type="submit"
          />
        </Container>

      </Form>
    </>
  );
}

export default AddImage;