'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Camera");// 新建包

    class Camera {
        constructor(position, rotation = 0, size, name, scene) {
            this.__name = name;
            this.__scene = scene;
            this.position = position;
            this.rotation = new DarkFlame.math.Vector3(0, 0, rotation);
            this.size = size;
            scene.bind(this);
        }
        render() {
            let __items = this.items;
            let items = [];
            let ctx = this.ctx;
            let {width, height} = this.canvas;
            // ctx.save();
            // console.log(width, height);
            // ctx.translate(width / 2, height / 2);
            for (let i = 0; i < __items.length; i++) {
                let item = __items[i].copy();

                // 进行相机坐标变换
                item.position.x -= this.position.x;
                item.position.y -= this.position.y;

                let p = new DarkFlame.math.Vector4(item.position.x, item.position.y, item.position.z);
                p = p.mul(DarkFlame.math.Matrix.TransRotateInverse(new DarkFlame.math.Vector3(this.rotation)));
                item.position.x = p.x;
                item.position.y = p.y;

                items.push(item);// 向经过转换的items塞入该对象
            }
            items.sort((a, b) => {// 图层小的先渲染，图层大的后渲染
                return a.position.z - b.position.z;
            });
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let screenPos = new DarkFlame.math.Vector2(
                    item.position.x + width / 2, -item.position.y + height / 2// 之所以反转是因为屏幕坐标向下y增加，而引擎中向上y增加
                );
                // if (s) {
                //     console.log(s.x == screenPos.x && s.y == screenPos.y);
                // }
                if (item.type == "Sprite") {
                    ctx.save();
                    ctx.translate(screenPos.x, screenPos.y);
                    ctx.rotate(-item.rotation.z);
                    ctx.drawImage(item.texture.image, -item.texture.width / 2, -item.texture.height / 2);
                    // ctx.rotate(-item.rotation.z);
                    ctx.restore();
                }
            }
            // console.log(items);
            // ctx.restore();
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