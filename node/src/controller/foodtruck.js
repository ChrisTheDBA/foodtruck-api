import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/FoodTruck';

export default ({ config, db }) => {
	let api = Router();

	// '/v1/FoodTruck/add'
	api.post('/add', (req, res) => {
		let newFoodTruck = new FoodTruck();
		newFoodTruck.name = req.body.name;

		newFoodTruck.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'FoodTruck saved successfully'});
		});
	});

	// '/v1/foodtruck' - Read
	api.get( '/', (req, res) => {
		FoodTruck.find({}, (err, FoodTrucks) => {
			if (err) {
				res.send(err);
			}
			res.json(FoodTrucks);
		});
	});

	// '/v1/restaurnat/:id' - Read 1
	api.get('/:id', (req, res) => {
		FoodTruck.findById(req.params.id, (err, FoodTruck) => {
			if (err) {
				res.send(err);
			}
            res.json(FoodTruck);
		});
	});

	// '/v1/FoodTruck/:id' - Update
	api.put('/:id', (req, res) => {
		FoodTruck.findById(req.params.id, (err, FoodTruck) => {
			if (err) {
				res.send(err);
			}
			FoodTruck.name = req.body.name;
			FoodTruck.save(err => {
				if (err) {
					res.send(err);
				}
				res.json({ message: "FoodTruck info saved"});
			});
        });
	});

	// '/v1/FoodTruck/:id' - Delete
	api.delete('/:id', (req, res) => {
		FoodTruck.remove({
			_id: req.params.id 
		}, (err, FoodTruck) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: "FoodTruck successully removed"});
		});
	});

	return api;
}