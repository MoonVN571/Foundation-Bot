const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "ban",
    aliases: [''],
    
    async execute(client, message, args) {
        var embed = new Discord.MessageEmbed()
                        .setColor(client.config.color)
                        .setDescription(
                                        `**Commands List** \nhelp, reload, kick, ban, warn, mute, clear, role, info, off.`
                                    )
        message.channel.send(embed);
    },
}