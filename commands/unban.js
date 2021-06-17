module.exports = {
    name: "unban",
    aliases: ['ub'],
    
    async execute(client, message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({embed: {
                description: "Bạn không có quyền để dùng lệnh này",
                color: client.config.color
            }})
        }
        
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {
            description: "Bot không có quyền để bỏ cấm.",
            color: client.config.color
        }});

        if(!args[0]) return message.channel.send({embed: {
            description: "Bạn cần nhập ID người dùng.",
            color: client.config.color
        }})

        let userID = args[0]
        msg.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return 
            let bUser = bans.find(b => b.user.id == userID);

            if(!bUser) return message.channel.send({embed: {
                description: "Không tìm thấy người dùng này."
                ,color: client.config.color
            }});

            message.guild.members.unban(bUser.user).catch(() => message.channel.send({embed: {
                description: "Người dùng không có trong danh sách cấm."
                ,color: client.config.color
            }}));
        });

    }
}