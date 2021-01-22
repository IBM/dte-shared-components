import { getProgramPath } from './get-program-path';
import { types as t, NodePath } from '@babel/core';

export const isImported = (
  path: NodePath<t.Node> | NodePath<t.VariableDeclaration>,
  specifierName: string,
) => {
  const program = getProgramPath(path);
  if (!program) return false;
  const imported = program.node.body.some((node) => {
    if (t.isImportDeclaration(node)) {
      return node.specifiers.some((specifier) => {
        if (
          t.isImportSpecifier(specifier) &&
          specifier.local.name === specifierName
        ) {
          return true;
        }
        return false;
      });
    }
    return false;
  });
  return imported;
};
