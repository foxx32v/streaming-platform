import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_VALIDATOR_REGISTER, AUTH_VALIDATOR_LOGIN, AUTH_VALIDATOR_CHANGE_PASSWORD, AUTH_VALIDATOR_RESET_PASSWORD, AUTH_VALIDATOR_FORGET_PASSWORD, AUTH_VALIDATOR_VERIFY_EMAIL, AUTH_VALIDATOR_RESEND_VERIFICATION, AUTH_VALIDATOR_VERIFY_TOKEN, AUTH_VALIDATOR_VALIDATE_TOKEN, AUTH_VALIDATOR_CHANGE_USER_ROLE, AUTH_VALIDATOR_BLOCK_USER, AUTH_VALIDATOR_GET_USER_BY_ID, AUTH_VALIDATOR_REVOKE_SESSION} from "../configs";

export const RegisterSchema = z.object({
    'email': z.string().email(AUTH_VALIDATOR_REGISTER.emailMessage),
    'userName': z.string().min(AUTH_VALIDATOR_REGISTER.userNameMin, AUTH_VALIDATOR_REGISTER.userNameMessage).max(AUTH_VALIDATOR_REGISTER.userNameMax, AUTH_VALIDATOR_REGISTER.userNameMessage),
    'password': z.string().min(AUTH_VALIDATOR_REGISTER.passwordMin, AUTH_VALIDATOR_REGISTER.passwordMessage).max(AUTH_VALIDATOR_REGISTER.passwordMax, AUTH_VALIDATOR_REGISTER.passwordMessage),
    'doublePassword': z.string().min(AUTH_VALIDATOR_REGISTER.passwordMin, AUTH_VALIDATOR_REGISTER.passwordMessage).max(AUTH_VALIDATOR_REGISTER.passwordMax, AUTH_VALIDATOR_REGISTER.passwordMessage),
    }).refine((data) => data.password === data.doublePassword, {
    message: "Passwords do not match",
    path: ["doublePassword"],
});

export const LoginSchema = z.object({
    'email': z.string().email(AUTH_VALIDATOR_LOGIN.emailMessage),
    'password': z.string().min(AUTH_VALIDATOR_LOGIN.passwordMin, AUTH_VALIDATOR_LOGIN.passwordMessage).max(AUTH_VALIDATOR_LOGIN.passwordMax, AUTH_VALIDATOR_LOGIN.passwordMessage),
});

export const ChangePasswordSchema = z.object({
    'oldPassword': z.string().min(AUTH_VALIDATOR_CHANGE_PASSWORD.oldPasswordMin, AUTH_VALIDATOR_CHANGE_PASSWORD.oldPasswordMessage).max(AUTH_VALIDATOR_CHANGE_PASSWORD.oldPasswordMax, AUTH_VALIDATOR_CHANGE_PASSWORD.oldPasswordMessage),
    'newPassword': z.string().min(AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMin, AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMessage).max(AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMax, AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMessage),
    'doublePassword': z.string().min(AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMin, AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMessage).max(AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMax, AUTH_VALIDATOR_CHANGE_PASSWORD.newPasswordMessage),
    }).refine((data) => data.newPassword === data.doublePassword, {
    message: AUTH_VALIDATOR_CHANGE_PASSWORD.doublePasswordMessage,
    path: ["doublePassword"],
});

export const ResetPasswordSchema = z.object({
    'resetToken': z.string().min(1, AUTH_VALIDATOR_RESET_PASSWORD.resetTokenMessage),
    'newPassword': z.string().min(AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMin, AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMessage).max(AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMax, AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMessage),
    'doublePassword': z.string().min(AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMin, AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMessage).max(AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMax, AUTH_VALIDATOR_RESET_PASSWORD.newPasswordMessage),
    }).refine((data) => data.newPassword === data.doublePassword, {
    message: AUTH_VALIDATOR_RESET_PASSWORD.doublePasswordMessage,
    path: ["doublePassword"],
});

export const ForgetPasswordSchema = z.object({
    'email': z.string().email(AUTH_VALIDATOR_FORGET_PASSWORD.emailMessage),
});

export const VerifyEmailSchema = z.object({
    'email': z.string().email(AUTH_VALIDATOR_VERIFY_EMAIL.emailMessage),
});

export const ResendVerificationSchema = z.object({
    'email': z.string().email(AUTH_VALIDATOR_RESEND_VERIFICATION.emailMessage),
});

export const VerifyTokenSchema = z.object({
    'token': z.string().min(1, AUTH_VALIDATOR_VERIFY_TOKEN.tokenMessage),
});

export const ValidateTokenSchema = z.object({
    'token': z.string().min(1, AUTH_VALIDATOR_VALIDATE_TOKEN.tokenMessage),
});

export const ChangeUserRoleSchema = z.object({
    'userId': z.string().uuid(AUTH_VALIDATOR_CHANGE_USER_ROLE.userIdMessage),
    'role': z.string().min(1, AUTH_VALIDATOR_CHANGE_USER_ROLE.roleMessage),
});

export const BlockUserSchema = z.object({
    'userId': z.string().uuid(AUTH_VALIDATOR_BLOCK_USER.userIdMessage),
    'reason': z.string().optional(),
});

export const GetUserByIdSchema = z.object({
    'userId': z.string().uuid(AUTH_VALIDATOR_GET_USER_BY_ID.userIdMessage),
});

export const RevokeSessionSchema = z.object({
    'sessionId': z.string().uuid(AUTH_VALIDATOR_REVOKE_SESSION.sessionIdMessage),
});

export type RegisterForm = z.infer<typeof RegisterSchema>;
export type LoginForm = z.infer<typeof LoginSchema>;
export type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
export type ForgetPasswordForm = z.infer<typeof ForgetPasswordSchema>;
export type VerifyEmailForm = z.infer<typeof VerifyEmailSchema>;
export type ResendVerificationForm = z.infer<typeof ResendVerificationSchema>;
export type VerifyTokenForm = z.infer<typeof VerifyTokenSchema>;
export type ValidateTokenForm = z.infer<typeof ValidateTokenSchema>;
export type ChangeUserRoleForm = z.infer<typeof ChangeUserRoleSchema>;
export type BlockUserForm = z.infer<typeof BlockUserSchema>;
export type GetUserByIdForm = z.infer<typeof GetUserByIdSchema>;
export type RevokeSessionForm = z.infer<typeof RevokeSessionSchema>;

export const useRegisterForm = () => useForm<RegisterForm>({ resolver: zodResolver(RegisterSchema) });
export const useLoginForm = () => useForm<LoginForm>({ resolver: zodResolver(LoginSchema) });
export const useChangePasswordForm = () => useForm<ChangePasswordForm>({ resolver: zodResolver(ChangePasswordSchema) });
export const useResetPasswordForm = () => useForm<ResetPasswordForm>({ resolver: zodResolver(ResetPasswordSchema) });
export const useForgetPasswordForm = () => useForm<ForgetPasswordForm>({ resolver: zodResolver(ForgetPasswordSchema) });
export const useVerifyEmailForm = () => useForm<VerifyEmailForm>({ resolver: zodResolver(VerifyEmailSchema) });
export const useResendVerificationForm = () => useForm<ResendVerificationForm>({ resolver: zodResolver(ResendVerificationSchema) });
export const useVerifyTokenForm = () => useForm<VerifyTokenForm>({ resolver: zodResolver(VerifyTokenSchema) });
export const useValidateTokenForm = () => useForm<ValidateTokenForm>({ resolver: zodResolver(ValidateTokenSchema) });
export const useChangeUserRoleForm = () => useForm<ChangeUserRoleForm>({ resolver: zodResolver(ChangeUserRoleSchema) });
export const useBlockUserForm = () => useForm<BlockUserForm>({ resolver: zodResolver(BlockUserSchema) });
export const useGetUserByIdForm = () => useForm<GetUserByIdForm>({ resolver: zodResolver(GetUserByIdSchema) });
export const useRevokeSessionForm = () => useForm<RevokeSessionForm>({ resolver: zodResolver(RevokeSessionSchema) });