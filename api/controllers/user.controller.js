const User = require("../models/user.module");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
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
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({
        message: "Đã xảy ra lỗi",
      });

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          token,
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            fullName: user.firstName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Sai mật khẩu",
        });
      }
    } else {
      return res.status(404).json({
        message: "Email không tồn tại!",
      });
    }
  });
};

exports.updateUser = (req, res) => {
  User.updateOne({ _id: req.user._id }, req.body, { new: true }).exec(
    (error, user) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      }
      if (user) {
        return res.status(201).json({
          message: "Cập nhật thành công",
        });
      }
    }
  );
};
