import { ModuleProgress, UserProgress, usersProgress } from "@/lib/data";
import clsx from "clsx";
import { sum, round } from "lodash";

const getPercent = (num: number, den: number) => {
  return round((num / den) * 100);
};

const progressBarConvertion = (num: number, den: number) => {
  const val = (num / den) * 100;
  if (val === 0) return "w-0";
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

export default function UsersProgression() {
  const getUnqiueModuleNames = (usersProgress: UserProgress[]) => {
    return [...new Set(usersProgress.map((x) => Object.keys(x.progress)).flat())];
  };

  const uniqueModuleNames = getUnqiueModuleNames(usersProgress);

  const moduleInfo = uniqueModuleNames.map((moduleName) => ({
    name: moduleName,
    subModules: Object.keys(usersProgress[0].progress[moduleName]),
  }));

  const userInfo = usersProgress.map((user) => ({
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

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Users ({usersProgress.length})</h2>
      <table className="border-separate border-spacing-y-0 table-auto mt-4">
        <thead className="text-center min-h-[100px]">
          <tr className="text-sm text-gray-600 font-semibold">
            <th className="py-2">Members</th>
            <th>Modules Completed</th>
            <th>Submodules Completed</th>
            <th>Questions Completed</th>
          </tr>
        </thead>
        <tbody className="text-center font-semibold">
          {userInfo.map((x) => (
            <tr key={x.user_id} className="text-sm odd:bg-indigo-100 even:bg-white">
              <td className="">{x.name}</td>
              <td className="">
                <div className="flex flex-col items-center gap-y-1 my-3">
                  <div className="flex justify-center gap-x-4">
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
                  <div className="w-full flex h-2 bg-slate-300 rounded-full overflow-hidden max-w-[250px]">
                    <div
                      className={clsx(
                        "flex rounded-full overflow-hidden bg-indigo-600 whitespace-nowrap w-[25%]",
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

              <td className="">
                <div className="flex flex-col items-center gap-y-1 my-3">
                  <div className="flex justify-center gap-x-4">
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
                  <div className="w-full flex h-2 bg-slate-300 rounded-full overflow-hidden max-w-[250px]">
                    <div
                      className={clsx(
                        "flex rounded-full overflow-hidden bg-indigo-600 whitespace-nowrap w-[25%]",
                        progressBarConvertion(
                          sum(x.modules.map((x) => x.subModulesCompleted)),
                          sum(x.modules.map((x) => x.subModules.length))
                        )
                      )}
                    ></div>
                  </div>
                </div>
              </td>

              <td className="">
                <div className="flex flex-col items-center gap-y-1 my-3">
                  <div className="flex justify-center gap-x-4">
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
                  <div className="w-full flex h-2 bg-slate-300 rounded-full overflow-hidden max-w-[250px]">
                    <div
                      className={clsx(
                        "flex rounded-full overflow-hidden bg-indigo-600 whitespace-nowrap w-[25%]",
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
  );
}
