import { ReactNode } from "react";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = (props) => {
  const {children} = props;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-[72rem] m-auto">
      {children}
      <Footer />
    </main>    
  )
}

export default Layout;
