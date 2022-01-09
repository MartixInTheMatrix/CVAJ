
module.exports = async (Client, guild, member) => {
    if(Client.getUser(member)){
        await Client.deleteUser(member)

    }
}
