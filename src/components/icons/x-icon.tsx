import { createLucideIcon } from 'lucide-react';

/**
 * @component @name X
 * @description Custom Lucide SVG icon component, renders SVG Element with children.
 *
 * @param {Object} props - Lucide icons props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const X = createLucideIcon('XBrand', [
  [
    'path',
    {
      d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
      stroke: 'none',
      fill: 'currentColor',
    },
  ],
]);

export { X, X as XIcon };
