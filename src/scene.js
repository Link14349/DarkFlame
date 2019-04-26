'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Scene");// 新建包

    // 为DarkFlame添加方法以与Scene类交互
    DarkFlame.define("__scenes", {});
    DarkFlame.define("__using", null);
    DarkFlame.define("use", function (name) {
        this.__using = this.__scenes[name];
        return this;
    });
    DarkFlame.define("push", function (scene) {
        this.__scenes[scene.name] = scene;
        if (!this.__using) this.__using = scene;
        return this;
    });
    class Scene {
        constructor(name, game) {
            this.__name = name;
            this.__game = game;
            this.__cameras = {};
            this.items = [];
            this.__using = null;
        }
        render() {
            if (this.__using) this.__using.render();
            return this;
        }
        bind(camera) {
            this.__cameras[camera.name] = camera;
            if (!this.__using) this.__using = camera;
            return this;
        }
        push(item) {
            this.items.push(item);
        }
        use(name) {
            this.__using = this.__cameras[name];
            return this;
        }
        get name() {
            return this.__name;
        }
        get game() {
            return this.__game;
        }
        get canvas() {
            return this.__game.__canvas;
        }
        get ctx() {
            return this.__game.__ctx;
        }
    }
    module.define("Scene", Scene);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);