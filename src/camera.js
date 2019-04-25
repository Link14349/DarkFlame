!function (DarkFlame) {
    let module = new DarkFlame.Module("Scene");// 新建包

    class Camera {
        constructor(name, position, size, scene) {
            this.__name = name;
            this.__scene = scene;
            this.position = position;
            this.size = size;
        }
        render() {
            let items = this.items;
            let ctx = this.ctx;
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