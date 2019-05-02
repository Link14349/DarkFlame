'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Scene");// 新建包

    // 为DarkFlame添加方法以与Scene类交互
    DarkFlame.define("__scenes", {});
    DarkFlame.define("__using", null);
    DarkFlame.define("__fps", 0);
    DarkFlame.define("use", function (name) {
        this.__using = this.__scenes[name];
        return this;
    });
    DarkFlame.define("push", function (scene) {
        this.__scenes[scene.name] = scene;
        if (!this.__using) this.__using = scene;
        return this;
    });
    DarkFlame.define("render", function () {
        if (this.__using) this.__using.render();
        return this;
    });
    DarkFlame.define("whileRender", function (FixedUpdate, ViewUpdate) {
        let l = (new Date()).getTime(), n;
        requestAnimationFrame(function cb() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (FixedUpdate) FixedUpdate.bind(this)();
            n = (new Date()).getTime();
            this.__fps = 1000 / (n - l);
            this.render();
            l = n;
            if (ViewUpdate) ViewUpdate.bind(this)();
            requestAnimationFrame(cb.bind(this));
        }.bind(this));
    });
    DarkFlame.define("fps", function () {
        return this.__fps;
    });
    class Scene {
        constructor(name, game) {
            this.__name = name;
            this.__game = game;
            this.__cameras = {};
            this.items = [];
            this.__using = null;
            this.resources = [];
        }
        load(cb) {
            requestAnimationFrame(function fun() {
                let finishAll = true;
                for (let i = 0; i < this.resources.length; i++) {
                    if (!this.resources[i].loaded) {
                        finishAll = false;
                        break;
                    }
                }
                if (finishAll) {
                    cb(this);
                    return;
                }
                requestAnimationFrame(fun.bind(this));
            }.bind(this));
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
            this.resources = this.resources.concat(item.resources);
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