const Discord = require("discord.js");
const client = new Discord.Client();

const footer = "Revolution 2021";
const color = "0xB0B0B0";

const prefix = "%";

const token = require('dotenv').config();

const config = {
  token: process.env.token
};

client.on('ready', () => {
	console.log('Bot is online!');
	client.user.setActivity(prefix + "help for commands!", {type: 'LISTENING'});
});

client.on("message", async message => {
	// Bots
	if(message.author.bot) return;
	if(message.author == client.user) return;


	// must be here to cancel prefix
	if(!message.content.startsWith(prefix)) return;

	// Warning command
	if(command === 'warn') {
		if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(cancelexecute).then(msg => {
				msg.delete({ timeout: 10000 });
			});

		const usernotfound2 = new Discord.MessageEmbed()
				.setDescription(`Không tìm thấy user. - ` + '`' + prefix + 'warn [NAME] [REASON]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const noYourSelf = new Discord.MessageEmbed()
				.setTitle("[Warn Command]")
				.setDescription(`Không thể gán cảnh cáo cho bản thân.`)
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const noWarnBot = new Discord.MessageEmbed()
				.setTitle("[Warn Command]")
				.setDescription(`Không thể gán cảnh cáo bot.`)
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const noArgs = new Discord.MessageEmbed()
				.setTitle("[Warn Command]")
				.setDescription(`Bạn cần nhập thông tin. ` + '`' + prefix + 'warn [NAME] [REASON]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const user = message.mentions.members.first();
		
		// with warn no args
		if(!args[0]) {
			return message.channel.send(noArgs).then(msg => {
				message.delete({ timeout: 10000 });
			});
		}

		if(!user) {
			return message.channel.send(usernotfound2).then(msg => {
				msg.delete({ timeout: 10000 });
			})
		}

		const reason = args.slice(1).join(" ");
    
		const nonSuccess = new Discord.MessageEmbed()
				.setTitle("[Warn Command]")
				.setDescription(`Bạn phải cung cấp lý do. ` + '`' + prefix  + 'warn [NAME] [REASON]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		if(!reason) {
			return message.channel.send(nonSuccess).then(msg => {
				msg.delete({ timeout: 10000 });
			});
		}

		const warningAUser = new Discord.MessageEmbed()
				.setTitle("[Warn]")
				.setDescription(`Bạn đã nhận được 1 cảnh cáo, với lý do: **${reason}**. Xem thêm tại ${moderator.toString()}`)
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const success = new Discord.MessageEmbed()
				.setTitle("[Warn Command]")
				.setDescription(`**${message.author.username}** đã cảnh cáo **${message.mentions.users.first().tag}** với lý do: **${reason}**`)
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const successful = new Discord.MessageEmbed()
						.setColor(color)
						.setTitle('[Warn]')
						.setDescription(`Cảnh cáo được thực hiện bởi **${message.author.username}**`)
						.addField(`User bị cảnh cáo`, `${message.mentions.users.first().tag}`)
						.addField(`Lý do`, `${reason}`)
						.setFooter(footer)
						.setTimestamp();

		// send user
		user.send(warningAUser);

		await message.channel.send(success).then(msg => {
			moderator.send(successful);
			msg.delete({ timeout: 10000 });
		});

		setTimeout(function() {
			message.delete();
		}, 10000);
		
	}

	// off command
	if(command === "off") {
		const say = args.join(" ");
		 
		if(!team && !all) {
			return message.channel.send("Bạn không có role tên **" + team.name + "**.").then(msg => {
				msg.delete( { timeout: 10000 });
			});
		}

		if (!args[0]) return message.channel.send(`Cung cấp lí do! - ` + '`' + prefix + '`off [lí do và thời gian]`').then(msg => {
			msg.delete({ timeout: 10000 });
		});

		message.channel.send("Đã báo cáo thành công!").then(msg => {
			msg.delete({ timeout: 10000 });
		});

		setTimeout(() => {
			message.delete();
		}, 10 * 1000);

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

	// Ban Command
	if(command === "ban") {
		if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
			return message.channel.send(cancelexecute);

		if(!args[0]) return;

		var reason = args.join(" ").slice(22) || "None";
		const user = message.mentions.users.first();

		const usernotfound2 = new Discord.MessageEmbed()
				.setTitle("[Ban Command]")
				.setDescription(`Không tìm thấy user. ` + '`' + prefix  + 'ban [NAME] [REASON]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		if(args[1]) {
			const embed = new Discord.MessageEmbed()
						.setColor(color)
						.setTitle('[Ban]')
						.setDescription(`Bạn đã bị cấm khỏi server. Với lý do: **${reason}**`)
						.setFooter(footer)
						.setTimestamp();

			user.send(embed);
				
		}
			
		if(user) {
			const member = message.guild.member(user);

			const embed = new Discord.MessageEmbed()
					.setColor(color)
					.setTitle('[Ban Command]')
					.setDescription(`Đã chặn **${user.tag}** ra khỏi server. Với lý do: **${reason}**`)
					.setFooter(footer)
					.setTimestamp();
				 
			if(member) {
				member.ban().then((member) => {
					// do it
					const successful = new Discord.MessageEmbed()
									.setColor(color)
									.setTitle('[Ban]')
									.setDescription(`User đã bị cấm bởi **${message.author.username}**`)
									.addField(`User đã bị cấm`, `${member.user.tag}`)
									.addField(`Lý do`, `${reason}`)
									.setFooter(footer)
									.setTimestamp();
					message.channel.send(embed).then(msg => {
						msg.delete({ timeout: 10000 });
						moderator.send(successful);

						// send author
						message.author.send(`*${member.user.id}*`);
						message.author.send(`ID này sẽ cần dùng bỏ chặn cho **${user.tag}**`);
					})
				}).catch(() => {
					message.channel.send(cancelexecute).then(msg => {
						message.delete(10000); // 10 seconds
					});
				});
			} else {
				message.channel.send(usernotfound2).then(msg => {
						message.delete(10000); // 10 seconds
				});
			}
		}
		 
	}

	// unban
	if(command === "unban") {
		const whoBanning = new Discord.MessageEmbed()
						.setColor(color)
						.setTitle('[Unban Command]')
						.setDescription(`Bạn cần id user hoặc user#id để bỏ cấm user. ` + '`' + prefix  + 'unban [NAME]`')
						.setFooter(footer)
						.setTimestamp();

		let User = args[0];
		let Reason = args.slice(1).join(` `);

		if (!User) return message.channel.send(whoBanning).then(msg => {
			msg.delete({ timeout: 10000 });
		});

		if (!Reason) Reason = `Unbanned by ${message.author.tag}`;

		const usernotfound = new Discord.MessageEmbed()
				.setTitle("[Unban Command]")
				.setDescription(`Không tìm thấy user. - ` + '`' + prefix  + 'unban [NAME]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const embed = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle('[Ban Command]')
				.setDescription(`Đã bỏ cấm **${User}** thành công!`)
				.setFooter(footer)
				.setTimestamp();
		
		// trying unbaning, add try
		message.guild.fetchBans().then(bans => {
			if (bans.some(u => User.includes(u.username))) {
				let user = bans.find(user => user.username === User);

				message.guild.unban(user.id, Reason);

				message.channel.send(embed).then(msg =>{
					msg.delete({ timeout: 10000 });
				});
			} else if (bans.some(u => User.includes(u.id))) {

				message.guild.unban(User, Reason);

				message.channel.send(embed).then(msg =>{
					msg.delete({ timeout: 10000 });
				});

			} else {
				return message.channel.send(usernotfound2);
			}
		});

		setTimeout(function() {
			message.delete();
		}, 10000);
		
	}

	// Kick command
	if(command === "kick") {
		if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
            return message.channel.send(cancelexecute);

		const usernotfound = new Discord.MessageEmbed()
				.setTitle("[Kick Command]")
				.setDescription(`Không tìm thấy user. - ` + '`' + prefix  + 'kick [NAME] [REASON]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const notaguser = new Discord.MessageEmbed()
				.setTitle("[Kick Command]")
				.setDescription(`Bạn cần tag user. - ` + '`' + prefix  + 'kick [NAME] [REASON]`')
				.setColor(color)
				.setFooter(footer)
				.setTimestamp();

		const cannotkick = new Discord.MessageEmbed()
						.setTitle("[Kick Command]")
						.setDescription(`Không thể kick user này.`)
						.setColor(color)
						.setFooter(footer)
						.setTimestamp();

		const user = message.mentions.users.first();

		var reason = args.join(" ").slice(22) || "None";

		if(args[1]) {
			const embed = new Discord.MessageEmbed()
						.setColor(color)
						.setTitle('[Kick]')
						.setDescription(`Bạn đã bị kick khỏi server. Với lý do: **${reason}**`)
						.setFooter(footer)
						.setTimestamp();
			user.send(embed);
				
		}

		if(user){
			const member = message.guild.member(user);

			const embed = new Discord.MessageEmbed()
					.setColor(color)
					.setTitle('[Kick Command]')
					.setDescription(`Đã kick **${user.tag}** ra khỏi server. Với lý do: **${reason}`)
					.setFooter(footer)
					.setTimestamp();

			if(member){
				member.kick().then(() =>{
					// do it
					message.channel.send(embed);
				}).catch(err =>{
					message.channel.send(cannotkick).then(msg => {
					message.delete({ timeout: 10000});
					});
				});
			} else {
				message.channel.send(usernotfound).then(msg => {
					message.delete({ timeout: 10000});
				});
			}
		} else {
			message.channel.send(notaguser).then(msg => {
					message.delete({ timeout: 10000});
			});
		}

		setTimeout(function() {
			message.delete();
		}, 10000);
	}

	// Help command
    if(command === "help") {
        const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle('[Help Command]')
                    .addField("*[Help Command]*", prefix + 'help', false)
                    .addField("*[Kick Command]*", prefix + 'kick', false)
					.addField("*[Ban Command]*", prefix + 'ban', false)
					.addField("*[Warn Command]*", prefix + 'warn', false)
                    .addField("*[Off Command]*", prefix + 'off', false)
                    .setFooter(footer)
                    .setTimestamp();
        message.channel.send(embed).then(message => {
            message.delete({ timeout: 10000 });
        });

	}
	
	setTimeout(function() {
		message.delete();
	}, 10000);
});

client.on("error", (e) => console.error(e));
client.login(config.token);
