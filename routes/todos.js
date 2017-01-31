"use strict";
var express = require('express');
var router = express.Router();
var Todo = require('../models/todo').Todo;

// Get Todos
router.get('/todos', function(req, res, next) {
    Todo.find(function(err, todos) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting todos.'
            });
        }
        return res.json(todos);
    });
});

// Get a single Todo
router.get('/todos/:id', function(req, res, next) {
    var promise = Todo.findById(req.params.id).exec();
    promise.then(function(todo) {
            return res.json(todo);
        })
        .catch(function(err) {
            return res.status(500).json({
                message: 'Error getting todo.'
            });
        });
});

// Save Todo
router.post('/todos', function(req, res, nex) {
    var todo = req.body;

    if (!todo.title || !(todo.isCompleted + '')) {
        return res.status(500).json({
            message: 'Invalid data.'
        });
    }
    var newTodo = new Todo({ title: todo.title, isCompleted: false });
    var error = newTodo.validateSync();
    if (error) {
        return res.status(500).json({
            message: error.errors['title'].message
        });
    }
    newTodo.save().then(function(result) {
        return res.json(result);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Saving failed.'
        });
    });

});

// Update Todo
router.put('/todos/:id', function(req, res, next) {
    Todo.findById(req.params.id, function(err, todo) {
        if (err) {
            return res.status(500).json({
                message: 'Error getting todo.'
            });
        }
        todo.title = req.body.title;
        todo.isCompleted = req.body.isCompleted;
        var error = todo.validateSync();
        if (error) {
            return res.status(500).json({
                message: error.errors['title'].message
            });
        }
        todo.save(function(err, todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Saving failed.'
                });
            }
        });
        return res.json(todo);
    });
});

// Get a single Todo
router.delete('/todos/:id', function(req, res, next) {
    var promise = Todo.findById(req.params.id).exec();
    promise.then(function(todo) {
            todo.remove(function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        })
        .catch(function(err) {
            return res.status(500).json({
                message: 'Error getting todo.'
            });
        });
});

module.exports = router;