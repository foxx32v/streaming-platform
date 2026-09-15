import { SetMetadata } from "@nestjs/common";

const IS_PUBLIC_KEY = 'publicKey';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)