
module.exports = async (Client, message) => {
    if(!Client.getUser(message.member)){
        await Client.createUser(message.member)

    }

}
