const { Router } = require('express')
const router = Router()
const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');
const sensors = require('../models/sensor')(sequelize, Sequelize.DataTypes)
const csensor = require('../models/controller_sensor')(sequelize, Sequelize.DataTypes)
// ei ole andmeid
const dataSensor = require('../models/datasensor')(sequelize, Sequelize.DataTypes)

// связываем модели
sensors.hasMany(csensor, { foreignKey: 'id_sensor' });
csensor.belongsTo(sensors, { foreignKey: 'id_sensor' });

// võtame andmed ruumide kohta
router.get('/rooms', async (req,res) => {
  csensor.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('room')), 'room']]
  }).then((result) => res.json(result))
})

// võtame andmed mis andurid on ruumis
router.get('/room/:room/sensors', async (req, res) => {
  const roomNum = req.params.room;
  sensors.findAll({
    where: {},
    attributes: ['id', 'sensorname'],
    include: [{
      model: csensor,
      where: { room: roomNum },
      attributes: []
    }]
  }).then((result) => res.json(result))
})

module.exports = router
