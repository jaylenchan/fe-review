## 回流

当render tree中的一些元素（或者全部元素）因为元素的尺寸，布局，隐藏等改变而需要让这部分重新构建话，这就叫做回流

当页面布局和几何属性改变时，就会引起回流

### 触发回流的属性

- 盒子模型相关属性
  - `width/height/padding/margin/display/border-width/border/min-height/min-width`
- 定位属性+浮动属性
  - `top/bottom/left/right/position/float/clear`
- 节点内部文字结构改变
  - `text-align/overflow-y/font-weight/overflow/font-family/line-height/vertical-align/white-space/font-size`

## 重绘

当render tree中的一些元素（或者全部元素）因为元素的外观，风格需要让这部分重新绘制而不会引起布局的改变的话，这就叫做重绘

### 触发重绘的属性

- `color/border-style/border-radius/visibility/text-decoration/background/background-position/background-repeat/background-size/outline-color/outline/outline-style/outline-width/box-shadow`

## 回流和重绘的关系

回流一定会重绘，重绘不一定会引起回流

## 优化方案

- 将频繁回流和重绘的DOM元素作为一个单独的图层。这样子，这个DOM元素的回流和重绘都只会在这个图层中。
  - chrome是如何根据需要创建新图层的？
    - 通过3D或者透视变换的CSS属性（perspective transform）
    - 使用加速视频解码的`<vedio>`节点
    - 拥有3D（webgl）上下文或者加速2D上下文的`<canvas>`节点
    - 混合插件（flash）
    - 需要对自己的opacity做CSS动画/或者使用一个动画webkit变换的元素
    - 拥有加速CSS过滤器的元素
    - 元素拥有一个包含复合层的后代节点（就是一个元素有子元素，这个子元素在自己的层里）
    - 元素拥有一个子元素，这个子元素的z-index较低而且这个子元素有一个复合层的兄弟元素。（就是元素在一个复合层上边渲染）

## 实战技术

- translate替代top：因为top会引起reflow，而translate不会。应用场景：页面浮窗飘动

- opacity替代visibility：因为visibility会触发重绘的过程。
