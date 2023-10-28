export const checkIsOwner = (role: string) => role === "owner";
export const checkIsAdmin = (role: string) => role === "admin";

export const checkIsAdminOrOwner = (role: string) =>
  role === "admin" || role === "owner";
