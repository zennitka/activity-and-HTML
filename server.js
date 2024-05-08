const express = require('express');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/activity', (req, res) => {
    res.json({ activity: client.user?.presence?.activities[0] || null });
});

client.once(Events.ClientReady, () => {
    console.log('Discord bot is ready');
    client.user.setActivity("test");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});

client.login('token');
