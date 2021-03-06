var math = require("mathjs");

const regla_falsa = {

    evaluate: (f, xi, xs, iter, tol, error) => {
        const parser = math.parser();
        parser.evaluate("f(x)=" + f);
        var table = [], msg,
            fxi = parser.evaluate("f(" + xi + ")"),
            fxs = parser.evaluate("f(" + xs + ")");
        if (0 === fxi)
            msg = "Xi = " + xi + " es una raíz";
        else if (0 === fxs)
            msg = "Xu = " + xs + " es una raíz";
        else if (fxi * fxs < 0) {
            var xa, xm = xi - fxi * (xs - xi) / (fxs - fxi),
                fxm = parser.evaluate("f(" + xm + ")"),
                n = 0, e = tol + 1;
            table.push([n, xi, xs, xm, fxm, ""])
            while (e > tol && 0 !== fxm && n < iter - 1) {
                if (fxi * fxm < 0) {
                    xs = xm;
                    fxs = fxm;
                } else {
                    xi = xm;
                    fxi = fxm;
                }
                xa = xm;
                xm = xi - fxi * (xs - xi) / (fxs - fxi);
                fxm = parser.evaluate("f(" + xm + ")");
                e = Math.abs(xm - xa);
                if (error === "1") e /= xm;
                n += 1;
                table.push([n, xi, xs, xm, fxm, e]);
            }
            0 === fxm
                ? msg = "Aproximación a la raíz xm=" + xm + " donde $f(Xm)=0"
                : e < tol
                    ? msg = "Aproximación a la raíz xm=" + xm + " con $Error=" + e
                    : msg = "Fracaso en " + iter + " iteraciones, hasta el momento xm=" + xm
        } else {
            msg = "El intervalo es inadecuado, encuentre uno con cambio de signo en f(x)";
        }

        console.log("n    xi     xs    xm    fxm     error");
        table.map((value) => (console.log(value)))
        console.log(msg);
        
        return { table, msg }
    }

}