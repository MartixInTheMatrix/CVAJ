
module.exports = async (Client, member) => {
    if(member.user.bot)return;
    if(! await Client.getUser(member)){
        Client.createUser(member)
    }

    let d = '';
    let bool = true;
    if(member.user.createdAt - Date.now() < 1000 * 60 * 60 * 24 * 7){
        d = d + `\n\n> L'utilisateur a un compte trop récent, compte créé le \`${member.user.createdAt}\``
        bool = false
    }
    let data = await Client.getUser(member)
    if(data){
        if(data.muted){
            d = d + `\n\n> L'utilisateur a rejoint alors qu'il est muet sur le serveur`
            bool = false
        }
    
        if(data.kick > 0){
            d = d + `\n\n> L'utilisateur a eu \`${data.kick} kick(s)\` sur le serveur`
            bool = false
        }
    
        if(data.warns > 0){
            d = d + `\n\n> L'utilisateur a eu \`${data.warns} warn(s)\` sur le serveur`
            bool = false
        }
    }
    
    if(!bool){
        Client.log(member.guild.members.cache.get(member.id).displayName +' a rejoint le serveur', `J'ai détecté quelques problèmes sur son compte, ` + d)
    }else{
        Client.log(member.guild.members.cache.get(member.id).displayName +' a rejoint le serveur', `Aucun problème détecté !`)
    }
    
}
