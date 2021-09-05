export interface User{
    _id: string,
    email:string,
    password: string,
    username:string,
    activationToken: string | null,
    mangoPayUserId: any,
    cagnotteId: any
}