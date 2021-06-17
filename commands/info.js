var { MessageEmbed } = require('discord.js')

module.exports = {
    name: "info",
    aliases: ['i4', 'information'],
    
    async execute(client, message, args) {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }
        
        const member = message.guild.member(user);
        
        var stt = user.presence.status;

        if(stt == "idle") stt = "Chờ..";
        if(stt == "offline") stt = "Không hoạt động";
        if(stt == "online") stt = "Đang hoạt động";
        if(stt == "dnd") stt = "Không làm phiền";

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setTitle(user.tag)
            .addField("ID:", `${user.id}`, true)
            .addField("Biệt danh:", `${member.nickname !== null ? `${member.nickname}` : 'Không'}`, true)
            .addField("Trạng thái:", `${stt}`, true)
            .addField("Ngày vào Shop:", `${member.joinedAt}`, true)
            .addField("Ngày tạo Account:", `${user.createdAt}`, true) 
            .addField("Roles:", member.roles.cache.map(roles => `${roles.name}`).join(', ').replace(", @everyone", "").replace("@everyone", "None"), true)
            .setFooter(`Yều cầu: ${message.author.tag}`);

        message.channel.send({embed});
    },
};