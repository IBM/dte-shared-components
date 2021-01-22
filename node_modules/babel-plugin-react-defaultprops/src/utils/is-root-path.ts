import { types as t, NodePath } from '@babel/core';

export const isRootPath = (
  path:
    | NodePath<t.FunctionDeclaration>
    | NodePath<t.VariableDeclaration>
    | NodePath<t.CompletionStatement>
    | NodePath<t.TaggedTemplateExpression>
    | NodePath<t.Node>,
) => {
  if (t.isExportNamedDeclaration(path)) return true;
  if (t.isExportDefaultDeclaration(path)) return true;
  if (t.isProgram(path)) return true;

  return false;
};
