/**
 * ParentSlider
 * - 모든 슬라이더의 부모 클래스
 */

import ParentUI from './core/ParentUI.js';

export default class ParentSlider extends ParentUI {
  constructor() {
    if (new.target === ParentSlider) {
      throw new TypeError('Slider 인스턴스를 직접 생성할 수 없음');
    }
    super();

    // ui state data
    this.activeIndex = 0;
    this.direction = '';
    this.activeOld = '';
  }

  /* state data */

  _updateDirection(direction) {
    this.direction = direction || this._getDirection();
  }

  /* ui */

  _activeContent(oldIndex, newIndex) {
    const oldIndexSet = this._calcSlideIndexSet(oldIndex);
    const newIndexSet = this._calcSlideIndexSet(newIndex);

    this._removeDirectionClass(oldIndexSet);      
    // this._addDirectionClass(newIndexSet, direction);
    this._addDirectionClass(newIndexSet, 'next');    
  }
  _calcSlideIndex(i) {
    return (this.maxIndex + i) % this.maxIndex;
  }
  _calcSlideIndexSet(i) {
    return {
      prev: this._calcSlideIndex(i - 1),
      current: this._calcSlideIndex(i),
      next: this._calcSlideIndex(i + 1)
    }
  }
  _getDirection(oldIndex, newIndex) {
    const gap = newIndex - oldIndex;
    return (gap === 1 || gap < -1)? 'next' : 'prev';
  }
  _removeDirectionClass(indexSet) {
    ['prev', 'current', 'next'].forEach((dir) => {
      const dirIndex = indexSet[dir];
      this.contentItems.item(dirIndex).classList.remove(dir);    
    });
  }
  _addDirectionClass(indexSet, direction) {
    this.contentBox.dataset.direction = direction;

    ['prev', 'current', 'next'].forEach((dir) => {
      const dirIndex = indexSet[dir];
      this.contentItems.item(dirIndex).classList.add(dir);    
    });
  }

  /* event */

  _isPrevBtn(elem) {
    return elem.classList.contains('prev');
  }
  _isNextBtn(elem) {
    return elem.classList.contains('next');
  }
}

