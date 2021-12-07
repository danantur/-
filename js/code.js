let example = document.getElementById("canvas"),
			    ctx     = example.getContext('2d');

ctx.strokeStyle = "#960200"

let a = document.getElementById("a"),
    b = document.getElementById("b"),
    c = document.getElementById("c"),
    eq = document.getElementById("="),
    submit = document.getElementById("submit");

submit.addEventListener("click", function() {
    ctx.clearRect(0, 0, example.width, example.height);
    let w = canvas.width;
    ctx.width = 1;
    ctx.width = w;
    drawParabol(Number(a.value), Number(b.value), Number(c.value), eq.value);
})

const pogreshnost = Math.round(640 / 58);

function drawParabol(a_, b_, c_, eq_) {
    let moved = false;
    if (eq_.length == 0) {
        ctx.beginPath();
        for (let i = 0; i <= 640; i++) {
            let x = (i - 320)/pogreshnost;
            let y = (-1 * (a_ * (x ** 2) + (b_ * x) + c_))*pogreshnost;

            if (y <= 340 && y >= -340) {
                if (!moved) {
                    moved = true;
                    ctx.moveTo(i, y + 320);
                }
                else {
                    ctx.lineTo(i, y + 320)
                }
            }
        }
        ctx.stroke();
    } else {
        c_ -= eq.value;

        let d = b_ ** 2 - 4 * a_ * c_;

        if (d < 0) {
            alert("нет решений");
            return;
        }

        d = -Math.sqrt(Math.abs(d))

        let x1 = (-b_ + d) / 2 * a_;
        let x2 = (-b_ - d) / 2 * a_;

        if (x1 <= 320 && x1 >= -320) {
            ctx.beginPath();
            ctx.moveTo(x1*pogreshnost + 320, 0);
            ctx.lineTo(x1*pogreshnost + 320, 640);
            ctx.stroke();
        }

        if (x2 <= 320 && x2 >= -320) {
            ctx.beginPath();
            ctx.moveTo(x2*pogreshnost + 320, 0);
            ctx.lineTo(x2*pogreshnost + 320, 640);
            ctx.stroke();
        }
    }
}