/* Collapse */

import Context from '../../utils/context';
import BaseClass from '../../utils/base-class';
import Selectors from '../../utils/selectors';

const COMPONENT_KEY: string = 'collapse';
const OPEN_CLASS: string = '-show';
const TRANSITION_CLASS: string = '-transition';

export class Collapse extends BaseClass {

  _transition_time: number = 250; //hardcoded -- refer to transition/animation time in the relavant style file and ( add 50 as a buffer ) 
  _selector: string;
  _target: HTMLElement | null;
  _isAnimating: boolean;
  _parent: HTMLElement | null;
  _triggers: HTMLElement[];
  _toggleHandler: EventListener = this.toggle.bind(this);

  constructor(element: HTMLElement) {
    super(element);

    this._selector = this._element.getAttribute('aria-controls');
    this._target = this._selector ? document.getElementById(this._selector) : null;

    this._isAnimating = false;
    this._parent = this._getParent() || null;
    this._triggers = Selectors.find(`[aria-expanded][aria-controls="${this._target?.id}"]`);

    this._init();
  }

  // Getter
  static get COMPONENT_KEY() {
    return COMPONENT_KEY;
  }

  // 1.1 - Initialize Object and add eventlisteners
  _init() {
    this._element.addEventListener('click', this._toggleHandler);
  }

  // 1.2 - Dispose Object and Remove eventlisteners
  _destroy() {
    this._element.removeEventListener('click', this._toggleHandler);

    super.dispose();
  }

  // 2.1 Public Toggle method - Show / Hide
  toggle() {
    if (this._target?.classList.contains(OPEN_CLASS)) {
      this.hide();
    } else {
      this.show();
    }
  }

  // 2.2 - Show Accordion
  show() {
    if (this._isAnimating || this._target?.classList.contains(OPEN_CLASS)) return;

    if (this._parent) {
      const targetedElements: any = Selectors.find(`.-collapse[data-parentid="${this._parent.id}"]`, this._parent);

      targetedElements.forEach((element: any) => {
        if (element !== this._target && element.classList.contains(OPEN_CLASS)) {
          const id: any = element.getAttribute('id');
          const control: any = document.querySelector(`.c-collapse[aria-controls="${id}"]`) as HTMLElement;
          let elementContext: any = Context.get(control, COMPONENT_KEY) || null;
          if (!elementContext) elementContext = new Collapse(control);
          elementContext.hide();
        }
      });
    }

    if (this._triggers.length) {
      this._triggers.forEach((trigger: any) => {
        trigger.setAttribute('aria-expanded', 'true');
      });
    }

    this._isAnimating = true;

    const complete = () => {
      this._target?.classList.remove(TRANSITION_CLASS);
      if(this._target) this._target.style.height = '';
      this._isAnimating = false;
    }

    this._target?.classList.add(OPEN_CLASS);
    if(this._target) this._target.style.height = `${0}px`;
    this._target?.classList.add(TRANSITION_CLASS);
    // this._target.addEventListener('transitionend', complete, {once: true});
    if(this._target) this._target.style.height = `${this._target.scrollHeight}px`;
    setTimeout(() => { complete(); }, this._transition_time);
  }

  // 2.3 - Hide Accordion
  hide() {
    if (this._isAnimating || !this._target?.classList.contains(OPEN_CLASS)) return;

    if (this._triggers.length) {
      this._triggers.forEach((trigger: any) => {
        trigger.setAttribute('aria-expanded', 'false');
      });
    }

    this._isAnimating = true;

    const complete = () => {
      this._target?.classList.remove(TRANSITION_CLASS);
      this._target?.classList.remove(OPEN_CLASS);
      if(this._target) this._target.style.height = '';
      this._isAnimating = false;
    }

    this._target.style.height = `${this._target.getBoundingClientRect().height}px`;
    // if(this._target) this._target.offsetHeight;
    this._target.classList.add(TRANSITION_CLASS);
    // this._target.addEventListener('transitionend', complete, {once: true});
    this._target.style.height = `${0}px`;
    setTimeout(() => { complete(); }, this._transition_time);
  }

  // 3 - Utils
  // 3.1 - Return wrapping parent element
  _getParent() {
    const parentId:string | null = this._target?.hasAttribute('data-parentid') ? this._target.getAttribute('data-parentid') : null;
    if(parentId) return document.getElementById(parentId);
    return null;

  }

  /** Static Interface to check for an existing instance, create new if required and return the Instance
   * @param {*} element:HTMLElement - will be bound to _element property on the instance 
   * @returns class instance with parameter bound to _element
   */
  static initInterface(element: HTMLElement) {
    const context:Collapse = Context.get(element, COMPONENT_KEY);
    if (context) return context;
    return new Collapse(element);
  }
}

export const collapseComponent = () => {
  const collapseComponents = [].slice.call(document.querySelectorAll('.c-collapse[aria-expanded][aria-controls]') as NodeListOf<HTMLElement>) || [];

  collapseComponents.map((item: HTMLElement) => Collapse.initInterface(item));
};
