const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unmute",
    aliases: ['um'],
    
    async execute(client, message, args) {
        var color = client.config.color;
        var footer = client.config.footer;

        const cancelexecute = new MessageEmbed()
                .setDescription(`Bạn không thể dùng được lệnh này.`)
                .setColor(color);
                
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
                return message.channel.send(cancelexecute);
        
        let member = message.mentions.members.first();
        let role = message.guild.roles.cache.find(r => r.name === "Muted");

        var embed = new MessageEmbed()
                    .setTitle("Thông báo")
                    .setDescription("Bạn đã hết bị cấm chat tại ``FDT Team``.")  
                    .setColor(color)
                    .setFooter(footer)
                    .setTimestamp();

        member.send(embed);

        member.roles.remove(role).then(() => {
            message.channel.send("Đã bỏ cấm chat cho **" + member.user.username + "**.")
        }).catch(console.error);
    },
}