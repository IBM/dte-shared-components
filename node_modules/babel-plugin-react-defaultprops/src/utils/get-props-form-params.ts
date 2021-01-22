import { types as t } from '@babel/core';
import { getPropsFromObject } from './get-props-from-object';

export const getPropsFromParams = (
  node: t.FunctionDeclaration | t.ArrowFunctionExpression,
) => {
  if (!node.params.length) return undefined;

  const firstParam = node.params[0];
  if (t.isObjectPattern(firstParam)) {
    return getPropsFromObject(firstParam.properties);
  }
  return undefined;
};
