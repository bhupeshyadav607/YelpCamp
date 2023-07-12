const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/yelp-camp")
    .then(() => {
      console.log("MONGO CONNECTION OPEN!!");
    })
    .catch((err) => {
      console.log("OH NO MONGO CONNECTION ERROR!!!!");
      console.log(err);
    });
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64a3ede500b1f7bfda5d7a47",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et rerum nesciunt, voluptatem expedita inventore at repudiandae architecto ducimus reiciendis voluptatibus odio beatae natus deleniti provident distinctio! Dolorum accusantium aspernatur rerum.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dzbfdy4f9/image/upload/v1688814490/YelpCamp/n1gzje0hnfznihq9ywq0.jpg",
          filename: "YelpCamp/n1gzje0hnfznihq9ywq0",
        },
        {
          url: "https://res.cloudinary.com/dzbfdy4f9/image/upload/v1688814489/YelpCamp/cvrjvqbptn0tal3a1dzu.jpg",
          filename: "YelpCamp/cvrjvqbptn0tal3a1dzu",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
