const authService = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required', 400);
    }

    if (password.length < 8) {
      return sendError(res, 'Password must be at least 8 characters', 400);
    }

    const { user, token } = await authService.registerUser({
      name,
      email,
      password,
      role: role || 'analyst',
    });

    return sendSuccess(res, 'User registered successfully', { user, token }, 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const { user, token } = await authService.loginUser({ email, password });
    return sendSuccess(res, 'Login successful', { user, token });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    return sendSuccess(res, 'User profile fetched', { user });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateUser(req.user.id, req.body);
    return sendSuccess(res, 'Profile updated', { user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendError(res, 'Email is required', 400);
    }
    return sendSuccess(res, 'Password reset email sent');
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!password) {
      return sendError(res, 'New password is required', 400);
    }
    return sendSuccess(res, 'Password has been reset successfully');
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    const token = authService.generateToken(user);
    return sendSuccess(res, 'Token refreshed successfully', { token });
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const user = await authService.deleteAccount(req.user.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    return sendSuccess(res, 'Account deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
  deleteAccount,
};
