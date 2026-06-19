import { redirect } from "react-router-dom";

function adminLoader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/auth/login");
  }

  if (!user.admin) {
    return redirect("/");
  }
}

export default adminLoader;
