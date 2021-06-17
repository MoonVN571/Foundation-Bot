var { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: [''],
    
    async execute(client, message, args) {
        var footer = client.config.footer;
        var moderator = client.channels.cache.get(client.config.logger);
        var color = client.config.color;
    
        const cancelexecute = new MessageEmbed()
                    .setDescription(`Bạn không thể dùng được lệnh này.`)
                    .setColor(client.config.color);

        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(cancelexecute)

        var reason = args.join(" ").slice(22) || "None";
        var user = message.mentions.users.first();

        let usernotfound = new MessageEmbed()
                        .setDescription('Bạn cần nhập tên người dùng để cấm.')
                        .setColor(color);
        
        if(!args[0]) return message.channel.send(usernotfound);

        if(user) {
            const member = message.guild.member(user);
                
            if(member) {
                let embed = new MessageEmbed()
                        .setDescription(`Bạn đã bị cấm khỏi server. Với lý do: **${reason}**`)
                        .setFooter(footer)
                        .setTimestamp();
        
                user.send(embed).catch(() => {});

                setTimeout(() => {
                    member.ban().then((member) => {
                        let successful = new MessageEmbed()
                                .setColor(color)
                                .setTitle('[Moderator]')
                                .setDescription(`Lệnh cấm được thực hiện bởi **${message.author.username}#${message.author.discriminator}**.`)
                                .addField(`Người dùng`, `${member.user.tag}`)
                                .addField(`Lí do`, `${reason}`)
                                .setFooter(member.user.id)
                                .setTimestamp();

                        moderator.send(successful);

                        let embed = new MessageEmbed()
                                    .setColor(color)
                                    .setDescription(`Đã cấm **${user.tag}**. Với lí do: **${reason}**`);

                        message.channel.send(embed);
                    }).catch(() => {
                        message.channel.send({ embed: {
                            description: "Bot không thể cấm người này.",
                            color: client.config.color
                        }});
                    });
                }, 3 * 1000);
            } else {
                let embed = new MessageEmbed()
                                .setDescription('Không tìm thấy người dùng này.')
                                .setColor(color);
                
                message.channel.send(embed);
            }
        }
    }
}