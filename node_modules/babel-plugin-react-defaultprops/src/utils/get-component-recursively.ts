import { types as t, NodePath } from '@babel/core';
import { isRootPath } from '.';

export const getComponentRecursively = (
  path: NodePath<t.Node> | NodePath<t.VariableDeclaration>,
) => {
  if (!isRootPath(path.parentPath)) {
    return getComponentRecursively(path.parentPath);
  }
  return path;
};
