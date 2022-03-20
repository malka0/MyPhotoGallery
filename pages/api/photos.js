//import Photo from "../../public/photos.json";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import Photo from "../../models/Photo";
import User from "../../models/User";
import Album from "../../models/Album";

import connectDb from "../../utils/connectDb";


connectDb();

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    // get user
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );


    const user = await User.findOne({ _id: userId });
 
    // get album
    const albums = user.albums;
    const albumId = albums.find(obj => {
      return obj.name === req.headers.album
    }).id.toString();
    const album = await Album.findOne({ _id:  albumId});
    // get photos
    const photosIds = album.photos.map(el => el.toString());

    const photos = await Photo.find({'_id': {$in: photosIds}})
    console.log(photosIds);



  // const photos = await Photo.find();
  //res.status(200).json(photos);
  //const photos = await Photo.find();
  res.status(200).json(photos);
  } catch(error){
    console.error(error);
    res.status(403).send("Please login again");
  }
} ;
