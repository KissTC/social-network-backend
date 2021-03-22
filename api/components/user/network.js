const express = require("express");
const secure = require('./secure');
const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();

router.get("/", (req, res) => {
  controller
    .list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.get("/:id", (req, res) => {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.post('/', (req, res) => {
    controller.insert(req.body)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        })

});

router.put('/', secure('update') ,(req, res) => {
  controller.insert(req.body)
      .then(user => {
          response.success(req, res, user, 201);
      })
      .catch((err) => {
          response.error(req, res, err.message, 500);
      })

});

module.exports = router;
