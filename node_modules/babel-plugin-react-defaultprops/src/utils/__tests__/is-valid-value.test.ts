import { isValidValue } from '../is-valid-value';
import template from '@babel/template';
import { types as t } from '@babel/core';

describe('isValidValue', () => {
  const getNode = (tmpl: unknown) => {
    const ast = template.ast('const {  foo = ' + tmpl + ' } = props;', {
      plugins: ['jsx'],
    }) as t.VariableDeclaration;

    const dec = ast.declarations[0].id as t.ObjectPattern;

    const prop = dec.properties[0] as t.ObjectProperty;

    return prop.value as t.AssignmentPattern;
  };

  it('should allow string', () => {
    expect(isValidValue(getNode('"bar"'))).toBeTruthy();
  });

  it('should allow boolean', () => {
    expect(isValidValue(getNode('true'))).toBeTruthy();
    expect(isValidValue(getNode('false'))).toBeTruthy();
  });

  it('should allow null', () => {
    expect(isValidValue(getNode('null'))).toBeTruthy();
  });

  it('should allow number', () => {
    expect(isValidValue(getNode(1))).toBeTruthy();
  });

  it('should allow object', () => {
    expect(isValidValue(getNode('{ baz: "bar" }'))).toBeTruthy();
  });

  it('should allow array of number', () => {
    expect(isValidValue(getNode('[1,2]'))).toBeTruthy();
  });

  it('should allow array of string', () => {
    expect(isValidValue(getNode('["bar","foo"]'))).toBeTruthy();
  });

  it('should not allow function', () => {
    expect(isValidValue(getNode('getValue()'))).toBeFalsy();
  });

  it('should not allow variable', () => {
    expect(isValidValue(getNode('variable'))).toBeFalsy();
  });

  it('should not allow variable namespace', () => {
    expect(isValidValue(getNode('variable.bar'))).toBeFalsy();
  });

  it('should not allow function namespace', () => {
    expect(isValidValue(getNode('variable.bar()'))).toBeFalsy();
  });

  it('should not allow function namespace 2', () => {
    expect(isValidValue(getNode('variable().bar'))).toBeFalsy();
  });

  it('should not allow array with variable', () => {
    expect(isValidValue(getNode('[1, variable]'))).toBeFalsy();
  });

  it('should not allow array of array with variable', () => {
    expect(isValidValue(getNode('[1, [variable]]'))).toBeFalsy();
  });

  it('should not allow array with function', () => {
    expect(isValidValue(getNode('[1,getValue()]'))).toBeFalsy();
  });

  it('should not allow array of array with function', () => {
    expect(isValidValue(getNode('[1,[getValue()]]'))).toBeFalsy();
  });

  it('should not allow function value', () => {
    expect(isValidValue(getNode('{ baz: getValue() }'))).toBeFalsy();
  });

  it('should not allow variable value', () => {
    expect(isValidValue(getNode('{ baz: variable }'))).toBeFalsy();
  });

  it('should not conditional value', () => {
    expect(isValidValue(getNode('{baz: true?true:false }'))).toBeFalsy();
    expect(isValidValue(getNode('{baz: tru||1 }'))).toBeFalsy();
  });

  describe('jsx', () => {
    it('should allow jsx', () => {
      expect(isValidValue(getNode('<div/>'))).toBeTruthy();
    });

    it('should allow jsx with string', () => {
      expect(isValidValue(getNode('<div foo="bar"/>'))).toBeTruthy();
    });

    it('should allow jsx with number', () => {
      expect(isValidValue(getNode('<div foo={1} />'))).toBeTruthy();
    });

    it('should allow jsx with boolean', () => {
      expect(isValidValue(getNode('<div foo={true} />'))).toBeTruthy();
    });

    it('should allow jsx with object', () => {
      expect(isValidValue(getNode('<div foo={{bar:true}} />'))).toBeTruthy();
    });

    it('should not allow jsx with variable', () => {
      expect(isValidValue(getNode('<div  baz={baz}  bar={bar}/>'))).toBeFalsy();
    });

    it('should not allow jsx with function', () => {
      expect(
        isValidValue(getNode('<div  baz={getValue() }  bar={getValue() }/>')),
      ).toBeFalsy();
    });

    it('should not allow jsx with spread', () => {
      expect(isValidValue(getNode('<div  {...rest}/>'))).toBeFalsy();
    });

    it('should not allow jsx with object and func value', () => {
      expect(
        isValidValue(getNode('<div foo={{bar:getValue()}} />')),
      ).toBeFalsy();
    });

    it('should not allow jsx with object and variable', () => {
      expect(isValidValue(getNode('<div foo={{bar:baz}} />'))).toBeFalsy();
    });
  });
});
