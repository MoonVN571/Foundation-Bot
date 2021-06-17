const Discord = require('discord.js')

module.exports = {
    name: "tempmute",
    description: "ban",
    aliases: ['mute'],
    
    async execute(client, message, args) {
        const color = client.config.color;
        var footer = client.config.footer;

        const cancelexecute = new Discord.MessageEmbed()
                .setDescription(`Bạn không thể dùng được lệnh này.`)
                .setColor(color);
            
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
                return message.channel.send(cancelexecute).then(msg => {
                    msg.delete({ timeout: 10000 });
                });
        
        let member = message.mentions.members.first();
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        var reason = args.slice(1).join(" ");

        if(reason == "") reason = "None";

        var embed = new Discord.MessageEmbed()
                    .setTitle("Thông báo")
                    .setDescription("Bạn đã bị mute tại ``FDT Team``" + ". Lí do: " + reason)  
                    .setColor(color)
                    .setFooter(footer)
                    .setTimestamp();

        member.send(embed)

        member.roles.add(role).then(() => {
            message.channel.send("Đã mute " + member.user.username + ". Với lí do: " + reason)
        }).catch(console.error);
    },
}