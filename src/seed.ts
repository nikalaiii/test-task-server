import { connect, disconnect, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema } from './users/user.schema';
import { ItemSchema } from './items/item.schema';

const User = model('User', UserSchema);
const Item = model('Item', ItemSchema);

async function seed() {
  await connect(process.env.MONGODB_URI!);

  // Remove existing data
  await User.deleteMany({});
  await Item.deleteMany({});

  // Create users
  const users = await User.insertMany([
    { login: 'alice', password: await bcrypt.hash('password1', 10) },
    { login: 'bob', password: await bcrypt.hash('password2', 10) },
  ]);

  // Create items
  await Item.insertMany([
    { title: 'Item 1', description: 'First item', owner: users[0]._id },
    { title: 'Item 2', description: 'Second item', owner: users[1]._id },
    { title: 'Item 3', description: 'Third item', owner: users[0]._id },
  ]);

  await disconnect();
  console.log('Seed complete!');
}

seed(); 