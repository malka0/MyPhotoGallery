import Photo from "../../models/Photo";
import Album from "../../models/Album";
import connectDb from "../../utils/connectDb";

connectDb();

// TODO: Check Authorization

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};


async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const photo = await Photo.findOne({ _id });
  res.status(200).json(photo);
}

async function handlePostRequest(req, res) {
  const { name, description, mediaUrl, albumId } = req.body;
  if (!name || !mediaUrl) {
    return res.status(422).send("missing one or more fields");
  }

  try {
    // create image
    const photo = await new Photo({
      name,
      description,
      mediaUrl
    }).save();
    // add to album
    //const album = await Album.findOne({ _id:  albumId});
    //album.photos += photo._id;
    //console.log(album.photos);
    await Album.findOneAndUpdate(
      { _id: albumId },
      { $addToSet: {photos: photo._id.toString()}}
    )

    res.status(201).json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error: Couldn't upload photo");
  }

}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  await Photo.findOneAndDelete({ _id });
  res.status(204).json({});
}