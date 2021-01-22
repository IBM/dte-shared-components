import { types as t, NodePath } from '@babel/core';
import { isComponent, getProps, isRootPath, getFunctionNode } from './utils';

export const getVariableDeclarationProps = (
  path: NodePath<t.VariableDeclaration>,
  restricted?: boolean,
) => {
  const { node } = path;
  if (!node.declarations || node.declarations.length === 0) {
    return undefined;
  }

  const declarationNode = node.declarations[0];
  const init = declarationNode.init;

  if (!isComponent(declarationNode) || !isRootPath(path.parentPath))
    return undefined;

  if (!t.isIdentifier(declarationNode.id)) return undefined;

  const componentName = declarationNode.id.name;

  if (
    !t.isArrowFunctionExpression(init) &&
    !t.isCallExpression(init) &&
    !t.isTaggedTemplateExpression(init)
  ) {
    return undefined;
  }

  const funcNode = getFunctionNode(init);

  if (!funcNode) return undefined;

  return {
    componentName,
    props: getProps(path, funcNode, componentName, restricted),
  };
};
