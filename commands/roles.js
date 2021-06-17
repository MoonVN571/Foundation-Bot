const Discord = require('discord.js')

module.exports = {
        name: "roles",
        description: "ban",
        aliases: ['role'],
        
        execute(client, message, args) {
                var color = client.config.color;

                const cancelexecute = new Discord.MessageEmbed()
                        .setDescription(`Bạn không thể dùng được lệnh này.`)
                        .setColor(color);

                if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
                        return message.channel.send(cancelexecute)
                        
                if(args[0] == "add") {
                        if(!args[1]) return message.channel.send("Nhập id hoặc tag tên người dùng");
                        if(!args[2]) return message.channel.send("Nhập tên role.");

                        let member = message.mentions.members.first();
                        args.shift();

                        let roleName = args.join(" ").split("> ")[1];
                        let role = message.guild.roles.cache.find(r => r.name == roleName);
                        let user = message.guild.members.cache.get(member.id);

                        if(role == undefined) return message.channel.send("Không tìm thấy role.")

                        if(user.roles.cache.get(role.id))
                                return message.channel.send("Người dùng này đã có role ``" + roleName + "``.")
                        
                        member.roles.add(role)

                        message.channel.send("Đã add role ``" + roleName + "`` cho **" + member.user.username + "**.")
                }

                if(args[0] == "remove") {
                        if(!args[1]) return message.channel.send("Nhập id hoặc tag tên người dùng")
                        if(!args[2]) return message.channel.send("Nhập tên role.")

                        let member = message.mentions.members.first();
                        args.shift();

                        let roleName = args.join(" ").split("> ")[1];
                        let role = message.guild.roles.cache.find(r => r.name == roleName);
                        let user = message.guild.members.cache.get(member.id);

                        if(role == undefined) return message.channel.send("Không tìm thấy role.")
                        
                        member.roles.remove(role)

                        if(!user.roles.cache.get(role.id))
                                return message.channel.send("Người chơi không có role ``" + roleName + "``.")

                        message.channel.send("Đã xoá role ``" + rolename + "`` cho **" + member.user.username + "**.")
                }
        }
}