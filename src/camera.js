'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Camera");// 新建包

    class Camera {
        constructor(position, size, name, scene) {
            this.__name = name;
            this.__scene = scene;
            this.position = position;
            this.size = size;
            scene.bind(this);
        }
        render() {
            let __items = this.items;
            let items = [];
            let ctx = this.ctx;
            let move = DarkFlame.math.Matrix.TransMoveInverse(this.position);
            for (let i = 0; i < __items.length; i++) {
                let item = __items[i].copy();
                items.push(item);// 向经过转换的items塞入该对象

                // 进行相机坐标变换
                item.position = item.position * move;
            }
            console.log(items);
            return this;
        }
        get name() {
            return this.__name;
        }
        get scene() {
            return this.__scene;
        }
        get game() {
            return this.__scene.__game;
        }
        get canvas() {
            return this.__scene.__game.__canvas;
        }
        get ctx() {
            return this.__scene.__game.__ctx;
        }
        get items() {
            return this.__scene.items;
        }
    }
    module.define("Camera", Camera);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);