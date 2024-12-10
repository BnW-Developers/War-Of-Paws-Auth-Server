import { validateSignUp } from '../utils/joi/validateSignUp.js';
import logger from './../utils/log/logger.js';
import { createUser, findUserById } from './../db/mysql/user/user.db.js';
import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';

export const signupController = async (req, res, next) => {
  try {
    const { id, email } = req.body;
    let { password } = req.body;
    logger.info(`register request id: ${id}`);

    // id, email, password가 정해진 형식과 다를 경우 오류
    if (!validateSignUp(req.body)) {
      return res.status(400).json({
        success: false,
        message: '입력한 형식이 올바르지 않습니다.',
      });
    }

    const user = await findUserById(id);
    if (user) {
      return res.status(409).json({
        success: false,
        message: '이미 존재하는 아이디입니다.',
      });
    }

    // 유저 DB에 저장
    password = password + config.auth.pepper;
    const hashedPassword = await bcrypt.hash(password, Number(config.auth.salt));
    await createUser(id, hashedPassword, email);

    logger.info(`register success id: ${id}`);

    // 회원가입 성공 리턴
    return res.status(201).json({
      success: true,
      message: '회원가입이 성공적으로 완료되었습니다.',
    });
  } catch (err) {
    next(err);
  }
};
