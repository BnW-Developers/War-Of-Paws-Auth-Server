import logger from '../utils/log/logger.js';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config/config.js';
import { findOrCreateUserByGoogleId } from '../db/mysql/user/user.db.js';
import redisClient from './../db/redis/redisClient.js';
import { createJWT } from './../utils/jwt/createToken.js';

export const googleLoginController = async (req, res, next) => {
  try {
    const { idToken, name, email } = req.body;
    logger.info(`Google login request for email: ${email}`);

    const googleOAuthClient = new OAuth2Client(config.googleApi.clientId);

    // 1. 구글 ID 토큰 검증
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: idToken,
      audience: config.googleApi.clientId, // 애플리케이션의 클라이언트 ID
    });

    // 2. 토큰에서 구글 ID 추출
    const googlePayload = ticket.getPayload();
    const googleId = googlePayload['sub']; // 구글의 고유 사용자 ID

    // 3. 토큰의 정보와 클라이언트가 보낸 정보 비교
    if (googlePayload['email'] !== email || googlePayload['name'] !== name) {
      return res.status(401).json({
        success: false,
        message: '토큰 정보와 일치하지 않습니다.',
      });
    }

    // 4. 토큰 만료 및 발급 시간 추가 검증
    const currentTime = Math.floor(Date.now() / 1000);
    if (googlePayload['exp'] < currentTime || googlePayload['iat'] > currentTime) {
      return res.status(401).json({
        success: false,
        message: '만료되었거나 유효하지 않은 토큰입니다.',
      });
    }

    // 구글 아이디로 로그인 한 유저 검색 / 없으면 저장
    await findOrCreateUserByGoogleId(googleId, email, name);

    // 이미 로그인 되어있는 계정인지 확인
    const existingSession = await redisClient.exists(`user:session:${googleId}`);
    if (existingSession) {
      return res.status(409).json({
        success: false,
        message: '이미 로그인 되어있는 계정입니다.',
      });
    }

    // 레디스에 유저 세션 생성
    const sessionKey = `user:session:${googleId}`;
    const userInfo = {
      socketId: '',
      isLoggedIn: true,
      isMatchmaking: false,
      currentGameId: '',
      currentSpecies: '',
    };

    await redisClient.hmset(sessionKey, userInfo);
    await redisClient.expire(sessionKey, 3600);

    // JWT 토큰 생성
    const token = createJWT(googleId);
    logger.info(`login success id: ${googleId}`);

    logger.info(`Google login success for ID: ${email}`);

    return res.status(200).json({
      success: true,
      message: '로그인 성공',
      token,
      userId: googleId,
    });
  } catch (err) {
    next(err);
  }
};
