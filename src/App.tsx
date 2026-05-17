import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { CloudNetwork } from './components/dashboard/CloudNetwork'
import { FileSharing } from './components/dashboard/FileSharing'
import { ActiveUsers } from './components/dashboard/ActiveUsers'
import { DeviceManagement } from './components/dashboard/DeviceManagement'
import { ProductivityReport } from './components/dashboard/ProductivityReport'
import { EmailCharts } from './components/dashboard/EmailCharts'
import { OnlineUsers } from './components/dashboard/OnlineUsers'

export default function App() {
  return (
    <div className="min-h-screen flex bg-[#f6f7fb]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar />
        <div className="px-6 lg:px-8 pb-10 space-y-5">
          <CloudNetwork />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 [&>*]:min-w-0">
            <FileSharing />
            <ActiveUsers />
          </div>

          <DeviceManagement />
          <ProductivityReport />
          <EmailCharts />
          <OnlineUsers />
        </div>
      </main>
    </div>
  )
}
