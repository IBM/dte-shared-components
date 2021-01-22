import { types as t } from '@babel/core';

function isComponentName(name: string) {
  return !!name.match(/^[A-Z]/u);
}

export const isComponent = (
  node: t.FunctionDeclaration | t.VariableDeclarator,
) => {
  if (!t.isIdentifier(node.id)) return false;
  if (isComponentName(node.id.name)) return true;
  return false;
};
