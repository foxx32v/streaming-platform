import { DbInit } from "./db/dbInit"

export const ServiceInit = async () => {
    await DbInit()
}