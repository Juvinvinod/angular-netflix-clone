const User = require('../model/User');
const userModel = require('../model/User')

const getAllUser = async (req, res) => {
    try {
        let search = req.query.search || ""
        const query = {
            $or: [
                { name: { $regex: new RegExp(`^${search}`, "i") } },
                { email: { $regex: new RegExp(`^${search}`, "i") }, }
            ]
        }

        const users = await User.find(query);
        res.status(200).json({ users })

    } catch (error) {
        console.log(error);
    }
}

const getUser = async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.find({ _id: id });
        let name = user.name;
        let email = user.email;
        res.status(200).json({ name,email })

    } catch (error) {
        console.log(error);
    }
}

const editUser = async (req, res) => {
    try {

        console.log(req.body);
        const { name, email } = req.body
        await User.findOneAndUpdate({ name }, {
            email: email
        })

        res.status(200).json({ success: "updated" })

    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
        await userModel.findByIdAndDelete(id)
        res.status(200).json({ message: "user Deleted" })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllUser,
    deleteUser,
    editUser,
    getUser,
}