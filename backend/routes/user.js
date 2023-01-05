const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// localhost:3070/user GET
// RECIPE 불러오기 TEST
// router.get("/:sikjae", async (req, res) => {
//   // params가 포함된 이름의 sikjae 검색
//   const sikjae = req.params.sikjae;

//   const recipe = await Recipe.findAll({
//     where: {
//       foodRecipe: {
//         [Op.like]: "%" + sikjae + "%",
//       },
//     },
//   });
//   res.status(201).send(recipe);
// });

// localhost:3070/user/load GET
router.get("/load", async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
        attribute: {
          exclude: ["password"],
        },
      });
      return res.status(200).json(user);
    }
    res.status(200).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/user/login POST  || 로그인
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (serverErr, user, clientErr) => {
    if (serverErr) {
      console.error(serverErr);
      return next(serverErr);
    }

    if (clientErr) {
      return res.status(401).send(clientErr.reason);
    }

    req.login(user, async (loginerr) => {
      if (loginerr) {
        console.error(loginerr);
        return next(loginerr);
      }

      const userInfoWithoutPassword = await User.findOne({
        where: { loginId: user.loginId },
        attributes: {
          exclude: ["password"],
        },
      });

      res.status(201).json(userInfoWithoutPassword);
    });
  })(req, res, next);
});

// localhost:3070/user/signUp POST  || 회원가입
router.post("/signup", async (req, res, next) => {
  try {
    const existedLoginId = await User.findOne({
      where: {
        loginId: req.body.loginId,
      },
    });

    if (existedLoginId) {
      return res.status(401).send("이미 존재하는 아이디 입니다.");
    }

    const bcryptPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      loginId: req.body.loginId,
      password: bcryptPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/user/logout POST  || 로그아웃
router.post("/logout", (req, res, next) => {
  try {
    console.log(req.user);
    req.logout((err) => {
      if (err) {
        console.error(err);
        next(err);
      }
      req.session.destroy();
      res.status(200).send("로그아웃 성공");
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
