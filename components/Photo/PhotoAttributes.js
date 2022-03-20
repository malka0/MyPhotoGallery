import React from "react";
import { Header, Button, Modal, Container } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";

function PhotoAttributes({ name, description, _id }) {
  const [modal, setModal] = React.useState(false);
  const router = useRouter();

  async function handleDelete() {
    const url = `${baseUrl}/api/photo`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/photos");
  }

  return (
    <>
      <Header as="h3">{name}</Header>
      <p>{description}</p>
      <Container textAlign="right">
        <Button
          icon="edit outline"
          content="Edit"
        />
        <Button
          icon="trash alternate outline"
          color="red"
          content="Delete"
          onClick={() => setModal(true)}
        />
      </Container>


      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this photo?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModal(false)} content="Cancel" />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>

    </>
  );
}

export default PhotoAttributes;
