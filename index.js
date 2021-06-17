const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client();
client.commands = new Collection();

// const config = require("./config.json");

require('dotenv').config();

var config = {
    color: "0xB0B0B0",
    prefix: "%",
    logger: "854544314495533076",
    footer: "FDT Bot",
    token: process.env.TOKEN
};

client.config = config;

const fs = require('fs');

client.on('ready', () => {
    console.log('Ready with ' + client.channels.cache.size + " channels and " + client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) + " users.");

    client.user.setStatus("dnd").then(() => {    
        client.user.setActivity("FOUNDATION", {type: 'WATCHING'});  
    });

    // load commands
    const cmds = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
    for (const file of cmds) {
        const cmd = require(`./commands/${file}`);

        client.commands.set(cmd.name, cmd);
    }
});

client.on('guildMemberAdd', (member) => {
    if(member.user.bot) return;

    client.channels.cache.get('756029760047677492').send(`${member.user}, welcome to FDT Team!`).catch(
        e => client.channels.cache.get('854899174474776576').send(("Send join debug: " + e))
    );
    setTimeout(() => {
        var embed = new MessageEmbed()
                        .setTitle("FDT Team")
                        .setDescription("Chào mừng bạn đã đến với **Foundation**!\n\n")
                        .setTimestamp();

        member.user.send(embed).catch(e => client.channels.cache.get('854899174474776576').send("Member add debug: " + e));
    }, 1 * 1000);
});

client.on('guildMemberRemove', (member) => {
    client.channels.cache.get('854899174474776576').send(`${member.user.tag} đã thoát!`).catch(
        e => client.channels.cache.get('854899174474776576').send(("Send leave debug: " + e))
    );
});

client.on("message", message => {
    if (message.author.bot || message.channel.type == "dm" || message.author == client.user) return;

	// Auto react infor
	if(message.channel.id === '792631698147377192') {
		const up = client.emojis.cache.find(emoji => emoji.name === "up");
		const down = client.emojis.cache.find(emoji => emoji.name === "down");

		if(all) return;

		message.react(up).then(() => {
            message.react(down);
        });
	}

	// Verify react
	if (message.author.id === '425599739837284362') {
		const verify = client.emojis.cache.find(emoji => emoji.name === "verify");
		message.react(verify);
	}

    if(!message.content.startsWith(config.prefix)) return
  
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = client.commands.get(cmdName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmd) return;
	
    let star = message.guild.roles.cache.find(r => r.id === '758298370535587861');
	let dot = message.guild.roles.cache.find(r => r.id === '792019422264819723');
	let commander = message.guild.roles.cache.find(r => r.id === '760489374545739787');

	// Team
	let team = message.member.roles.cache.find(r => r.id === '758327218140610610');

	let all = star || dot || commander;

    client.star = star;
    client.dot = dot;
    client.commander = commander;
    client.team = team;
    client.all = all;
    
	client.footer = config.footer;
	client.color = config.color;
	client.prefix = config.prefix;

    message.channel.startTyping();

    try{
        cmd.execute(client, message, args);
    }catch(err) {
        message.channel.stopTyping();
        client.channels.cache.get('854899174474776576').send(Command + " " + cmdName + " error : " + err);
    }
});

client.login(config.token);