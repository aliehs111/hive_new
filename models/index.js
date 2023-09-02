const User = require('./User');
const Event = require('./Event');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

User.hasMany(Event, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'owner_id',
});

const UserEvent = sequelize.define('UserEvent', {
  SubscribedUserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id'
    }
  },
  SubscribedEventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    }
  }
});

User.belongsToMany(Event, {
  as: 'subscribedEvents',
  through: 'UserEvent'
});

Event.belongsToMany(User, {
  as: 'subscribedUsers',
  through: 'UserEvent'
});

module.exports = { User, Event };
