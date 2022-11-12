const bodyParser = require('body-parser');
const { request } = require('express');
const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

recordRoutes.use(bodyParser.json());

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the hitzone records.
recordRoutes.route('/hitzones').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('HitzoneCollection')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching hitzones!');
      } else {
        res.json(result);
      }
    });
});


//this route simply returns monster names and ID in order to make building the dropdown easier.
recordRoutes.route('/hitzonenames').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  const hitzones = dbConnect.collection("HitzoneCollection");
  const projection = { _id: 0, MonsterName: 1, MonsterID: 1 };
  const cursor = hitzones.find().project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching hitzones!');
    } else {
      res.json(result);
    }
  });
});

//this route returns all motion values
recordRoutes.route('/motionvalues').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('WeaponCollection')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching MVs!');
      } else {
        res.json(result);
      }
    });
});


recordRoutes.route('/hzsearch/:id').get(async function (_req, res) {
  console.log(_req.params.id);
  const requestID = parseInt(_req.params.id);
  const dbConnect = dbo.getDb();
  const hitzones = dbConnect.collection("HitzoneCollection");
  const query = { MonsterID: requestID };

  const cursor = hitzones.find(query);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching hitzones!');
    } else {
      res.json(result);
    }
  });
});

recordRoutes.route('/mvsearch/:id').get(async function (_req, res) {
  console.log(_req.params.id);
  const requestID = parseInt(_req.params.id);
  const dbConnect = dbo.getDb();
  const weapons = dbConnect.collection("WeaponCollection");
  const query = { MoveID: requestID };
  const projection = { _id: 0 };

  const cursor = weapons.find(query).project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching weapons!');
    } else {
      res.json(result);
    }
  });
});


recordRoutes.route('/mvsearch2/:wep').get(async function (_req, res) {
  console.log(_req.params.wep);
  const requestID = _req.params.wep.toString();
  const dbConnect = dbo.getDb();
  const weapons = dbConnect.collection("WeaponCollection");
  const query = { WeaponName: requestID };
  const projection = { _id: 0 };

  const cursor = weapons.find(query).project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send('Error fetching weapons!');
    } else {
      res.json(result);
    }
  });
});


// This section will help you create a new record.
// recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const matchDocument = {
//     listing_id: req.body.id,
//     last_modified: new Date(),
//     session_id: req.body.session_id,
//     direction: req.body.direction,
//   };

//   dbConnect
//     .collection('matches')
//     .insertOne(matchDocument, function (err, result) {
//       if (err) {
//         res.status(400).send('Error inserting matches!');
//       } else {
//         console.log(`Added a new match with id ${result.insertedId}`);
//         res.status(204).send();
//       }
//     });
// });

// // This section will help you update a record by id.
// recordRoutes.route('/listings/updateLike').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection('listingsAndReviews')
//     .updateOne(listingQuery, updates, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log('1 document updated');
//       }
//     });
// });

// // This section will help you delete a record.
// recordRoutes.route('/listings/delete/:id').delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection('listingsAndReviews')
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log('1 document deleted');
//       }
//     });
// });

module.exports = recordRoutes;
