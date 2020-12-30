const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/brightland"
);

const rentalSeed = [
  {
    location: "Bend, OR",
    description: "The Bend Riverside Inn & Suites offers stunning views of the infamous Deschutes River. The property includes a large indoor, heated pool and hot tub, laundry on-site, dozens of walking trails along the Deschutes, and easy access to downtown. Of course, the rooms come with free wifi, and two TVs with cable. The condo comes with two beds, two bathrooms, and a full kitchen.",  
    activities: "Riverside Bend getaway is located right on the Deschutes River in; no better way to start the morning than to look out and enjoy the view of the river. With only a few short blocks you'll be able to walk to some of the Bend’s finest shops and restaurants. Bend is known for a fabulous dinner out, with many cuisine options to choose from. Shops and merchants feature local artists from around the state of Oregon.",
    images: "none" 
  },
  {
    location: "Cabo, MX",
    description: "A beautiful brand new condo with majestic views over the city of Cabo San Lucas Mexico A beautiful brand new condo with majestic views over the city of Cabo San Lucas Mexico. This spot has all new custom designed furniture that allows one to feel as if they have reached the top of the world. This place is only walking distance from down town Cabo. So many cool things to do only a short distance away, with some of the best temperatures and weather in the world. You owe it to yourself to have this experience. Designed for work from abroad nomads.. This spot has all new custom designed furniture that allows one to feel as if they have reached the top of the world. This place is only walking distance from down town Cabo. So many cool things to do only a short distance away, with some of the best temperatures and weather in the world. You owe it to yourself to have this experience. Designed for work from abroad nomads.",
    activities: "",
    images: "none"
  },{
    location: "Mt Hood",
    description: "The room is equipped with a private kitchen and bathroom. The room also connects to a nice patio with chairs and a peaceful view. This is one of the 10 units in the historic 1914 Thunderhead Lodge. The building used to serve as the transit center for transporting skiers up to the Timberline Lodge ski resort. Skiers in the 1950s would board a gondola that took them 2,200’ up the mountain. The Skiway was promoted as the longest and largest in the world at the time. The room is equipped with images of this historic time. The location of this room is right where people used to load and unload!",
    activities: "It walking distance to Government Camp's local bars and restaurants. Perhaps our most attractive feature is the use of our pool which stays extremely warm during (~100C) the winter, which feels amazing after a long day in the cold (pool and rec room closed due to COVID 19). Aside from amazingly warm pool that is more like a big hot tub, there is a recreational room for all guests to enjoy. The rec room includes a TV, fireplace, foosball table, and pool table.",
    images: "none"
  },{
    location: "Portland, OR",
    description: "My studio has amazing light looking east to the city. The outdoor patio with seating and BBQ complete the space.A full size kitchen with everything you need to create a wonderful entertaining area The studio lives larger than the square footage. Large bathroom with a nice shower. Couch under the loft bed making viewing the big screen TV for your streaming converts into a comfortable bed. You will want for nothing. Just bring your clothes and your toothbrush",
    activities: "This studio has a 99 walking score. The famous Portland farmer market is a 20 min walk with voodoo doughnuts right there. Walk past Powells bookstore and take a peak at the 1,000 ‘s of new and used books. There are so many brew pubs restaurants grocery stores all within 5 min walk from the front door. Surrounding the Portland area: incredible hiking in the gorge 30 min away, wine tasting 30 min away, beaches 1 hr away and snow skiing 1 hour way to Mt Hood. Parking is on street with permit and light rail is a block away should you not want a car.",
    images: "none"
  },{
    location: "Indian Palms, CA",
    description: "My home is a single level mid century open concept home. The kitchen looks out through the sliding glass doors to the pool. WiFi can be accessed throughout the home and poolside. There are 2 large flat screen smart TV's one in the LR and BR. There is a BBQ with an outdoor dining area. It is located in a gated community with 27 holes golf. The location, amenities and flow of this home make it a perfect vacation getaway for everyone.",
    activities: "",
    images: "none"
  },{
    location: "Indio, CA",
    description: "Welcome to my Terrific Townhous in Indian Palms CC. Light shines in through all windows creating a feeling of openness. The TV room flows into the kitchen which looks into the living/dining area out to the outdoor seating space making it the perfect indoor outdoor entertaining area. The pool is a 50 ft walk on the greenway. Upstairs there are 2 bdrms and a full bath. You will feel spoiled when you slip into the linen sheets in the king sized bed. Enjoy this home away from home.",
    activities: "My place is very centrally located. It is a bit over a mile walk to the empire polo fields where Coachella and stage coach is held. I am very close to the tennis pavilion and the HITS horse show. Indian Palms is beautifully landscaped with 27 holes of golf. The streets are wide and wonderful for walking. My unit is 50 steps away from the community pool and spa.",
    images: "none"
  },{
    location: "Los Cerritos, MX",
    description: "None",
    activities: "None",
    images: "none"
  },{
    location: "La Pine",
    description: "This RV space sets you in not only a secluded treed area but places you in a Mecca of bicycling, hiking and rafting in one of the most beautiful areas in the US. Having La Pine State park a mere 3 miles away on a quite road will take you to miles of cycling trails and hiking trails. In addition to the wonderful outdoor activities, La Pine State park has a dump site, fresh water fill for free. The place is an RV pad only. We provide electricity for 30 amp and 50 amp and 110 plug in. Cell service is sketchy. You can walk out to the road and find a bit stronger service. If you are thinking of running your office from here don’t plan on it. This is a getaway.",
    activities: "You can enjoy your own rafting experience by using the private park that comes with the rental of the pad. It is located off cub lane. You can walk or drive about .4 miles. Let in there then shuttle to Big Bend and let out. About a 3 hour float. Awesome.The local attractions such as the lava caves are about a 10 mile dr away Sun river is 14 miles away and Paulina lake located in the caldera is about 20 min away has natural hot springs. These are just a few amazing attractions close by. That doesn’t even include crater lake which is about 2 hours away. Of course Bend the coolest town is about a 25 minute drive away has everything you need from shopping rafting checking out the local brews to art. If you need a quick refill of ice and basic supplies La Pine is a mere 6 miles. Our space is on a cool site with lots of land between you and your neighbors. If your looking for a unique experience in beautiful central Oregon this is your spot.",
    images: "none"
  },{
    location: "Glamping",
    description: "This glamping site in the Eastern cascades is amazing.There is an RV pad with an RV and full electric hookup. The RV has full functioning kitchen full bathroom and sleeping for 4. Double bed and queen bed over the cab. There are 3 luxurious series of tents for your sleeping comfort. About .4 miles walk away you get a member only access to the Deschutes river. Do the drift Enjoy!",
    activities: "None",
    images: "none"
  },

];

db.Rental
  .remove({})
  .then(() => db.Rental.collection.insertMany(rentalSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
