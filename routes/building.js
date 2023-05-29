const { Router } = require("express");
const router = Router();

const buildingDAO = require('../daos/buildingDAO');

router.post("/", async (req, res, next) => {
    const building = req.body;
    if (!building || JSON.stringify(building) === '{}' ) {
      res.status(400).send('building is required');
    } else {
      try {
        const savedBuilding = await buildingDAO.create(building);
        res.json(savedBuilding); 
      } catch(e) {
        if (e instanceof buildingDAO.BadDataError) {
          res.status(400).send(e.message);
        } else {
          res.status(500).send(e.message);
        }
      }
    }
  });

module.exports = router;