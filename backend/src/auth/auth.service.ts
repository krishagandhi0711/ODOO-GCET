import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials by checking email and password
   * Returns user without password if valid, null otherwise
   */
  async validateUser(email: string, password: string): Promise<any> {
    // Find user with role information
    const user = await this.prisma.users.findUnique({
      where: { email },
      include: {
        roles: true, // Include role information
        companies: true, // Include company information
      },
    });

    if (!user) {
      return null;
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Remove password from the result
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Generates JWT token for authenticated user
   * Token contains user id, email, role, and company information
   */
  async login(user: any) {
    const payload = {
      sub: user.id, // 'sub' is a JWT standard claim for subject (user id)
      email: user.email,
      role: user.roles?.name || 'EMPLOYEE', // Default to EMPLOYEE if no role
      companyId: user.company_id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        loginId: user.login_id,
        role: user.roles?.name || 'EMPLOYEE',
        companyId: user.company_id,
        isFirstLogin: user.is_first_login,
      },
    };
  }

  /**
   * Hashes a password for storage
   * Used when creating new users
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
