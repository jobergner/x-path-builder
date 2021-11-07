"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = void 0;
function select(targetKind) {
    return new Element(targetKind || "*");
}
exports.select = select;
var Element = /** @class */ (function () {
    function Element(kind) {
        this.kind = "";
        this.containedText = "";
        this.attributes = {};
        this.kind = kind;
    }
    Element.prototype.withText = function (text) {
        this.containedText = text;
        return this;
    };
    Element.prototype.withAttributes = function (attrs) {
        this.attributes = __assign(__assign({}, this.attributes), attrs);
        return this;
    };
    Element.prototype.hasDescendant = function (el) {
        this.descendant = el;
        return this;
    };
    Element.prototype.hasAncestor = function (el) {
        this.ancestor = el;
        return this;
    };
    Element.prototype.first = function () {
        return "(//" + convertToXPath(this) + ")[1]";
    };
    Element.prototype.all = function () {
        return "//" + convertToXPath(this);
    };
    return Element;
}());
function convertToXPath(el) {
    var attrsArray = Object.keys(el.attributes).map(function (key) { return ({ key: key, value: el.attributes[key] }); });
    var attrsStrings = attrsArray.map(function (_a) {
        var key = _a.key, value = _a.value;
        return "@" + key + "='" + value + "'";
    });
    var and = attrsStrings.length === 0 ? "" : " and ";
    var textQuery = !el.containedText ? "" : and + "contains(., '" + el.containedText + "')";
    var ancestorXPath = !el.ancestor ? "" : and + "ancestor::" + convertToXPath(el.ancestor);
    var descendantXPath = !el.descendant ? "" : and + ".//" + convertToXPath(el.descendant);
    return el.kind + "[" + attrsStrings.join(" and ") + textQuery + descendantXPath + ancestorXPath + "]";
}
//# sourceMappingURL=index.js.map