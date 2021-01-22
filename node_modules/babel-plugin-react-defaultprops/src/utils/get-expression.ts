import { PathInfo } from '../typings';
import { types as t } from '@babel/core';

export const getObjectExpression = (info: PathInfo) => {
  return t.objectExpression(
    info.props && info.props.length
      ? info.props.map((prop) => {
          return t.objectProperty(prop.left as t.Identifier, prop.right);
        })
      : [],
  );
};

export const getMemberExpression = (componentName: string) => {
  return t.memberExpression(
    t.identifier(componentName),
    t.identifier('__defaultProps'),
  );
};

export const getExpressionStatement = (
  componentName: string,
  expression: t.Expression,
) => {
  return t.expressionStatement(
    t.assignmentExpression('=', getMemberExpression(componentName), expression),
  );
};
