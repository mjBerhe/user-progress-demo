import { ModuleProgress, UserProgress, usersProgress } from "@/lib/data";
import { sum } from "lodash";

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

  console.log(userInfo);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Users ({usersProgress.length})</h2>
      <div className="flex flex-col mt-4">
        {userInfo.map((x) => (
          <div key={x.user_id}>
            <span>{x.name}</span>
            <span>
              modules completed:{" "}
              {
                x.modules.filter(
                  (module) => module.subModulesCompleted === module.subModules.length
                ).length
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
