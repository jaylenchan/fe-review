# 类图

![img](class-diagram.png)

描述类的静态结构，定义类及描述类之间的关系。

## 类的组成

UML中，类用矩形来表示。分成三部分，分别是名称、属性、操作。

## 类之间的联系

Association:关联
Aggregation:聚合
Composition:组合
Dependency:依赖
Generalization:泛化
Interface-Realization:接口实现

多个类之间或多或少有一定的联系，这些联系在类图上的表示是连线+箭头。

- 依赖关系(Dependency)：B类实例的属性是A类实例：动物--->水（虚线+箭头）
- 泛化关系(Generalization)：B类继承A类： 鸟——▷动物（虚线+白空心箭头）
- 实现关系(Implementation)：B类实现A接口：鸟---▷下蛋（虚线+白空心箭头）
- 关联关系(Association)：B类跟A类的对应关系：

      唐老鸭1——1唐老爸
      唐老鸭1——0..*唐老鸭的朋友
      唐老鸭1——0,1唐老鸭的妻子

- 聚合关系(Aggregation)：整体和部分的关系，部分可以离开整体： 大雁——◇雁群（实线+白空心菱形）
- 组合关系(Composition)：整体和部分的关系，部分没法离开整体： 大雁的脚——◆大雁 （实线+黑实心菱形）
