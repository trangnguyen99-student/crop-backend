const User = require("../../models/user.module");

exports.getAllUser = (req, res) => {
  User.find().exec((error, users) => {
    if (error)
      return res.status(400).json({
        message: "Đã xảy ra lỗi",
      });
    if (users) {
      const userList = users.map((user) => {
        return {
          _id: user._id,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role,
          email: user.email,
          address: user.address,
        };
      });
      res.status(200).json({
        users: userList,
      });
    }
  });
};

exports.getUserById = (req, res) => {
  User.findById({ _id: req.params.id }).exec((error, result) => {
    if (!result) {
      return res.status(404).json({
        message: "Id người dùng không tồn tại!",
      });
    }
    return result.status(200).json({
      user: result,
    });
  });
};

exports.createUser = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại",
      });
    }
    const _user = new User(req.body);

    _user.save((error, data) => {
      if (error)
        return res.status(400).json({
          message: "Đã xảy ra lỗi",
        });

      if (data)
        return res.status(201).json({
          message: "Tạo tài khoản thành công",
        });
    });
  });
}

exports.updateRole = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.id },
    { role: req.body.role },
    { new: true }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result)
      return res
        .status(201)
        .json({ message: "Cập nhật quyền người dùng thành công thành công" });
  });
};

exports.deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result)
      return res
        .status(200)
        .json({ message: "Xóa người dùng thành công thành công" });
  });
};
