'bpo enable';

!function (DarkFlame) {
    let module = new DarkFlame.Module("Texture");// 新建包

    class Texture {
        constructor(url, {
            sx = 0, sy = 0,
            ex = 256, ey = 512
        } = {}) {
            this.url = url;
            let image = new Image();
            image.src = url;
            this.image = image;
            this.onload = null;
            this.onerror = null;
            this.clip = {sx, sy, ex, ey};
            this.loaded = false;
            image.onload = function (e) {
                this.loaded = true;
                if (this.onload) this.onload(this, e);
            }.bind(this);
            image.onerror = function (e) {
                console.error(new DarkFlame.DarkFlameError("Http(s)", "Load image '" + url + "'" + " failed"));
                console.error(e);
                if (this.onerror) this.onerror(this, e);
            }.bind(this);
        }
        load(cb) {
            this.onload = cb;
        }
        error(cb) {
            this.onerror = cb;
        }
        get width() {
            return this.clip.ex - this.clip.sx;
        }
        get height() {
            return this.clip.ey - this.clip.sy;
        }
    }

    module.define("Texture", Texture);

    module.bind();// 将包加入DarkFlame static member中
}(DarkFlame);