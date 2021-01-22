import { types as t, NodePath } from '@babel/core';
import { getVariableDeclarationProps } from './get-variable-declaration-props';
import { getFunctionDeclarationProps } from './get-function-declaration-props';

export const getPropsFormPath = (
  path: NodePath<t.FunctionDeclaration> | NodePath<t.VariableDeclaration>,
  restricted?: boolean,
) => {
  const { node } = path;

  if (t.isVariableDeclaration(node)) {
    return getVariableDeclarationProps(
      path as NodePath<t.VariableDeclaration>,
      restricted,
    );
  } else if (t.isFunctionDeclaration(node)) {
    return getFunctionDeclarationProps(
      path as NodePath<t.FunctionDeclaration>,
      restricted,
    );
  }
  return undefined;
};
