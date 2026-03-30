import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import { Outlet } from "react-router-dom";
import Footer from "../AppFooter/Footer";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
