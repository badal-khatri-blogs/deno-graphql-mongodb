import db from '../../shared/mongodb.ts';
import UserInteface from './user.interface.ts';

const users = db.collection("users")

const insertUser = async (user: UserInteface) => {
    const newUserId = await users.insertOne(user);
    const newUser = await users.findOne({
        _id: newUserId
    })

    return createUserReponse(newUser)
}

const deleteUserById = async (id: string) => {
    const deletedUser = await users.deleteOne({
        _id: { "$oid": id }
    })
    if (deletedUser == 0) {
        return 'Error while deleting user'
    }
    return 'User deleted successully'
}

const getUser = async (id: string) => {
    const user = await users.findOne({
        _id: { "$oid": id }
    });
    return createUserReponse(user)
}

const getUsers = async () => {
    const allUser = await users.find();

    return allUser.map((user: any) => createUserReponse(user))
}

const createUserReponse = (user: any) => {
    return { id: user._id['$oid'], firstName: user.firstName, lastName: user.lastName } as UserInteface
}

export { insertUser, deleteUserById, getUser, getUsers }