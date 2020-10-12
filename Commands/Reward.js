const Discord = require("discord.js");
const Database = require("../Helpers/Database");
// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("izniniz yok.");
    if(args.length != 2) return message.reply("eksik argümanlar.");
    
    var roleId = args[0], targetInvite = Number(args[1]);
    if(!message.guild.roles.cache.has(roleId)) return message.reply("böyle bir rol yok.");
    if(isNaN(targetInvite)) return message.reply("geçersiz numara");

    const db = new Database("./Servers/" + message.guild.id, "Rewards");

    var rewards = db.get("rewards") || [];
    rewards.push({
        Id: roleId,
        Invite: targetInvite
    });

    db.set("rewards", rewards);
    message.reply("yeni bir ödül başarıyla eklendi.");
};

exports.conf = {
    commands: ["reward"],
    usage: "[p]reward <roleId> <count>",
    enabled: true,
    guildOnly: true
};