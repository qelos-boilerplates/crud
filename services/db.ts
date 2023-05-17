import {Condition, MongoClient, ObjectId, ServerApiVersion} from 'mongodb';
import {logger} from '@qelos/plugin-play';

const uri = process.env.MONGODB_URL || 'mongodb://localhost/db';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

type Doc<T> = Omit<T, '_id'> & {
  _id?: Condition<ObjectId> | string;
}

export const collections = {
  todos: client.db().collection<Doc<any>>('todos'),
}

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db().command({ping: 1});

    await collections.todos.createIndex({user: 1});

    logger.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {

  }
}

run().catch(process.exit);
