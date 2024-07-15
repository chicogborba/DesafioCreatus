import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import placeRoutes from "./routes/placeRoutes"
import userRoutes from "./routes/userRoutes";
import pdfRoutes from "./routes/pdfRoutes";
import awsRoutes from "./routes/awsRoutes";

dotenv.config();
const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
// app.use("/", movieRoutes);
// app.use("/", postsRoutes);
// app.use("/", userRoutes);
// app.use("/", arduinoRoutes);
// app.use("/", sseRoutes);
app.use("/", placeRoutes);
app.use("/", userRoutes);
app.use("/", pdfRoutes);
app.use("/" , awsRoutes)
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running on 18.231.43.54:3000`);
});