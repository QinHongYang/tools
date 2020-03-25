'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function typer(value) {
    var typeStr = Object.prototype.toString.call(value);
    return typeStr.slice(8, -1).toLowerCase();
}

exports.typer = typer;
