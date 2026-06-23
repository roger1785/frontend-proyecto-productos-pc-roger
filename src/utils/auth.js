export const isAdminUser = (user) => {
  if (!user || typeof user !== "object") return false;

  return Boolean(
    user.admin || user.isAdmin || user.role === "admin" || user.rol === "admin",
  );
};
