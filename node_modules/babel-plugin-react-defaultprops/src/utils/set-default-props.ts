import { types as t, NodePath } from '@babel/core';
import { getExpressionStatement } from './get-expression';

export const setDefaultProps = (
  path: NodePath<t.FunctionDeclaration> | NodePath<t.VariableDeclaration>,
  componentName: string,
  expression?: t.Expression,
) => {
  if (!expression) return;
  const node = getExpressionStatement(componentName, expression);
  path.insertAfter(node);
};
