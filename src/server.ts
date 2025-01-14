import app from "./app";
import fs from "fs";
import https from "https";
import { PORT } from "./config/envConstants";

// const options = {
//   key: fs.readFileSync("certs/key.pem"),
//   cert: fs.readFileSync("certs/cert.pem"),
// };

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server running on https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  return console.log(`Server is running on http://localhost:${PORT}`);
});
