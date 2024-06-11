import { usersProgress } from "@/lib/data";
import { Link } from "@/router";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* header */}
      <header className="w-full max-w-7xl mx-auto px-4 border-b border-gray-300 py-4">
        <Link to="/" className="font-medium">
          User Progress Demo
        </Link>
      </header>

      {/* main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col gap-y-1">
          <span className="text-gray-500 font-bold text-sm">Matthew Berhe</span>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <TabGroup className="flex flex-col mt-10">
          <TabList className="flex gap-x-4 text-sm font-bold text-gray-600">
            <Tab>Members</Tab>
            <Tab>Settings</Tab>
            <Tab>More Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div>Users</div>
            </TabPanel>
            <TabPanel>
              <div>Settings here</div>
            </TabPanel>
            <TabPanel>
              <div>More Settings here</div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        {/* <div className="flex mt-10 gap-x-4 text-sm">
          <div className="font-bold text-gray-600">Members</div>
          <div className="font-bold text-gray-600">Settings</div>
          <div className="font-bold text-gray-600">More Settings</div>
        </div> */}
      </main>

      {/* footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 flex items-start py-4 text-gray-500 text-sm">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
          <p>&copy; The Adpharm</p>
        </div>
        <div className="flex-1"></div>
      </footer>
    </div>
  );
}
