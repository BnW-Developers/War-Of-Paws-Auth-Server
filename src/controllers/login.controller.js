import { config } from '../config/config.js';
import { findUserById } from '../db/mysql/user/user.db.js';
import logger from '../utils/log/logger.js';
import bcrypt from 'bcryptjs';
import redisClient from './../db/redis/redisClient.js';
import { createJWT } from './../utils/jwt/createToken.js';

export const loginController = async (req, res, next) => {
  try {
    const { id } = req.body;
    let { password } = req.body;
    logger.info(`login request id: ${id}`);

    // id가 db에 존재하는지 확인
    const user = await findUserById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      });
    }

    // 비밀번호 확인
    password = password + config.auth.pepper;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      });
    }

    // 해당 세션의 isLoggedIn 상태 확인
    const sessionKey = `user:session:${id}`;
    const isLoggedIn = await redisClient.hget(sessionKey, 'isLoggedIn');

    if (isLoggedIn === 'true') {
      return res.status(409).json({
        success: false,
        message: '이미 로그인 되어있는 계정입니다.',
      });
    }

    // 레디스에 유저 세션 생성
    const userInfo = {
      isLoggedIn: false,
      isMatchmaking: false,
      currentGameId: '',
      currentSpecies: '',
    };

    // Redis에 키가 없을 때만 추가
    const exists = await redisClient.exists(sessionKey);
    if (!exists) {
      await redisClient.hset(sessionKey, userInfo);
    }
    await redisClient.expire(sessionKey, 3600);

    // JWT 토큰 생성
    const token = createJWT(id);
    logger.info(`login success id: ${id}`);

    return res.status(200).json({
      success: true,
      message: '로그인 성공',
      token,
      userId: id,
    });
  } catch (err) {
    next(err);
  }
};
