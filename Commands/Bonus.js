const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("izniniz yok.");

    var victim = message.mentions.members.size > 0 ? message.mentions.members.first().id : args.length > 0 ? args[0] : undefined;
    if(!victim) return message.reply("kimseden bahsetmedin.");
    victim = message.guild.member(victim);
    if(!victim) return message.reply("bahsettiğiniz üye sunucuda olmalıdır.");

    var num = Number(args[1]);
    if(isNaN(num)) return message.reply("valid number.");
    const db = new Database("./Servers/" + message.guild.id, "Invites");

    var bonus = (db.add(`invites.${victim.id}.bonus`, num) || 0), total = (db.get(`invites.${victim.id}.total`) || 0);
    message.reply(`${num} bonuslar başarıyla şu kullanıcıya ${victim} eklendi.`);

    global.onUpdateInvite(victim, message.guild.id, total + bonus);
};

exports.conf = {
    commands: ["bonus"],
    usage: "[p]bonus <kullanıcı> <değer>",
    enabled: true,
    guildOnly: true
};