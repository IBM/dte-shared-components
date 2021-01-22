import { types as t } from '@babel/core';
import { isValidValue } from './is-valid-value';

export const getPropsFromObject = (
  properties: (t.RestElement | t.ObjectProperty)[],
  restricted = true,
): t.AssignmentPattern[] => {
  const props = properties.reduce((arr, n) => {
    if (!t.isObjectProperty(n) || !t.isAssignmentPattern(n.value)) {
      return arr;
    }

    if (!t.isIdentifier(n.key) || !t.isIdentifier(n.value.left)) return arr;

    if (restricted && !isValidValue(n.value)) {
      return arr;
    }
    //  const { bar = 'bar' } = props;
    if (n.key.name === n.value.left.name) {
      arr.push(n.value);
      return arr;
    }

    //  const { bar: bar = 'bar' } = props;
    arr.push({
      ...n.value,
      left: t.identifier(n.key.name),
      right: n.value.right,
    });

    return arr;
  }, [] as t.AssignmentPattern[]);

  return props;
};
