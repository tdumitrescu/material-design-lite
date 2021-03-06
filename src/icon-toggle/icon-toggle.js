/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The MaterialIconToggle class wraps a Material Design icon toggle component.
 *
 * @export
 */
class MaterialIconToggle extends MaterialComponent {
  /**
   * Initialize icon toggle from a DOM node.
   *
   * @param {Element=} optRoot The element being upgraded.
   */
  constructor(optRoot) {
    super(optRoot);

    // Check if the root has the right class.
    if (!this.root_.classList.contains(this.constructor.cssClasses_.ROOT)) {
      throw new Error('MaterialIconToggle missing ' +
          `${this.constructor.cssClasses_.ROOT} class.`);
    }

    // Look for required sub-nodes in the root's DOM.
    this.input_ =
        this.root_.querySelector(`.${MaterialIconToggle.cssClasses_.INPUT}`);
    if (!this.input_) {
      throw new Error('MaterialIconToggle missing ' +
          `${MaterialIconToggle.cssClasses_.INPUT} node.`);
    }

    this.label_ =
        this.root_.querySelector(`.${MaterialIconToggle.cssClasses_.LABEL}`);
    if (!this.label_) {
      throw new Error('MaterialIconToggle missing ' +
          `${MaterialIconToggle.cssClasses_.LABEL} node.`);
    }

    // Initialize event listeners.
    this.changeListener_ = this.refresh.bind(this);
    this.focusListener_ = () => this.root_.classList.add(
        MaterialIconToggle.cssClasses_.IS_FOCUSED);
    this.blurListener_ = () => this.root_.classList.remove(
        MaterialIconToggle.cssClasses_.IS_FOCUSED);
    this.mouseUpListener_ = this.blur_.bind(this);

    // Finalize initialization.
    this.init_();
  }

  /**
   * Creates the DOM subtree for a new component.
   * Greatly simplifies programmatic component creation.
   *
   * @protected
   * @nocollapse
   * @return {Element} The DOM subtree for the component.
   */
  static buildDom_() {
    let root = document.createElement('label');
    let input = document.createElement('input');
    let label = document.createElement('i');
    root.classList.add(MaterialIconToggle.cssClasses_.ROOT);
    input.type = 'checkbox';
    input.classList.add(MaterialIconToggle.cssClasses_.INPUT);
    root.appendChild(input);
    label.classList.add(MaterialIconToggle.cssClasses_.LABEL);
    label.classList.add(MaterialIconToggle.cssClasses_.MATERIAL_ICON);
    root.appendChild(label);

    return root;
  }

  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get cssClasses_() {
    return {
      ROOT: 'mdl-icon-toggle',
      JS: 'mdl-js-icon-toggle',
      INPUT: 'mdl-icon-toggle__input',
      LABEL: 'mdl-icon-toggle__label',

      MATERIAL_ICON: 'material-icons',

      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked'
    };
  }

  /**
   * Attach all listeners to the DOM.
   *
   * @export
   */
  addEventListeners() {
    this.input_.addEventListener('change', this.changeListener_);
    this.input_.addEventListener('focus', this.focusListener_);
    this.input_.addEventListener('blur', this.blurListener_);
    this.root_.addEventListener('mouseup', this.mouseUpListener_);
  }

  /**
   * Remove all listeners from the DOM.
   *
   * @export
   */
  removeEventListeners() {
    this.input_.removeEventListener('change', this.changeListener_);
    this.input_.removeEventListener('focus', this.focusListener_);
    this.input_.removeEventListener('blur', this.blurListener_);
    this.root_.removeEventListener('mouseup', this.mouseUpListener_);
  }

  /**
   * Set "checked" value on icon toggle.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set checked(value) {
    this.input_.checked = Boolean(value);
    this.refresh();
  }

  /**
   * Return "checked" value on icon toggle.
   *
   * @return {boolean} The current value of the property.
   * @export
   */
  get checked() {
    return this.input_.checked;
  }

  /**
   * Disable / enable the icon toggle component.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set disabled(value) {
    this.input_.disabled = Boolean(value);
    this.refresh();
  }

  /**
   * Return whether the icon toggle component is disabled or enabled.
   *
   * @return {boolean} The current value of the property.
   * @export
   */
  get disabled() {
    return this.input_.disabled;
  }

  /**
   * Return the label element for the icon toggle.
   *
   * @return {Element?} The label for the icon toggle.
   * @export
   */
  get label() {
    return this.label_;
  }

  /**
   * Run a visual refresh on the component, in case it's gone out of sync.
   *
   * @export
   */
  refresh() {
    this.checkDisabled_();
    this.checkToggleState_();
  }

  /**
   * Add blur.
   *
   * @private
   */
  blur_() {
    requestAnimationFrame(() => this.input_.blur());
  }

  /**
   * Check the input's toggle state and update display.
   *
   * @private
   */
  checkToggleState_() {
    if (this.input_.checked) {
      this.root_.classList.add(MaterialIconToggle.cssClasses_.IS_CHECKED);
    } else {
      this.root_.classList.remove(MaterialIconToggle.cssClasses_.IS_CHECKED);
    }
  }

  /**
   * Check the input's disabled state and update display.
   *
   * @private
   */
  checkDisabled_() {
    if (this.input_.disabled) {
      this.root_.classList.add(MaterialIconToggle.cssClasses_.IS_DISABLED);
    } else {
      this.root_.classList.remove(MaterialIconToggle.cssClasses_.IS_DISABLED);
    }
  }
}
