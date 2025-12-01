import dotenv from 'dotenv';
// Load .env variables
dotenv.config();

dotenv.config({ path: __dirname + '../env' });

import 'reflect-metadata';
import express,{Request, Response} from 'express';
import { AppDataSource } from './config/ormconfig';
import userRoutes from './routes/user.routes';

import serviceRoute from './routes/service.routes';


// Create Express app
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/service', serviceRoute);


app.get('/',(req:Request,res:Response)=>{
  res.json("HELLO")
})

// Start server after DB connection
AppDataSource.initialize()
  .then(() => {
    console.log('✅ MySQL Database connected');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('❌ Error connecting to the database:', error);
  });
