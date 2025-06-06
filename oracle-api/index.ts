import express from "express";
import router from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/student", router);

app.listen(PORT, () => {
  console.log(`Oracle API running on http://localhost:${PORT}`);
});
