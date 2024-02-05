import { Sidebar } from "./_components/sidebar/Sidebar";

import { OrgSidebar } from "./_components/org-sidebar";
import { Navbar } from "./_components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayOutPage = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full w-full">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardLayOutPage;
