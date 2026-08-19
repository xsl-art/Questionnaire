export const useCustomStyle = () => {
  /**
   * 用户自定义css样式隔离
   * .title { color: red } -> #question-canvas-scope .title { color: red }
   * @param css 用户自定义css样式
   * @param scopeId 组件容器id
   * @returns 隔离后的css样式
   */
  const scopedCss = (css: string, scopeId: string) => {
    if (!css.trim()) return '';
    //匹配选择器
    return css.replace(/([^{}@]+)(\{})/g, (match, selector, brace) => {
      const trimmed = selector.trim() as string;
      //跳过@media @keyframes
      if (trimmed.startsWith('@')) return match;
      //跳过已有的作用域选择器
      if (trimmed.includes(`#${scopeId}`)) return match;
      //添加作用域前缀
      const scopedSelector = trimmed.split(',').map((str: string) => `#${scopeId} ${str.trim()}`);
      return `${scopedSelector.join(',')}${brace}`;
    });
  };

  //用户自定义css
  const injectCustomCss = (css: string | undefined, scopeId: string) => {
    let styleElement = document.getElementById('custom-page-style') as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'custom-page-style';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = scopedCss(css || '', scopeId);
    return () => {
      if (styleElement) styleElement.textContent = '';
    };
  };

  return { scopedCss, injectCustomCss };
};
