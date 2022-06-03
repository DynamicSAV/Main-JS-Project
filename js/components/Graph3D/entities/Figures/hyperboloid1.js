figure.prototype.Hyperboloid1 = (a = 1, b = 1, c = 1, count = 10, color) => {
    const points = [];
    const edges = [];
    const polygons = []
    const twoPi = 2 * Math.PI;

    let t = -Math.PI;
    let dt = Math.PI / count;
    let df = twoPi / count;
    while (t <= Math.PI) {
        let f = -twoPi;
        while (f < twoPi) {
            points.push(new Point(
                a * Math.cosh(t) * Math.cos(f),
                b * Math.sinh(t),
                c * Math.cosh(t) * Math.sin(f)
            ));
            f += df;
        };
        t += df;
    }




    for (let i = 0; i < points.length; i++) {
        if (points[i + 1]) {
            if ((i + 1) % count == 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        }

        if (points[i + 1] && points[i + count + 1]) {
            if ((i + 1) % (count) == 0) {
                polygons.push(new Polygon([i, i + count, i + 1, i - count + 1], color));
            } else {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], color))
            }
            // if (i + 1 == (points.length - 1) - (count)) {
            //     polygons.push(new Polygon([i + 1, i + 1 + count, i + 1 + 1, i + 1 - count + 1], color));
            // }
        }
    }


    return new Subject(points, edges, polygons)

}