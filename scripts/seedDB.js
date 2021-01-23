const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  // "mongodb+srv://brightland:brightland@brightland.fdmwc.mongodb.net/Brightland?retryWrites=true&w=majority"
  process.env.MONGODB_CONNECTION_STRING 
  ||
  "mongodb://localhost/brightland"
);

const rentalSeed = [
  {
    location: "Bend, OR",
    description: "The Bend Riverside Inn & Suites offers stunning views of the infamous Deschutes River. The property includes a large indoor, heated pool and hot tub, laundry on-site, dozens of walking trails along the Deschutes, and easy access to downtown. Of course, the rooms come with free wifi, and two TVs with cable. The condo comes with two beds, two bathrooms, and a full kitchen.",  
    activities: "Riverside Bend getaway is located right on the Deschutes River in; no better way to start the morning than to look out and enjoy the view of the river. With only a few short blocks you'll be able to walk to some of the Bend’s finest shops and restaurants. Bend is known for a fabulous dinner out, with many cuisine options to choose from. Shops and merchants feature local artists from around the state of Oregon.",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1610144272/BEND/unnamed_5_sb3pva.png"],
    imageUrl: [
     "https://res.cloudinary.com/brightland/image/upload/v1610144272/BEND/unnamed_5_sb3pva.png",
     "https://res.cloudinary.com/brightland/image/upload/v1610144271/BEND/unnamed_3_clkvs4.png",
     "https://res.cloudinary.com/brightland/image/upload/v1610144271/BEND/unnamed_1_ol1xdb.png",
     "https://res.cloudinary.com/brightland/image/upload/v1610144270/BEND/unnamed_2_bek9bp.png",
     "https://res.cloudinary.com/brightland/image/upload/v1610144270/BEND/unnamed_nxqk5w.png"
    ],
    link: "",
  },
  {
    location: "Cabo, MX",
    description: "A beautiful brand new condo with majestic views over the city of Cabo San Lucas Mexico A beautiful brand new condo with majestic views over the city of Cabo San Lucas Mexico. This spot has all new custom designed furniture that allows one to feel as if they have reached the top of the world. This place is only walking distance from down town Cabo. So many cool things to do only a short distance away, with some of the best temperatures and weather in the world. You owe it to yourself to have this experience. Designed for work from abroad nomads.. This spot has all new custom designed furniture that allows one to feel as if they have reached the top of the world. This place is only walking distance from down town Cabo. So many cool things to do only a short distance away, with some of the best temperatures and weather in the world. You owe it to yourself to have this experience. Designed for work from abroad nomads.",
    activities: "",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1611174218/Home/Cabo_ztzcyp.jpg"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144033/CABO/unnamed_gzf1yj.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144033/CABO/unnamed_7_zah00s.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144033/CABO/unnamed_6_lckdmg.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144033/CABO/unnamed_5_eexj5s.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144032/CABO/pasted_image_0_tjj2bz.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144032/CABO/pasted_image_0_1_gyokbw.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144032/CABO/unnamed_4_uclozk.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144032/CABO/unnamed_1_t1o65b.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144032/CABO/unnamed_3_gwiah9.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144032/CABO/unnamed_2_gqqj0m.png"
    ],
    link: "https://www.airbnb.com/rooms/show/47028006",
  },{
    location: "Mt Hood, OR",
    description: "The room is equipped with a private kitchen and bathroom. The room also connects to a nice patio with chairs and a peaceful view. This is one of the 10 units in the historic 1914 Thunderhead Lodge. The building used to serve as the transit center for transporting skiers up to the Timberline Lodge ski resort. Skiers in the 1950s would board a gondola that took them 2,200’ up the mountain. The Skiway was promoted as the longest and largest in the world at the time. The room is equipped with imageUrl of this historic time. The location of this room is right where people used to load and unload!",
    activities: "It walking distance to Government Camp's local bars and restaurants. Perhaps our most attractive feature is the use of our pool which stays extremely warm during (~100C) the winter, which feels amazing after a long day in the cold (pool and rec room closed due to COVID 19). Aside from amazingly warm pool that is more like a big hot tub, there is a recreational room for all guests to enjoy. The rec room includes a TV, fireplace, foosball table, and pool table.",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1611174438/Home/MtHood_fzudkm.jpg"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144417/MT%20HOOD/unnamed_o5j97a.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144417/MT%20HOOD/unnamed_wdjjeh.jpg",
      "https://res.cloudinary.com/brightland/image/upload/v1610144417/MT%20HOOD/unnamed_6_ozq57w.jpg",
      "https://res.cloudinary.com/brightland/image/upload/v1610144416/MT%20HOOD/unnamed_5_i9qwty.jpg",
      "https://res.cloudinary.com/brightland/image/upload/v1610144416/MT%20HOOD/unnamed_4_nim28k.jpg",
      "https://res.cloudinary.com/brightland/image/upload/v1610144417/MT%20HOOD/unnamed_3_xcoter.jpg",
      "https://res.cloudinary.com/brightland/image/upload/v1610144416/MT%20HOOD/unnamed_1_pfmhh9.jpg",
      "https://res.cloudinary.com/brightland/image/upload/v1610144416/MT%20HOOD/unnamed_2_bybygt.jpg",
    ],
    link: "",
  },{
    location: "Portland, OR",
    description: "My studio has amazing light looking east to the city. The outdoor patio with seating and BBQ complete the space.A full size kitchen with everything you need to create a wonderful entertaining area The studio lives larger than the square footage. Large bathroom with a nice shower. Couch under the loft bed making viewing the big screen TV for your streaming converts into a comfortable bed. You will want for nothing. Just bring your clothes and your toothbrush",
    activities: "This studio has a 99 walking score. The famous Portland farmer market is a 20 min walk with voodoo doughnuts right there. Walk past Powells bookstore and take a peak at the 1,000 ‘s of new and used books. There are so many brew pubs restaurants grocery stores all within 5 min walk from the front door. Surrounding the Portland area: incredible hiking in the gorge 30 min away, wine tasting 30 min away, beaches 1 hr away and snow skiing 1 hour way to Mt Hood. Parking is on street with permit and light rail is a block away should you not want a car.",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1611174476/Home/Portland_peulhj.jpg"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144551/PORTLAND/unnamed_lyn17p.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144550/PORTLAND/unnamed_4_hbukmc.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144550/PORTLAND/unnamed_5_jvvmsl.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144550/PORTLAND/unnamed_3_igtu3j.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144550/PORTLAND/unnamed_1_tfd2as.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144550/PORTLAND/unnamed_6_cmcqn6.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144550/PORTLAND/unnamed_2_oyj3lx.png"
    ],
    link: "https://www.airbnb.com/rooms/show/30103421",
  },{
    location: "Indian Palms, CA",
    description: "My home is a single level mid century open concept home. The kitchen looks out through the sliding glass doors to the pool. WiFi can be accessed throughout the home and poolside. There are 2 large flat screen smart TV's one in the LR and BR. There is a BBQ with an outdoor dining area. It is located in a gated community with 27 holes golf. The location, amenities and flow of this home make it a perfect vacation getaway for everyone.",
    activities: "",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1611174199/Home/IndianPalms_vwccje.jpg"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144626/INDIAN%20PALMS/unnamed_ocdnij.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144626/INDIAN%20PALMS/unnamed_9_r2w04q.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144626/INDIAN%20PALMS/unnamed_8_gvp1r3.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144626/INDIAN%20PALMS/unnamed_7_fhxmwc.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144626/INDIAN%20PALMS/unnamed_6_y7z71d.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144625/INDIAN%20PALMS/unnamed_1_mfnbsc.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144625/INDIAN%20PALMS/unnamed_2_dgzsx9.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144625/INDIAN%20PALMS/unnamed_4_dsdyjq.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144625/INDIAN%20PALMS/unnamed_5_yphsv5.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144624/INDIAN%20PALMS/unnamed_3_llpoku.png"
    ],
    link: "https://www.airbnb.com/rooms/show/44116042",
  },{
    location: "Indio, CA",
    description: "Welcome to my Terrific Townhous in Indian Palms CC. Light shines in through all windows creating a feeling of openness. The TV room flows into the kitchen which looks into the living/dining area out to the outdoor seating space making it the perfect indoor outdoor entertaining area. The pool is a 50 ft walk on the greenway. Upstairs there are 2 bdrms and a full bath. You will feel spoiled when you slip into the linen sheets in the king sized bed. Enjoy this home away from home.",
    activities: "My place is very centrally located. It is a bit over a mile walk to the empire polo fields where Coachella and stage coach is held. I am very close to the tennis pavilion and the HITS horse show. Indian Palms is beautifully landscaped with 27 holes of golf. The streets are wide and wonderful for walking. My unit is 50 steps away from the community pool and spa.",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1610144747/INDIO/unnamed_10_csohti.png"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144748/INDIO/unnamed_uvmzmm.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144747/INDIO/unnamed_10_csohti.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144747/INDIO/unnamed_7_tanocp.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144746/INDIO/unnamed_1_zn1edi.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144746/INDIO/unnamed_3_gxlfil.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144746/INDIO/unnamed_4_g96jdf.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144746/INDIO/unnamed_6_nu04hd.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144746/INDIO/unnamed_5_fvjlfo.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144746/INDIO/unnamed_2_yzjpal.png"
    ],
    link: "https://www.airbnb.com/rooms/show/21455622",
  },{
    location: "Los Cerritos, MX",
    description: "None",
    activities: "None",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1611174349/Home/LosCerritos_d6rzty.jpg"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144833/LOS%20CERRITOS/unnamed_8_kjvg23.png"
    ],
    link: "https://www.airbnb.com/rooms/show/45737073",
  },{
    location: "La Pad, OR",
    description: "This RV space sets you in not only a secluded treed area but places you in a Mecca of bicycling, hiking and rafting in one of the most beautiful areas in the US. Having La Pine State park a mere 3 miles away on a quite road will take you to miles of cycling trails and hiking trails. In addition to the wonderful outdoor activities, La Pine State park has a dump site, fresh water fill for free. The place is an RV pad only. We provide electricity for 30 amp and 50 amp and 110 plug in. Cell service is sketchy. You can walk out to the road and find a bit stronger service. If you are thinking of running your office from here don’t plan on it. This is a getaway.",
    activities: "You can enjoy your own rafting experience by using the private park that comes with the rental of the pad. It is located off cub lane. You can walk or drive about .4 miles. Let in there then shuttle to Big Bend and let out. About a 3 hour float. Awesome.The local attractions such as the lava caves are about a 10 mile dr away Sun river is 14 miles away and Paulina lake located in the caldera is about 20 min away has natural hot springs. These are just a few amazing attractions close by. That doesn’t even include crater lake which is about 2 hours away. Of course Bend the coolest town is about a 25 minute drive away has everything you need from shopping rafting checking out the local brews to art. If you need a quick refill of ice and basic supplies La Pine is a mere 6 miles. Our space is on a cool site with lots of land between you and your neighbors. If your looking for a unique experience in beautiful central Oregon this is your spot.",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1610144886/LA%20PAD/unnamed_2_dz5yjx.png"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610144892/LA%20PAD/unnamed_4_o4tzgo.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144892/LA%20PAD/unnamed_7_tkexwe.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144892/LA%20PAD/unnamed_lywcx3.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144889/LA%20PAD/unnamed_6_vpugwe.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144889/LA%20PAD/unnamed_3_qtzcxk.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144889/LA%20PAD/unnamed_5_vdoery.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144889/LA%20PAD/unnamed_1_qywkyk.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610144886/LA%20PAD/unnamed_2_dz5yjx.png"
    ],
    link: "https://www.airbnb.com/rooms/show/44491739",
  }
  ,{
    location: "Glamping, OR",
    description: "This glamping site in the Eastern cascades is amazing.There is an RV pad with an RV and full electric hookup. The RV has full functioning kitchen full bathroom and sleeping for 4. Double bed and queen bed over the cab. There are 3 luxurious series of tents for your sleeping comfort. About .4 miles walk away you get a member only access to the Deschutes river. Do the drift Enjoy!",
    activities: "None",
    homeImage: ["https://res.cloudinary.com/brightland/image/upload/v1611174203/Home/Glambing_dkyeq4.jpg"],
    imageUrl: [
      "https://res.cloudinary.com/brightland/image/upload/v1610145106/GLAMPING/unnamed_4_skgmtk.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610145106/GLAMPING/unnamed_8_s5egfn.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610145106/GLAMPING/unnamed_3_ss8ecr.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610145106/GLAMPING/unnamed_2_pnocdh.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610145105/GLAMPING/unnamed_1_b6mixz.png",
      "https://res.cloudinary.com/brightland/image/upload/v1610145105/GLAMPING/unnamed_qlhsx4.png"
    ]
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
