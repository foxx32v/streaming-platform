import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { userRepository } from './common/repository';
import { GetRandomColor, Responser } from './common/urils';
import { UpdateUserProfileDto, UpdateSettingsDto, UserProfileDto } from './common/dto';

@Injectable()
export class UserService {
  async init(userId: string, userName: string) {
    const userProfile = await userRepository.GetUserProfileById(userId);
    if (userProfile) return;
    const existing = await userRepository.GetUserProfileByUserName(userName);
    if (existing) throw new ConflictException('Username already taken');
    const avatarColor = GetRandomColor();
    await userRepository.CreateUserProfile(userId, userName, avatarColor);
    await userRepository.CreateSettingsByUserId(userId);
    return Responser(201, 'User initialized');
  }

  async getMe(userId: string) {
    const userProfile = await userRepository.GetUserProfileById(userId)
    if (!userProfile) throw new NotFoundException('User profile not found');
    return Responser(200, 'user profile', userProfile)
  }

  async updateMe(userId: string, dto: UpdateUserProfileDto) {
    const oldUserProfile = await userRepository.GetUserProfileById(userId);
    if (!oldUserProfile) throw new NotFoundException('User profile not found');
    if (dto.userName && dto.userName !== oldUserProfile.userName) {
    const existing = await userRepository.GetUserProfileByUserName(dto.userName);
    if (existing && existing.id !== userId) throw new ConflictException('Username already taken');
    await userRepository.UpdateUserName(userId, dto.userName)}
    if (dto.status) await userRepository.UpdateStatus(userId, dto.status);
    const newUserProfile = await userRepository.GetUserProfileById(userId);
    return Responser(200, 'Profile updated', newUserProfile);
  }

  async deleteMe(userId: string) {
    const userProfile = await userRepository.GetUserProfileById(userId);
    if (!userProfile) throw new NotFoundException('User profile not found')
    await userRepository.DeleteUserProfile(userId);
    return Responser(200, 'Profile deleted');
  }

  async getUser(userId: string) {
    const userProfile = await userRepository.GetUserProfileById(userId);
    if (!userProfile) throw new NotFoundException('User profile not found')
    return Responser(200, 'User profile', userProfile);
  }

  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) throw new BadRequestException('Cannot follow yourself')
    const followerIsExist = await userRepository.IsExistUserProfile(followerId);
    if (!followerIsExist) throw new NotFoundException('User profile not found')
    const followingIsExist = await userRepository.IsExistUserProfile(followingId);
    if (!followingIsExist) throw new NotFoundException('User profile not found')
    const subscribeIsExist = await userRepository.IsExistSubscribe(followingId, followerId)
    if (subscribeIsExist) throw new ConflictException('Already following this user');
    await userRepository.SubscribeOnUser(followingId, followerId)
    return Responser(201, 'Subscribed');
  }

  async unfollowUser(followerId: string, followingId: string) {
    if (followerId === followingId) throw new BadRequestException('Cannot unfollow yourself');
    const followingIsExist = await userRepository.IsExistUserProfile(followingId);
    if (!followingIsExist) throw new NotFoundException('User profile not found');
    const subscribeIsExist = await userRepository.IsExistSubscribe(followingId, followerId);
    if (!subscribeIsExist) throw new NotFoundException('Subscription not found');
    await userRepository.UnSubscribeFromUser(followingId, followerId);
    return Responser(200, 'Unsubscribed', { followingId });
  }

  async getFollowers(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found')
    const followers = await userRepository.GetFollowers(userId)
    return Responser(200, 'Followers', followers)
  }

  async getFollowing(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found')
    const following = await userRepository.GetFollowing(userId)
    return Responser(200, 'Following', following)
  }

  async getStats(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    const stats = await userRepository.GetStats(userId);
    return Responser(200, 'Stats', stats);
  }

  async getSettings(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    const settings = await userRepository.GetSettingsByUserId(userId);
    return Responser(200, 'Settings', settings);
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    if (dto.privateProfile !== undefined) await userRepository.UpdatePrivateProfileByUserId(userId, dto.privateProfile);
    if (dto.showEmail !== undefined) await userRepository.ShowEmailInSettingsByUserId(userId, dto.showEmail)
    if (dto.showPhone !== undefined) await userRepository.ShowPhoneInSettingsByUserId(userId, dto.showPhone);
    const settings = await userRepository.GetSettingsByUserId(userId);
    return Responser(200, 'Settings updated', settings);
  }

  async getAllUsers(page: number = 1, limit: number = 20) {
    const users = await userRepository.GetAllUsers(page, limit);
    return Responser(200, 'Users', users);
  }

  async changeRole(userId: string, role: 'user' | 'admin') {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    await userRepository.UpdateRole(userId, role);
    const userProfile = await userRepository.GetUserProfileById(userId);
    return Responser(200, 'Role updated', userProfile);
  }

  async deleteUser(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    await userRepository.DeleteUserProfile(userId);
    return Responser(200, 'Delete user')
  }

  async banUser(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    await userRepository.BlockedUser(userId, true);
    const userProfile = await userRepository.GetUserProfileById(userId);
    return Responser(200, 'User banned', userProfile);
  }

  async unbanUser(userId: string) {
    const userProfileIsExist = await userRepository.IsExistUserProfile(userId);
    if (!userProfileIsExist) throw new NotFoundException('User profile not found');
    await userRepository.BlockedUser(userId, false);
    const userProfile = await userRepository.GetUserProfileById(userId);
    return Responser(200, 'User unbanned', userProfile);
  }
}