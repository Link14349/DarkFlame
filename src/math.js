!function (DarkFlame) {
    let module = new DarkFlame.Module("math");// 新建包

    class Vector extends See3D.LibraryDefineObject {
        constructor(arr) {
            super("Vector");
            this.array = [];
            if (arr.type && arr.type == "Vector") for (let i of arr.array) this.array.push(i);
            else for (let i of arr) this.array.push(i);
        }
        push(val) {
            this.array.push(val);
        }
        set(index, val) {
            this.array[index] = val;
            return this;
        }
        get(index) {
            return this.array[index];
        }
        mod() {
            let sum = 0;
            for (let i of this.array) {
                sum += i ** 2;
            }
            return Math.sqrt(sum);
        }
        get length() {
            return this.array.length;
        }
        get x() {
            return this.get(0);
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1);
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        get z() {
            return this.get(2);
        }
        set z(n) {
            this.set(2, n);
            return n;
        }
        get w() {
            return this.get(3);
        }
        set w(n) {
            this.set(3, n);
            return n;
        }
        // 点积
        dotProduct(b) {
            if (typeof b === "number") {
                console.error(new Error("Error 102: Do not support scalar and vector for dot product operations"));
                return null;
            }
            if (b.type === "Vector") {
                if (b.length != this.length) {
                    console.error(new Error("Error 100: Vector size does not match"));
                    return null;
                }
                let sum = 0;
                for (let i in this.array) {
                    sum += this.array[i] * b.array[i];
                }
                return sum;
            }
        }
        add(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] += b;
                }
                return tmp;
            } else {
                if (b.type === "Vector") {
                    if (b.length != this.length) {
                        console.error(new Error("Error 100: Vector size does not match"));
                        return null;
                    }
                    let v = [];
                    for (let i in this.array) {
                        v.push(this.array[i] + b.array[i]);
                    }
                    return new Vector(v);
                }
            }
        }
        sub(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] -= b;
                }
                return tmp;
            } else {
                if (b.type === "Vector") {
                    if (b.length != this.length) {
                        console.error(new Error("Error 100: Vector size does not match"));
                        return null;
                    }
                    let v = [];
                    for (let i in this.array) {
                        v.push(this.array[i] - b.array[i]);
                    }
                    return new Vector(v);
                }
            }
        }
        div(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] /= b;
                }
                return tmp;
            } else {
                console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
                return null;
            }
        }
        crossMul(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] *= b;
                }
                return tmp;
            } else {
                // 叉乘
                if (b.type == "Vector") {
                    let a = new Matrix(this.length, 1, [this.array]);
                    let arr = [];
                    for (let i = 0; i < b.length; i++) {
                        arr.push([b.array[i]]);
                    }
                    b = new Matrix(1, b.length, arr);
                    // console.log(a);
                    // console.log(b);
                    return a * b;
                }
                if (b.type == "Matrix") {
                    let selfMatrix = new Matrix(this.length, 1, [this.array]);
                    // console.log(selfMatrix, b);
                    let res = selfMatrix * b;
                    return new Vector(res.array[0]);
                }
            }
        }
        operatorBinaryXor(b) {
            if (typeof b === "number") {
                console.error(new Error("Error 102: Do not support scalar and vector for dot product operations"));
                return null;
            }
            if (b.type === "Vector") {
                let res = this % b;
                res /= this.mod();
                res /= b.mod();
                res = Math.acos(res);
                return probably(res);
            }
        }
        trans(type) {
            if (type.search(/vector/i)) {
                if (this.length == 2) return new Vector2(...this.array);
                if (this.length == 3) return new Vector3(...this.array);
                if (this.length == 4) return new Vector4(...this.array);
                return new Vector(this.array);
            }
        }
        norm() {
            return this / this.mod();
        }
        proj(u) {// 投影
            let v = this.norm();
            let n = v * (u % v);
            return n / (v.mod() * v.mod());
        }
        operatorEqual(b) {
            if (b.length != this.length) {
                console.error(new Error("Error 100: Vector size does not match"));
                return null;
            }
            for (let i = 0; i < this.length; i++) {
                if (b.array[i] != this.array[i]) return false;
            }
            return true;
        }
    }
    class Vector2 extends Vector {
        constructor(x = 0, y = 0) {
            if (x.type && x.type == "Vector") super(x);
            else super([x, y]);
        }
        get x() {
            return this.get(0);
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1);
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        static Zero() {
            return new Vector2();
        }
    }
    class Vector3 extends Vector {
        constructor(x = 0, y = 0, z = 0) {
            if (x.type && x.type == "Vector") super(x);
            else super([x, y, z]);
        }
        get x() {
            return this.get(0);
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1);
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        get z() {
            return this.get(2);
        }
        set z(n) {
            this.set(2, n);
            return n;
        }
        static Zero() {
            return new Vector3();
        }
    }
    class Vector4 extends Vector {
        constructor(x = 0, y = 0, z = 0, w = 1) {
            if (x.type && x.type == "Vector") super(x);
            else super([x, y, z, w]);
        }
        get x() {
            return this.get(0) / this.w;
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1) / this.w;
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        get z() {
            return this.get(2) / this.w;
        }
        set z(n) {
            this.set(2, n);
            return n;
        }
        get w() {
            return this.get(3);
        }
        set w(n) {
            this.set(3, n);
            return n;
        }
        static Zero() {
            return new Vector4();
        }
    }
    module.define("Vector", Vector);
    module.define("Vector2", Vector2);
    module.define("Vector3", Vector3);
    module.define("Vector4", Vector4);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);