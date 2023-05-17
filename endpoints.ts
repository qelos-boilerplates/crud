import {createCrud} from '@qelos/plugin-play'
import {ResponseError} from '@qelos/plugin-play';
import {collections} from './services/db';
import {ObjectId} from 'mongodb';

const todos = collections.todos;

createCrud({
  display: {
    name: 'todo'
  },
  verify: async (req) => {
    if (!req.user.roles.includes('paying_customer')) {
      throw new ResponseError('please pay first');
    }
  },
  readOne: (_id, { user }) => todos.findOne({_id: new ObjectId(_id), user: user._id}),
  createOne: async (body, { user }) => {
    const data: any = {...body, user: user._id};
    const res = await todos.insertOne(data);
    data._id = res.insertedId;
    return data;
  },
  readMany: (query, { user }) => todos.find({user: user._id, title: new RegExp(query.q as string, 'i')}).toArray(),
  updateOne: (_id, body, { user }) => todos.updateOne({_id: new ObjectId(_id), user: user._id}, { $set: body}),
  deleteOne: (_id, { user }) => todos.deleteOne({_id: new ObjectId(_id), user: user._id})
})