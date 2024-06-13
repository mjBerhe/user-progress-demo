import { Fragment } from "react";
import clsx from "clsx";
import { Link } from "@/router";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import UsersProgression from "@/components/usersProgression";

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* header */}
      <header className="w-full max-w-7xl mx-auto border-b border-gray-300 py-4">
        <Link to="/" className="font-medium">
          User Progress Demo
        </Link>
      </header>

      {/* main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto mt-8">
        <div className="flex flex-col">
          <span className="text-gray-500 font-bold text-sm">Ben Honda</span>
          <h1 className="text-2xl sm:text-3xl font-bold">Team Module Progress</h1>
        </div>

        <TabGroup className="flex flex-col mt-10">
          <TabList className="flex gap-x-4 text-xs sm:text-sm font-bold text-gray-600 border-b border-gray-300">
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={clsx(
                    "border-b-[3px] border-transparent pb-3",
                    hover && "text-gray-900",
                    selected && "border-b-indigo-500 outline-none"
                  )}
                >
                  Members
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={clsx(
                    "border-b-[3px] border-transparent pb-3",
                    hover && "text-gray-900",
                    selected && "border-b-indigo-500 outline-none"
                  )}
                >
                  Settings
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={clsx(
                    "border-b-[3px] border-transparent pb-3",
                    hover && "text-gray-900",
                    selected && "border-b-indigo-500 outline-none"
                  )}
                >
                  More Settings
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels className="mt-8">
            <TabPanel>
              <UsersProgression />
            </TabPanel>
            <TabPanel>
              <span className="text-xl sm:text-2xl font-bold">Settings</span>
            </TabPanel>
            <TabPanel>
              <span className="text-xl sm:text-2xl font-bold">More Settings</span>
            </TabPanel>
          </TabPanels>
        </TabGroup>
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
