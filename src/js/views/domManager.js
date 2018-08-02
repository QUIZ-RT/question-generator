class DomManager {
  static getAParaNode(text, className) {
    const paraElement = document.createElement('p');
    paraElement.className = className;
    const textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }
}
export default DomManager;
