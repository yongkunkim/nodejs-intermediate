import { AuthService } from '../services/auth.service';
import bcrypt from 'bcrypt';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  // authService = new AuthService();
  signUpUser = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;
      // 유효성 검사
      if (!email) {
        return res.status(400).json({
          success: false,
          message: '이메일 입력이 필요합니다.',
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: '비밀번호 입력이 필요합니다.',
        });
      }

      if (!passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: '비밀번호 확인 입력이 필요합니다.',
        });
      }

      if (!name) {
        return res.status(400).json({
          success: false,
          message: '이름 입력이 필요합니다.',
        });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: '입력 한 비밀번호가 서로 일치하지 않습니다.',
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: '비밀번호는 최소 6자리 이상입니다.',
        });
      }

      let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
      const isValidEmail = emailValidationRegex.test(email);
      if (!isValidEmail) {
        return res.status(400).json({
          success: false,
          message: '올바른 이메일 형식이 아닙니다.',
        });
      }
      const existedUser = await this.authService.findUserByEmail(email);

      if (existedUser) {
        return res.status(400).json({
          success: false,
          messagee: '이미 가입된 이메일입니다.',
        });
      }

      const newUser = await this.authService.signUpUser(
        email,
        password,
        passwordConfirm,
        name,
      );

      return res.status(201).json({ data: newUser });
    } catch (err) {
      next(err);
    }
  };

  signInUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.signInUser(email, password);

      if (!email) {
        return res.status(400).json({
          success: false,
          message: '이메일 입력이 필요합니다.',
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: '비밀번호 입력이 필요합니다.',
        });
      }

      const hashedPassword = user?.password ?? '';
      const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

      const isCorrectUser = user && isPasswordMatched;

      if (!isCorrectUser) {
        return res.status(401).json({
          success: false,
          message: '일치하는 인증 정보가 없습니다.',
        });
      }

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
}
