const Discord = require("discord.js");
const client = new Discord.Client();

const fb = require("./firebase").firebase;
const firebase = require("firebase");
require("firebase/firestore");
const db = fb.firestore();

function getFirstTextChannel(guild) {
  let textChannels = guild.channels.cache.filter(
    (channel) => channel.type == "text"
  );

  return textChannels.values().next().value.id;
}

function fetchServerChannels(guild) {
  let channels = {};

  // Create Category objects in channels object
  guild.channels.cache.map((channel) => {
    if (channel.type != "category") return;

    channels[channel.id] = {
      name: channel.name,
      channels: [],
    };
  });

  // Sort channels in to the created categorys
  guild.channels.cache.map((channel) => {
    if (channel.type == "category") return;

    channels[channel.parentID].channels.push({
      name: channel.name,
      channelID: channel.id,
    });
    db.collection("messages").doc(channel.id).set({ messages: [] });
  });

  db.collection("channels").doc(guild.id).set(channels);

  return channels;
}

async function setAllServerChannels() {
  await clearCollection("channels");
  await clearCollection("messages");

  client.guilds.cache.map((guild) => {
    fetchServerChannels(guild);
  });
}

function fetchBasicServerInformation() {
  let servers = [];

  client.guilds.cache.map((guild) => {
    servers.push({
      selectedChannelId: getFirstTextChannel(guild),
      name: guild.name,
      serverID: guild.id,
      icon:
        guild.iconURL() != null
          ? guild.iconURL()
          : "https://cdn.discordapp.com/attachments/789137475233775661/835873258989027358/image0.png",
    });
  });

  return servers;
}

async function clearCollection(collection) {
  const snapshot = await db.collection(collection).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

async function addInformationToDB(collection, information) {
  await clearCollection(collection);

  information.map((info) => {
    db.collection(collection).add(info);
  });
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Every bot restart, we clear servers and add them back
  await addInformationToDB("servers", fetchBasicServerInformation());
  await setAllServerChannels();
});

client.on("message", (msg) => {
  let message = {
    authorName: msg.author.username,
    authorPFP: msg.author.avatarURL(),
    message: msg.content,
  };

  db.collection("messages")
    .doc(msg.channel.id)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });

  console.log(message);
});

client.login("DISCORD BOT TOKEN");
