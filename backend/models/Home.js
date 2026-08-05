import mongoose from "mongoose";


const homeSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
    },


    description: {
      type: String,
      required: true,
    },


    image: {
      type: String,
      required: true,
    },


    buttonText: {
      type: String,
      required: true,
    },


    buttonLink: {
      type: String,
      required: true,
    }

  },
  {
    timestamps: true
  }
);


const Home = mongoose.model("Home", homeSchema);


export default Home;