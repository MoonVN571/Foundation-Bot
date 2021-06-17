const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "offlines",
    aliases: ['os', 'off'],

    async execute(client, message, args) {
        const say = args.join(" ");
		 
		if(!client.team && !client.all) {
			return message.channel.send("Bạn không có role tên **" + team.name + "**.").then(msg => {
				msg.delete({ timeout: 10000 });
			});
		}

		if (!args[0]) return message.channel.send(`Cung cấp lí do! - ` + '`' + prefix + '`off [lí do và thời gian]`').then(msg => {
			msg.delete({ timeout: 10000 });
		});

		message.channel.send("Đã báo cáo thành công!").then(msg => {
			msg.delete({ timeout: 10000 });
		});

		// offline channel
		let channel = client.channels.cache.get("793454375438778369");

		const embed = new MessageEmbed()
					.setColor(color)
					.setTitle('[Offlines]')
					.setDescription(`**${message.author.username}**: ${say}`)
					.setFooter(footer)
					.setTimestamp();

		await channel.send(embed);
    }
}