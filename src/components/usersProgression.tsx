import { useState, Fragment } from "react";
import { UserProgress, usersProgress } from "@/lib/data";
import clsx from "clsx";
import { sum, round } from "lodash";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

const getPercent = (num: number, den: number) => {
  return round((num / den) * 100);
};

const progressBarConvertion = (num: number, den: number) => {
  const val = (num / den) * 100;
  if (val === 0) return "w-[1%]";
  if (val <= 5) return "w-[5%]";
  if (val <= 10) return "w-[10%]";
  if (val <= 15) return "w-[15%]";
  if (val <= 20) return "w-[20%]";
  if (val <= 25) return "w-[25%]";
  if (val <= 30) return "w-[30%]";
  if (val <= 35) return "w-[35%]";
  if (val <= 40) return "w-[40%]";
  if (val <= 45) return "w-[45%]";
  if (val <= 50) return "w-[50%]";
  if (val <= 55) return "w-[55%]";
  if (val <= 60) return "w-[60%]";
  if (val <= 65) return "w-[65%]";
  if (val <= 70) return "w-[70%]";
  if (val <= 75) return "w-[75%]";
  if (val <= 80) return "w-[80%]";
  if (val <= 85) return "w-[85%]";
  if (val <= 90) return "w-[90%]";
  if (val < 100) return "w-[95%]";
  if (val === 100) return "w-full";
};

const getUnqiueModuleNames = (usersProgress: UserProgress[]) => {
  return [...new Set(usersProgress.map((x) => Object.keys(x.progress)).flat())];
};

export type UserInfo = UserProgress & {
  modules: {
    subModulesCompleted: number;
    totalQuestions: number;
    totalAnswered: number;
    name: string;
    subModules: {
      name: string;
      totalQuestions: number;
      totalAnswered: number;
      complete: boolean;
    }[];
  }[];
};

const barContainerClass =
  "w-[90%] flex h-2 bg-gray-400/50 rounded-full overflow-hidden max-w-[250px] mx-2";

export default function UsersProgression() {
  const uniqueModuleNames = getUnqiueModuleNames(usersProgress);

  const moduleInfo = uniqueModuleNames.map((moduleName) => ({
    name: moduleName,
    subModules: Object.keys(usersProgress[0].progress[moduleName]),
  }));

  const userInfo: UserInfo[] = usersProgress.map((user) => ({
    ...user,
    modules: [
      ...moduleInfo.map((module) => ({
        name: module.name,
        subModules: [
          ...module.subModules.map((subModuleName) => {
            const totalQuestions = Object.keys(
              user.progress[module.name][subModuleName]
            ).length;
            const totalAnswered = Object.keys(user.progress[module.name][subModuleName])
              .map((key) => user.progress[module.name][subModuleName][key])
              .filter((answer) => answer && answer !== "").length;
            return {
              name: subModuleName,
              totalQuestions,
              totalAnswered,
              complete: totalQuestions === totalAnswered,
            };
          }),
        ],
      })),
    ].map((module) => {
      const subModulesCompleted = module.subModules.filter(
        (sub) => sub.complete === true
      ).length;
      return {
        ...module,
        subModulesCompleted,
        totalQuestions: sum(module.subModules.map((x) => x.totalQuestions)),
        totalAnswered: sum(module.subModules.map((x) => x.totalAnswered)),
      };
    }),
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo>();

  const handleSelectUser = (user: UserInfo) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold">Members ({usersProgress.length})</h2>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-0 table-auto mt-4 overflow-scroll w-full min-w-[512px]">
          <thead className="text-center min-h-[100px]">
            <tr className="text-xs sm:text-sm text-gray-600 font-semibold">
              <th className="py-2">Members</th>
              <th>Modules Completed</th>
              <th>Submodules Completed</th>
              <th>Questions Completed</th>
            </tr>
          </thead>
          <tbody className="text-center font-semibold">
            {userInfo.map((x) => (
              <tr
                key={x.user_id}
                className="text-xs sm:text-sm odd:bg-indigo-100 even:bg-white"
              >
                {/*name coloumn*/}
                <td>
                  <button
                    onClick={() => handleSelectUser(x)}
                    className="underline decoration-indigo-500"
                  >
                    {x.name}
                  </button>
                </td>
                {/*modules completed coloumn*/}
                <td>
                  <div className="flex flex-col items-center gap-y-1 my-3">
                    <div className="flex justify-center gap-x-2 sm:gap-x-4">
                      <span>
                        {getPercent(
                          x.modules.filter(
                            (module) =>
                              module.subModulesCompleted === module.subModules.length
                          ).length,
                          x.modules.length
                        )}
                        %
                      </span>
                      <span>
                        {
                          x.modules.filter(
                            (module) =>
                              module.subModulesCompleted === module.subModules.length
                          ).length
                        }{" "}
                        / {x.modules.length}
                      </span>
                    </div>
                    <div className={barContainerClass}>
                      <div
                        className={clsx(
                          "flex rounded-full overflow-hidden bg-indigo-600 whitespace-nowrap",
                          progressBarConvertion(
                            x.modules.filter(
                              (module) =>
                                module.subModulesCompleted === module.subModules.length
                            ).length,
                            x.modules.length
                          )
                        )}
                      ></div>
                    </div>
                  </div>
                </td>
                {/*submodules completed coloumn*/}
                <td>
                  <div className="flex flex-col items-center gap-y-1 my-3">
                    <div className="flex justify-center gap-x-2 sm:gap-x-4">
                      <span>
                        {getPercent(
                          sum(x.modules.map((x) => x.subModulesCompleted)),
                          sum(x.modules.map((x) => x.subModules.length))
                        )}
                        %
                      </span>
                      <span>
                        {sum(x.modules.map((x) => x.subModulesCompleted))} /{" "}
                        {sum(x.modules.map((x) => x.subModules.length))}
                      </span>
                    </div>
                    <div className={barContainerClass}>
                      <div
                        className={clsx(
                          "flex rounded-full overflow-hidden bg-indigo-600 whitespace-nowrap",
                          progressBarConvertion(
                            sum(x.modules.map((x) => x.subModulesCompleted)),
                            sum(x.modules.map((x) => x.subModules.length))
                          )
                        )}
                      ></div>
                    </div>
                  </div>
                </td>
                {/*questions completed coloumn*/}
                <td>
                  <div className="flex flex-col items-center gap-y-1 my-3">
                    <div className="flex justify-center gap-x-2 sm:gap-x-4">
                      <span>
                        {getPercent(
                          sum(x.modules.map((x) => x.totalAnswered)),
                          sum(x.modules.map((x) => x.totalQuestions))
                        )}
                        %
                      </span>
                      <span>
                        {sum(x.modules.map((x) => x.totalAnswered))} /{" "}
                        {sum(x.modules.map((x) => x.totalQuestions))}
                      </span>
                    </div>
                    <div className={barContainerClass}>
                      <div
                        className={clsx(
                          "flex rounded-full overflow-hidden bg-indigo-600 whitespace-nowrap",
                          progressBarConvertion(
                            sum(x.modules.map((x) => x.totalAnswered)),
                            sum(x.modules.map((x) => x.totalQuestions))
                          )
                        )}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Transition appear show={isOpen}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-10 focus:outline-none"
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
            <div className="flex justify-center items-center min-h-full px-2 sm:px-4 sm:mt-[-96px]">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-lg rounded-2xl bg-white px-6 py-4 sm:px-8 sm:py-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-lg sm:text-xl font-bold">
                    {selectedUser?.name}
                  </DialogTitle>
                  <TabGroup className="flex flex-col mt-1 sm:mt-2">
                    <TabList className="flex gap-x-1 sm:gap-x-2 border-b pb-2 sm:pb-4">
                      {selectedUser?.modules.map((x, i) => (
                        <Tab as={Fragment} key={x.name}>
                          {({ hover, selected }) => (
                            <span
                              className={clsx(
                                selected && "bg-indigo-500 text-white",
                                hover && "text-black bg-gray-200",
                                "text-sm text-gray-600 font-semibold rounded-xl px-3 py-1 cursor-pointer"
                              )}
                            >
                              Module {i + 1}
                            </span>
                          )}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels className="mt-2 sm:mt-4">
                      {selectedUser?.modules.map((x) => (
                        <TabPanel key={x.name}>
                          <div className="flex flex-col">
                            <span className="sm:text-lg font-bold">{x.name}</span>
                            <TabGroup className="flex flex-col mt-1 sm:mt-2">
                              <TabList className="flex gap-x-1 sm:gap-x-2 border-b pb-2 sm:pb-4">
                                {x.subModules.map((y, i) => (
                                  <Tab as={Fragment} key={y.name}>
                                    {({ hover, selected }) => (
                                      <span
                                        className={clsx(
                                          selected && "bg-indigo-500 text-white",
                                          hover && "text-black bg-gray-200",
                                          "text-sm text-gray-600 font-semibold rounded-xl px-3 py-1 cursor-pointer"
                                        )}
                                      >
                                        SM {i + 1}
                                      </span>
                                    )}
                                  </Tab>
                                ))}
                              </TabList>
                              <TabPanels>
                                {x.subModules.map((y) => (
                                  <TabPanel key={y.name}>
                                    <div className="flex flex-col mt-2 sm:mt-4">
                                      <span className="sm:text-lg font-bold">
                                        {y.name} ({y.totalAnswered}/{y.totalQuestions})
                                      </span>
                                      <div className="flex flex-col gap-y-3 mt-2 text-gray-600 text-sm sm:text-base">
                                        {Object.keys(
                                          selectedUser.progress[x.name][y.name]
                                        ).map((question) => (
                                          <div key={question} className="flex flex-col">
                                            <span>{question}</span>
                                            <span className="font-semibold text-black">
                                              {selectedUser.progress[x.name][y.name][
                                                question
                                              ] ?? "N/A"}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </TabPanel>
                                ))}
                              </TabPanels>
                            </TabGroup>
                          </div>
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
