import { Outlet } from "react-router-dom";
import Footer from "../AppFooter/Footer";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
