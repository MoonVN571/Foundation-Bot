const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "kick",
    description: "ban",
    aliases: [''],
    
    async execute(client, message, args) {
        var color = client.config.color;
        var footer = client.config.footer;

        let cancelexecute = new MessageEmbed()
                .setDescription(`Bạn không thể dùng được lệnh này.`)
                .setColor(color);

        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
                    return message.channel.send(cancelexecute);

        const user = message.mentions.users.first();

        var reason = args.join(" ").slice(22) || "None";

        if(user){
            const member = message.guild.member(user);

            if(member){
                let dmEmbed = new MessageEmbed()
                            .setColor(color)
                            .setDescription(`Bạn đã bị đá khỏi server. Lí do: **${reason}**`)
                            .setFooter(footer)
                            .setTimestamp();

                user.send(dmEmbed);

                setTimeout(() => {
                    member.kick().then(() =>{
                        const embed = new MessageEmbed()
                                    .setColor(color)
                                    .setDescription(`Bạn đã đá **${user.tag}** ra khỏi server. Lí do: **${reason}`)
                                    .setFooter(footer)
                                    .setTimestamp();

                        message.channel.send(embed);
                    }).catch(err =>{
                        let embed = new MessageEmbed()
                                        .setDescription(`Không thể đá người dùng này.`)
                                        .setColor(color)
                        
                        message.channel.send(embed);
                    });
                }, 3 * 1000);
            } else {
                let embed = new MessageEmbed()
                    .setDescription('Không tìm thấy người dùng này.')
                    .setColor(color);

                message.channel.send(embed);
            }
        } else {
            let embed = new MessageEmbed()
                    .setDescription('Bạn cần nhập tên người dùng.')
                    .setColor(color)

            message.channel.send(embed);
        }
    },
};