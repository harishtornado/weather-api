import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

const API_KEY = process.env.API_KEY;

app.get("/weather/:params", async (req, res) => {
  const city = req.params;
  if (!city) {
    return res.status(400).json({ error: "City parameter is missing." });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.params}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data from OpenWeatherMap.");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
