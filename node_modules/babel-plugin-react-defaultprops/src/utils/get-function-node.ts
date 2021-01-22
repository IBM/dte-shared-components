import { types as t } from '@babel/core';

export const getFunctionNode = (
  node:
    | t.CallExpression
    | t.ArrowFunctionExpression
    | t.TaggedTemplateExpression,
) => {
  // for styled component:
  if (t.isTaggedTemplateExpression(node)) {
    if (!node.quasi || !node.quasi.expressions.length) {
      // const Thing = styled.div.attrs({index}) => ({ tabIndex: index }))
      if (t.isCallExpression(node.tag) && node.tag.arguments.length) {
        const func = node.tag.arguments[0];
        return func;
      }
      return;
    }

    // const Component = styled.div`
    const expNode = node.quasi.expressions[0];
    return expNode;
  }

  if (t.isArrowFunctionExpression(node)) {
    return node;
  }

  if (t.isIdentifier(node.callee)) {
    if (node.callee.name === 'forwardRef' || node.callee.name === 'memo') {
      const func = node.arguments[0];
      if (t.isArrowFunctionExpression(func)) {
        return func;
      } else if (t.isCallExpression(func)) {
        return getFunctionNode(func);
      }
    }
  }

  if (
    t.isMemberExpression(node.callee) &&
    t.isIdentifier(node.callee.object) &&
    t.isIdentifier(node.callee.property)
  ) {
    if (
      node.callee.property.name === 'forwardRef' ||
      node.callee.property.name === 'memo'
    ) {
      const func = node.arguments[0];
      if (t.isArrowFunctionExpression(func)) {
        return func;
      } else if (t.isCallExpression(func)) {
        return getFunctionNode(func);
      }
    }
  }
  return undefined;
};
