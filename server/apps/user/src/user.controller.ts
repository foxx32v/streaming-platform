import { Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard, Public, throttleAdminOptions, throttleGlobalOptions } from './common/urils';
import { Throttle } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Profile
  @Get('me')
  getMe() {
    return this.userService.getMe();
  }

  @Patch('me')
  updateMe() {
    return this.userService.updateMe();
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMe() {
    return this.userService.deleteMe();
  }

  // Avatar
  @Post('me/avatar')
  @HttpCode(HttpStatus.CREATED)
  uploadAvatar() {
    return this.userService.uploadAvatar();
  }

  @Delete('me/avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAvatar() {
    return this.userService.deleteAvatar();
  }

  // Private options
  @Get('me/settings')
  getSettings() {
    return this.userService.getSettings();
  }

  @Patch('me/settings')
  updateSettings() {
    return this.userService.updateSettings();
  }

  // Search ПОТОМ ПЕРЕНЕСУ В SEARCH МИКРУХУ
  @Get('search')
  @Public()
  searchUsers() {
    return this.userService.searchUsers();
  }

  // Profile by id
  @Get(':id')
  @Public()
  getUser() {
    return this.userService.getUser();
  }

  // Subscriptions
  @Post(':id/follow')
  @HttpCode(HttpStatus.CREATED)
  followUser() {
    return this.userService.followUser();
  }

  @Delete(':id/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  unfollowUser() {
    return this.userService.unfollowUser();
  }

  @Get(':id/followers')
  @Public()
  getFollowers() {
    return this.userService.getFollowers();
  }

  @Get(':id/following')
  @Public()
  getFollowing() {
    return this.userService.getFollowing();
  }

  // Stats
  @Get(':id/stats')
  @Public()
  getStats() {
    return this.userService.getStats();
  }

  // Admin
  @Get()
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post(':id/ban')
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  banUser() {
    return this.userService.banUser();
  }

  @Post(':id/unban')
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  unbanUser() {
    return this.userService.unbanUser();
  }
}