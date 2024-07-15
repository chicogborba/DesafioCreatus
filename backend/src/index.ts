import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import placeRoutes from "./routes/placeRoutes"
import userRoutes from "./routes/userRoutes";
import pdfRoutes from "./routes/pdfRoutes";
import awsRoutes from "./routes/awsRoutes";

dotenv.config();
const app = express();

app.use(cors());
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
app.listen(process.env.PORT || "3000", () => {
    console.log(`Server is running on port ${process.env.PORT || "3000"}`);
    });