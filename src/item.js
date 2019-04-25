!function (DarkFlame) {
    let module = new DarkFlame.Module("Item");// 新建包

    class Item {}

    module.define("Item", Item);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);