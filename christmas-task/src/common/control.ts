
class Control<NodeType extends HTMLElement | SVGElement = HTMLElement>{
  public node: NodeType;

  constructor(parentNode: HTMLElement | SVGElement | null, tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
  
}

export default Control;