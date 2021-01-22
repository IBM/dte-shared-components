import packageJson from "../package.json";

export const packageDependencies = (value) => {
  if (!packageJson || !packageJson.dependencies) return;
  return packageJson.dependencies[value] || "";
};

export const packageValue = (value, fallback = "") => {
  return packageJson && packageJson[value] ? packageJson[value] : fallback;
};
