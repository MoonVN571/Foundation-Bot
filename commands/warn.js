const Discord = require("discord.js");

module.exports = {
    name: "warn",
    description: "ban",
    aliases: ['warning'],
    
    async execute(client, message, args) {
        var footer = client.config.footer;
        var color = client.config.color;
        var moderator = client.channels.cache.get(client.config.logger);

        const cancelexecute = new Discord.MessageEmbed()
                .setDescription(`Bạn không thể dùng được lệnh này.`);
                
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(cancelexecute).then(msg => {
            msg.delete({ timeout: 10000 });
        });

        let user = message.mentions.members.first();

        let noArgs = new Discord.MessageEmbed()
            .setDescription('Bạn phải nhập tên người dùng.')
            .setColor(color);

        if(!args[0]) return message.channel.send(noArgs);

        const noYourSelf = new Discord.MessageEmbed()
            .setDescription(`Không thể cảnh cáo cho bản thân.`)
            .setColor(color);

        if(user == message.author) return message.channel.send(noYourSelf);

        let noWarnBot = new Discord.MessageEmbed()
            .setDescription(`Không thể cảnh cáo người dùng là bot.`)
            .setColor(color);

        if(user.bot) return message.channel.send(noWarnBot)

        
        const usernotfound2 = new Discord.MessageEmbed()
            .setDescription('Không tìm thấy người dùng.')
            .setColor(color);
            
        if(!user) return message.channel.send(usernotfound2);
        
        const reason = args.slice(1).join(" ");

        const nonSuccess = new Discord.MessageEmbed()
            .setDescription('Bạn phải cung cấp lý do.')
            .setColor(color);

        if(!reason) return message.channel.send(nonSuccess)

        const warningAUser = new Discord.MessageEmbed()
            .setTitle("Thông báo")
            .setDescription(`Bạn đã nhận được 1 cảnh cáo. Lí do: **${reason}**. Xem thêm tại ${moderator.toString()}`)
            .setColor(color)
            .setFooter(footer)
            .setTimestamp();

        const success = new Discord.MessageEmbed()
            .setDescription(`**${message.author.username}** đã cảnh cáo **${message.mentions.users.first().tag}** với lí do: **${reason}**`)
            .setColor(color)

        const successful = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle('[Moderator]')
                    .setDescription(`Cảnh cáo bởi **${message.author.username}**`)
                    .addField(`Người dùng`, `${message.mentions.users.first().tag}`)
                    .addField(`Lí do`, `${reason}`)
                    .setFooter(footer)
                    .setTimestamp();

        // send user
        user.send(warningAUser);

        message.channel.send(success).then(() => {
            moderator.send(successful);
        });
    },
};