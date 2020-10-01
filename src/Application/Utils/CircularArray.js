export default function CircularArray(arr, startIntex) {
  this.arr = arr;
  this.currentIndex = startIntex || 0;
}

CircularArray.prototype.next = function () {
  var i = this.currentIndex,
    arr = this.arr;
  this.currentIndex = i < arr.length - 1 ? i + 1 : 0;
  return this.current();
};

CircularArray.prototype.prev = function () {
  var i = this.currentIndex,
    arr = this.arr;
  this.currentIndex = i > 0 ? i - 1 : arr.length - 1;
  return this.current();
};

CircularArray.prototype.current = function () {
  return this.arr[this.currentIndex];
};
