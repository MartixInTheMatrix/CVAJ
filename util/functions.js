const discord = require('discord.js')
const config = require('./config')
const userSchema  = require("../models/user");

module.exports = Client => {
    Client.error = (error)=>{
        let embed = new discord.MessageEmbed()
        .setAuthor('Erreur !', 'https://cdn.discordapp.com/attachments/928598025675358228/928598045107556382/x.png')
        .setDescription('**'+error+'**')
        .setTimestamp()
        .setColor('RED')

        return embed
    }

    Client.success = (success)=>{
        let embed = new discord.MessageEmbed()
        .setAuthor('Succès !', 'https://cdn.discordapp.com/attachments/928598025675358228/928598077617635388/check.png')
        .setDescription('**'+success+'**')
        .setTimestamp()
        .setColor('GREEN')

        return embed
    }

    Client.log = (logTitle, log)=>{
        let logChannel = Client.channels.cache.get(config.logID)

        let embed = new discord.MessageEmbed()
        .setAuthor(logTitle, 'https://cdn.discordapp.com/attachments/928598025675358228/928600153206685706/info.png')
        .setDescription('**'+log+'**')
        .setTimestamp()
        .setColor('#5865F2')

        logChannel.send({embeds:[embed]})
    }

    Client.alert = (user, alert)=>{
        let member = Client.guilds.cache.get(config.guildID).members.cache.get(user.id)
        let embed = new discord.MessageEmbed()
        .setAuthor('Attention !', 'https://cdn.discordapp.com/attachments/928598025675358228/928604081264689222/warning.png')
        .setDescription('**'+alert+'**')
        .setTimestamp()
        .setColor('YELLOW')
        member.send({embeds:[embed]})
    }

    Client.warning = (warning)=>{

        let embed = new discord.MessageEmbed()
        .setAuthor('Attention !', 'https://cdn.discordapp.com/attachments/928598025675358228/928604081264689222/warning.png')
        .setDescription('**'+warning+'**')
        .setTimestamp()
        .setColor('YELLOW')

        return embed
    }

    Client.convertDate = inputFormat => {

        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    
    Client.createUser = async member => {

        const userCreated = new userSchema({
            userID:`${member.id}`,
            warns: 0,
            warnsArray:[{date:'base', raison:'base'}],
            level: 0
        });
            userCreated.save().then(m => console.log(`BotLog :  Nouvel utilisateur -> ${member.user.username}`));
            return Client.getUser(member)
        };
    
        Client.deleteUser = async member => {
            userSchema.findOneAndDelete({ userID : member.id }).then(console.log(`BotLog : Utilisateur supprimé -> ${member.user.username}`));
        };
        
        Client.getUser = async member => {
            const data = await userSchema.findOne({ userID: member.id });
            if (data) return data;
            else return false;
        };
        
        Client.updateUser = async (member, settings) => {
            let data = await Client.getUser(member);
            if(typeof data !== "object") data = {};
            for(const key in settings) {
                if(data[key] !== settings[key]) data[key] = settings[key];
            };
            return data.updateOne(settings);
        };
}