import app from './app.js';
import config from './config/index.js';
import connectionToDB from './config/dbConnection.js';

app.listen(config.port, async () => {
    await connectionToDB();
    console.log("App running at port", config.port);
})