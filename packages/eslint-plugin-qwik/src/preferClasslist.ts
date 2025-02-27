// From: https://github.com/solidjs-community/eslint-plugin-solid/blob/d8bf1d13889fbc5fa3e644bc3f932696c78cef9d/src/rules/prefer-classlist.ts

import type { TSESTree as T } from '@typescript-eslint/utils';
import jsxAstUtils from 'jsx-ast-utils';

export const preferClasslist = {
  meta: {
    type: 'problem',
    docs: {
      recommended: false,
      description:
        'Enforce using the classlist prop over importing a classnames helper. The classlist prop accepts an object `{ [class: string]: boolean }` just like classnames.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          classnames: {
            type: 'array',

            description: 'An array of names to treat as `classnames` functions',
            default: ['cn', 'clsx', 'classnames'],
            items: {
              type: 'string',
              minItems: 1,
              uniqueItems: true,
            },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      preferClasslist:
        'The classlist prop should be used instead of {{ classnames }} to efficiently set classes based on an object.',
    },
  },
  create(context) {
    const classnames = context.options[0]?.classnames ?? ['cn', 'clsx', 'classnames'];
    return {
      JSXAttribute(node) {
        if (
          ['class', 'className'].indexOf(jsxAstUtils.propName(node)) === -1 ||
          jsxAstUtils.hasProp(
            (node.parent as T.JSXOpeningElement | undefined)?.attributes,
            'classlist',
            {
              ignoreCase: false,
            }
          )
        ) {
          return;
        }
        if (node.value?.type === 'JSXExpressionContainer') {
          const expr = node.value.expression;
          if (
            expr.type === 'CallExpression' &&
            expr.callee.type === 'Identifier' &&
            classnames.indexOf(expr.callee.name) !== -1 &&
            expr.arguments.length === 1 &&
            expr.arguments[0].type === 'ObjectExpression'
          ) {
            context.report({
              node,
              messageId: 'preferClasslist',
              data: {
                classnames: expr.callee.name,
              },
              fix: (fixer) => {
                const attrRange = node.range;
                const objectRange = expr.arguments[0].range;
                return [
                  fixer.replaceTextRange([attrRange[0], objectRange[0]], 'classlist={'),
                  fixer.replaceTextRange([objectRange[1], attrRange[1]], '}'),
                ];
              },
            });
          }
        }
      },
    };
  },
};
