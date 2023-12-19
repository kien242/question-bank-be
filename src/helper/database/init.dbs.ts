import mongoose from 'mongoose';
const connectString = `${process.env.MONGO_ATLAS_URL}/${process.env.DB_NAME}`;

class Database {
  private static instance: Database | undefined = undefined;
  constructor() {
    this.connect();
  }

  connect() {
    if (process.env.MONGO_CONSOLE === 'true') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => {
        console.log('Connected to MongoDB successfully');
        switch (mongoose.connection.readyState) {
          case 0:
            console.log('MongoDb is disconnected');
            break;
          case 1:
            console.log('MongoDb is connected');
            break;
          case 2:
            console.log('MongoDb is connecting');
            break;
          case 3:
            console.log('MongoDb is disconnecting');
            break;
        }
      })
      .catch(() => console.log('Error Connect!'));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
