const express = require("express");
const app = express();

const PORT = 7575;
app.listen(PORT, () => {
  console.log(`The Server is running at PORT: ${PORT}`);
});
