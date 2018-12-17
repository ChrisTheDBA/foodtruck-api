import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authmiddleware';

export default ({ config, db }) => {
	let api = Router();

	// '/v1/FoodTruck/add'
	api.post('/add', authenticate, (req, res) => {
		let newFoodTruck = new FoodTruck();
		newFoodTruck.name = req.body.name;
		newFoodTruck.foodtype = req.body.foodtype;
		newFoodTruck.avgcost = req.body.avgcost;
		newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;		

		newFoodTruck.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'FoodTruck saved successfully'});
		});
	});

	// '/v1/foodtruck' - Read all
	api.get( '/', (req, res) => {
		FoodTruck.find({}, (err, FoodTrucks) => {
			if (err) {
				res.send(err);
			}
			res.json(FoodTrucks);
		});
	});

	// '/v1/foodtruck/:id' - Read 1
	api.get('/:id', (req, res) => {
		FoodTruck.findById(req.params.id, (err, FoodTruck) => {
			if (err) {
				res.send(err);
			}
            res.json(FoodTruck);
		});
	});

	// find all foodtrucks with a specific foodtype
	// '/v1/foodtruck/foodtype/:foodtype'
	api.get('/foodtype/:foodtype', (req, res) => {
		FoodTruck.find({foodtype: req.params.foodtype}, (err, FoodTrucks) => {
			if (err) {
				res.send(err);
			}
			res.json(FoodTrucks);
		});
	}); 

	// '/v1/FoodTruck/:id' - Update
	api.put('/:id', authenticate, (req, res) => {
		FoodTruck.findById(req.params.id, (err, FoodTruck) => {
			if (err) {
				res.send(err);
			}
			FoodTruck.name = req.body.name;
			FoodTruck.foodtype = req.body.foodtype;
			FoodTruck.avgcost = req.body.avgcost;
			FoodTruck.geometry.coordinates = req.body.geometry.coordinates;		
			FoodTruck.save(err => {
				if (err) {
					res.send(err);
				}
				res.json({ message: "FoodTruck info saved"});
			});
        });
	});

	// '/v1/FoodTruck/:id' - Delete
	api.delete('/:id', authenticate, (req, res) => {
		FoodTruck.remove({
			_id: req.params.id 
		}, (err, FoodTruck) => {
			if (err) {
				res.send(err);
			}
			Review.remove({
				foodtruck: req.params.id
			}, (err, review) => {
				if (err) {
				res.send(err);
			}
			res.json({ message: "FoodTruck successully removed"});		
		});
	});
	});

// add a review by a specific foodtruck id
  // '/v1/foodtruck/reviews/add/:id'
  api.post('/reviews/add/:id', authenticate, (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.foodtruck = foodtruck._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReview);
        foodtruck.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Food truck review saved' });
        });
      });
    });
  });

  // return all reviews for a specic foodtruck id
  // '/v1/foodtruck/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
  	Review.find({foodtruck: req.params.id}, (err, reviews) => {
  		if (err) {
  			res.send(err);
  		}
  		res.json(reviews);
  	});
  });

  return api;
}