import { types as t } from '@babel/core';

export const isValidValue = (node: t.Node) => {
  if (t.isLiteral(node)) {
    return true;
  }

  if (t.isAssignmentPattern(node)) {
    return isValidValue(node.right);
  }

  if (t.isObjectProperty(node) || t.isJSXAttribute(node)) {
    return isValidValue(node.value);
  }

  if (t.isJSXExpressionContainer(node)) {
    return isValidValue(node.expression);
  }

  if (t.isJSXElement(node)) {
    return isValidValue(node.openingElement);
  }

  if (t.isJSXOpeningElement(node)) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      if (!isValidValue(attr)) {
        return false;
      }
    }
    return true;
  }

  if (t.isArrayExpression(node)) {
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i];
      if (!isValidValue(element)) {
        return false;
      }
    }
    return true;
  }

  if (t.isObjectExpression(node)) {
    for (let i = 0; i < node.properties.length; i++) {
      const prop = node.properties[i];
      if (!isValidValue(prop)) {
        return isValidValue(prop);
      }
    }
    return true;
  }
  return false;
};
