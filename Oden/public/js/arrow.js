function canvas_arrow(context, fromx, fromy, tox, toy, length, opacity) {
    const angle = Math.atan2(toy - fromy, tox - fromx);

    // Recalculer tox, toy pour correspondre à la longueur souhaitée
    tox = fromx + length * Math.cos(angle);
    toy = fromy + length * Math.sin(angle);

    const headlen = 10;

    context.strokeStyle = `rgba(200, 0, 0, ${opacity})`;
    context.lineWidth = 5;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);

    context.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 6),
        toy - headlen * Math.sin(angle + Math.PI / 6)
    );
}
