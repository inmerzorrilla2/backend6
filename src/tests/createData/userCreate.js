const User = require("../../models/User");

const userCreate = async () => {
    const user = {
        firstName: "Juan",
        lastName: "Yidi",
        email: "juan@gmail.com",
        password: "juan1234",
        phone: "+575312323"
    };

    // Pasar el objeto user al método create
    await User.create(user);
};

module.exports = userCreate;

