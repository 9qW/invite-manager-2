const Discord = require("discord.js");
const Database = require("../Helpers/Database");
// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("izniniz yok.")
    if(args.length <= 0) return message.reply("argument error");
    
    var arg = args[0].toLocaleLowerCase();
    var types = ["leaveMessage", "welcomeMessage", "Channel", "defaultMessage"];

    var type = types.find(_type => _type.toLocaleLowerCase() == arg);
    if(!type) return message.reply("sadece şunları kullanabilirsin `leaveMessage`, `welcomeMessage`, `Channel` ve `defaultMessage` parameters.");

    const db = new Database("./Servers/" + message.guild.id, "Settings");
    db.set(`settings.${type}`, args.splice(1).join(" "));

    message.reply(`Değer başarıyla oluşturuldu ${type}.`);
};

exports.conf = {
    commands: ["options"],
    usage: "[p]options <type> <value>",
    enabled: true,
    guildOnly: true
};