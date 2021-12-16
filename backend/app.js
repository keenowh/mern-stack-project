const express = require("express");

const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const app = express();
app.use(bodyParser);
app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
    if (req.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An error has occured" });
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});
