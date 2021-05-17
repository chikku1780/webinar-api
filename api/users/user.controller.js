'use strict';

// Global
const log = require('debug-level').log('webinar-api');
// Local
const generateId = require('../../utils/generateId.util');
// Variables
const db = {
  users: [
    {
      id: 'bff28903-042e-47c2-b9ee-07c3954989ec',
      name: 'Marco',
      ctdAt: 1558536830937,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Leonardo',
      ctdAt: 1558536843742,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Berta',
      ctdAt: 1558536863550,
    },
  ],
};

exports.getOne = async ctx => {
  const { userId } = ctx.params;
  const user = db.users.find(user => user.id === userId);
  ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = user;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = db.users;
};

exports.createOne = async ctx => {
  const { name } = ctx.request.body;
  ctx.assert(name, 400, 'The user info is malformed!');
  const id = generateId();
  const newUser = {
    id,
    name,
    ctdAt: Date.now(),
  };
  db.users.push(newUser);
  const createdUser = db.users.find(user => user.id === id);
  ctx.status = 201;
  ctx.body = createdUser;
};
