import { redirect } from "react-router-dom";
import { isAdminUser } from "../utils/auth";

function adminLoader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/auth/login");
  }

  if (!isAdminUser(user)) {
    return redirect("/");
  }
}

export default adminLoader;
