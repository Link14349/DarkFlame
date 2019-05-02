'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Item");// 新建包

    class Item extends DarkFlame.Module.ModuleClass {
        constructor(position = DarkFlame.math.Vector3.Zero(), rotation = 0, type = "Item") {
            super(type);
            this.position = position;
            this.rotation = new DarkFlame.math.Vector3(0, 0, rotation);
            this.resources = [];
            this.crashers = [];
            this.points = [];
        }

        copy() {
            // console.log(this == (new Object(this)));
            return _.cloneDeep(this);
        }

        loadCrashers(json) {
            // json格式
            /*
            * {
            *   points: [
            *       [x1, y1],
            *       [x2, y2],
            *       ...
            *   ],
            *   crashers: [
            *       {
            *           type: "parm",
            *           sp: pointID,
            *           ep: pointID
            *       },
            *       {
            *           type: "circle",
            *           r: 10,
            *           o: pointID
            *       }
            *   ]
            * }
            */

            // 载入所有点
            for (let i = 0; i < json.points.length; i++) {
                this.points.push(new DarkFlame.math.Vector3(json.points[i][0], json.points[i][1], this.position.z));
            }

            // 载入所有碰撞曲线
            for (let i = 0; i < json.crashers.length; i++) {
                let crasher = json.crashers[i];
                if (crasher.type == "parm") {
                    let {sp: sp_, ep: ep_} = crasher;
                    let sp = this.points[sp_];
                    let ep = this.points[ep_];
                    let lx = ep[0] - sp[0];
                    let ly = ep[1] - sp[1];
                    let alpha = Math.atan(ly / lx);
                    let beta = Math.PI / 2 - alpha;
                    let n = new DarkFlame.math.Vector3(Math.cos(beta), Math.sin(beta), this.position.z);
                    let p0 = new DarkFlame.math.Vector3(sp.x, sp.y, this.position.z);
                    this.crashers.push({
                        type: "parm",
                        n: n,
                        p0: p0,
                        sp: sp, ep: ep
                    });
                } else if (crasher.type == "circle") {
                    this.crashers.push({
                        type: "circle",
                        r: crasher.r,
                        o: crasher.o,
                    });
                } else {
                    throw new DarkFlame.DarkFlameError("Crasher", "Illegal type: '" + crasher.type + "'");
                }
            }
        }

        rotate(r) {
            this.rotation.z += r;

            // 转换点
            let rotationMatrix = DarkFlame.math.Matrix.TransRotate(new DarkFlame.math.Vector4(0, 0, r));
            for (let i = 0; i < this.points.length; i++) {
                let p = new DarkFlame.math.Vector4(this.points[i].x, this.points[i].y, this.points[i].z).mul(rotationMatrix);
                this.points[i].x = p.x;
                this.points[i].y = p.y;
                this.points[i].z = p.z;
            }

            // 重新计算直线的法线向量和p0
            for (let i = 0; i < this.crashers.length; i++) {
                let crasher = this.crashers[i];
                if (crasher.type == "parm") {
                    let {sp, ep} = crasher;
                    let lx = ep.x - sp.x;
                    let ly = ep.y - sp.y;
                    let alpha = Math.atan(ly / lx);
                    let beta = Math.PI / 2 - alpha;
                    let n = new DarkFlame.math.Vector3(Math.cos(beta), Math.sin(beta), this.position.z);
                    let p0 = new DarkFlame.math.Vector3(sp.x, sp.y, this.position.z);
                    crasher.n = n;
                    crasher.p0 = p0;
                }
            }
        }
    }

    class Sprite extends Item {
        constructor(texture, position = DarkFlame.math.Vector3.Zero(), rotation = 0) {
            super(position, rotation, "Sprite");
            this.texture = texture;
            this.resources.push(texture);
        }
    }

    module.define("Item", Item);
    module.define("Sprite", Sprite);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);