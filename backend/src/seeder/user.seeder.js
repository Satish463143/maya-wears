const bcrypt = require("bcryptjs")
require("../config/db.config")
const { UserRoles, Status } = require("../config/constants.config")
const UserModel = require("../modules/user/user.model")
 
const adminUser =[
    {
        name:"Atish Mahato",
        email:"mahatoatish25@gmail.com",
        password: bcrypt.hashSync("@!Admin@123",10),
        role:UserRoles.ADMIN,
        status:Status.ACTIVE
    }
]

const seedUser = async () => {
    try {
        // Use Promise.all to handle asynchronous mapping
        await Promise.all(
            adminUser.map(async (user) => {
                const userExisting = await UserModel.findOne({ email: user.email });
                if (!userExisting) {
                    const userObj = new UserModel(user);
                    await userObj.save();
                }
            })
        );
        process.exit(1)
    } catch (exception) {
        console.log(exception);
    }
};

seedUser()
