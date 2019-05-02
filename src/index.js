'bpo enable';

let DarkFlame = (function () {
    class DarkFlameError extends Error {
        constructor(name, message) {
            super(message);
            this.name = name;
        }
    }
    class DarkFlame {
        constructor(canvas) {
            this.__canvas = canvas;
            this.__ctx = canvas.getContext("2d");
        }
        get canvas() {
            return this.__canvas;
        }
        get ctx() {
            return this.__ctx;
        }
        static define(attr, value) {
            this.prototype[attr] = value;
        }
    }
    class Module {
        constructor(name) {
            if (DarkFlame[name]) {
                throw new DarkFlameError("Module", "Already have module in DarkFlame: '" + name + "'");
            }
            this.name = name;
            this.defines = {};
        }
        define(attr, value) {
            this.defines[attr] = value;
            return this;
        }
        bind() {
            DarkFlame[this.name] = this.defines;
            return this;
        }
    }
    class ModuleClass {
        constructor(type) {
            this.type = type;
        }
        define(attr, value) {
            this[attr] = value;
            return this;
        }
    }
    DarkFlame.DarkFlameError = DarkFlameError;
    DarkFlame.Module = Module;
    DarkFlame.Module.ModuleClass = ModuleClass;
    return DarkFlame;
})();