import { Card, Button, Container } from "semantic-ui-react";
import { useRouter } from "next/router";

function PhotosList({ photos }) {
  const router = useRouter();

  function mapProductsToItems(photos) {
    return photos.map(photo => ({
      header: photo.name,
      image: photo.mediaUrl,
      fluid: true,
      childKey: photo._id,
      href: `/photo?_id=${photo._id}`
    }));
  }

  return (
    <>
    <Container textAlign="right">
      <Button
        icon="add square"
        content="Add Photo"
        onClick={() => router.push("/add-image")}
      />
      <p><br/></p>
    </Container>

      
      <Card.Group
        stackable
        itemsPerRow="3"
        centered
        items={mapProductsToItems(photos)}
      />
    </>
  );
}

export default PhotosList;
