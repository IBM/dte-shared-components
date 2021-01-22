import { types as t, NodePath } from '@babel/core';
import { isComponent, getProps, isRootPath } from './utils';

export const getFunctionDeclarationProps = (
  path: NodePath<t.FunctionDeclaration>,
  restricted?: boolean,
) => {
  const { node } = path;

  if (!isComponent(node) || !isRootPath(path.parentPath)) return undefined;

  const componentName = node.id.name;

  return {
    componentName,
    props: getProps(path, node, componentName, restricted),
  };
};
