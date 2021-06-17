const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    aliases: [''],
    
    async execute(client, message, args) {
        var color = client.config.color;

        const cancelexecute = new MessageEmbed()
                .setDescription(`Bạn không thể dùng được lệnh này.`)
                .setColor(color);
        
        if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(cancelexecute);

        const deleteCount = parseInt(args[0], 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 999)
            return message.reply("bạn cần nhập số tin nhắn cần xoá.");

        message.channel.bulkDelete(deleteCount).catch(error => {
            message.reply(`không thể xoá tin nhắn. Kiểm tra console.`);
            console.log(error);
        });

        message.delete();
    },
}