import { types as t, NodePath } from '@babel/core';

export const getProgramPath = (
  path: NodePath<t.Node> | NodePath<t.VariableDeclaration>,
): NodePath<t.Program> | undefined => {
  if (t.isProgram(path)) return path as NodePath<t.Program>;
  if (path.parentPath) {
    return getProgramPath(path.parentPath);
  }
  return undefined;
};
