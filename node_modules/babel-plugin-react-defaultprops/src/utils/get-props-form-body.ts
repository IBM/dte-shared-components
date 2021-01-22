import { types as t } from '@babel/core';
import { getPropsFromObject } from './get-props-from-object';

export const getPropsFormBody = (
  node: t.FunctionDeclaration | t.ArrowFunctionExpression,
  restricted: boolean,
) => {
  if (!node.params.length) return undefined;
  const firstParam = node.params[0];

  if (!t.isIdentifier(firstParam)) return undefined;
  const paramName = firstParam.name;

  if (!t.isStatement(node.body)) return undefined;

  const body = node.body.body;

  const variableDeclarators = body.reduce((arr, n) => {
    if (!t.isVariableDeclaration(n)) return arr;

    const decl = n.declarations[0];

    if (!t.isObjectPattern(decl.id)) return arr;
    if (!t.isIdentifier(decl.init)) return arr;
    if (decl.init.name !== paramName) return arr;

    if (!t.isObjectPattern(decl.id) || !decl.id.properties.length) return arr;

    arr.push(decl.id);

    return arr;
  }, [] as t.ObjectPattern[]);

  if (!variableDeclarators.length) return undefined;

  const assignmentPatterns = getPropsFromObject(
    variableDeclarators[0].properties,
    restricted,
  );

  return assignmentPatterns;
};
