var { MessageEmbed } = require('discord.js')

module.exports = {
    name: "reload",
    aliases: ['rl'],
    
    async execute(client, message, args) {
		var noPerm = new MessageEmbed()
							.setDescription('Bạn phải là nhà phát triển để sử dụng lệnh này.')
							.setColor('0xC51515');

		if(message.author.id !== "425599739837284362")
			return message.channel.send(noPerm);

			delete require.cache[require.resolve(`../commands/${args[0]}.js`)];

		const cmd = require(`../commands/${args[0]}`);
		client.commands.set(cmd.name, cmd);
		

		var successful = new MessageEmbed()
							.setDescription(`Command ${args[0]} reloaded.`)
							.setColor(0x2EA711);

		message.channel.send(successful)
    }
}