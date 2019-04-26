'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Item");// 新建包

    class Item {
        constructor(position = DarkFlame.math.Vector3.Zero(), rotation = DarkFlame.math.Vector3.Zero()) {
            this.position = position;
            this.rotation = rotation;
        }
        copy() {
            return new Object(this);
        }
    }

    module.define("Item", Item);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);