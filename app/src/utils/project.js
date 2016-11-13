export function formatProjectName(projectPath) {
  return projectPath.slice(projectPath.lastIndexOf('/') + 1);
}
