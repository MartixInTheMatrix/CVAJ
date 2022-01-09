
module.exports = async (Client, message) => {
    if(message.member.user.bot)return;
    if(! await Client.getUser(message.member)){
        Client.createUser(message.member)
    }

}
