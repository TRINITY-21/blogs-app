/** @format */

!(function (e) {
	function t(t) {
		for (
			var o, l, a = t[0], s = t[1], c = t[2], d = 0, f = [];
			d < a.length;
			d++
		)
			(l = a[d]),
				Object.prototype.hasOwnProperty.call(r, l) && r[l] && f.push(r[l][0]),
				(r[l] = 0);
		for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
		for (u && u(t); f.length; ) f.shift()();
		return i.push.apply(i, c || []), n();
	}
	function n() {
		for (var e, t = 0; t < i.length; t++) {
			for (var n = i[t], o = !0, a = 1; a < n.length; a++) {
				var s = n[a];
				0 !== r[s] && (o = !1);
			}
			o && (i.splice(t--, 1), (e = l((l.s = n[0]))));
		}
		return e;
	}
	var o = {},
		r = { 0: 0 },
		i = [];
	function l(t) {
		if (o[t]) return o[t].exports;
		var n = (o[t] = { i: t, l: !1, exports: {} });
		return e[t].call(n.exports, n, n.exports, l), (n.l = !0), n.exports;
	}
	(l.m = e),
		(l.c = o),
		(l.d = function (e, t, n) {
			l.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
		}),
		(l.r = function (e) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(e, "__esModule", { value: !0 });
		}),
		(l.t = function (e, t) {
			if ((1 & t && (e = l(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var n = Object.create(null);
			if (
				(l.r(n),
				Object.defineProperty(n, "default", { enumerable: !0, value: e }),
				2 & t && "string" != typeof e)
			)
				for (var o in e)
					l.d(
						n,
						o,
						function (t) {
							return e[t];
						}.bind(null, o)
					);
			return n;
		}),
		(l.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
							return e.default;
					  }
					: function () {
							return e;
					  };
			return l.d(t, "a", t), t;
		}),
		(l.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(l.p = "");
	var a = (window.webpackJsonp = window.webpackJsonp || []),
		s = a.push.bind(a);
	(a.push = t), (a = a.slice());
	for (var c = 0; c < a.length; c++) t(a[c]);
	var u = s;
	i.push([2, 1]), n();
})({
	2: function (e, t, n) {
		"use strict";
		n.r(t);
		var o = n(0);
		function r(e, t) {
			for (var n = 0; n < t.length; n++) {
				var o = t[n];
				(o.enumerable = o.enumerable || !1),
					(o.configurable = !0),
					"value" in o && (o.writable = !0),
					Object.defineProperty(e, o.key, o);
			}
		}
		var i = (function () {
				function e(t) {
					!(function (e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function");
					})(this, e),
						(this.rootEl = t),
						(this.buttonEl = this.rootEl.querySelector(
							"button[aria-expanded]"
						));
					var n = this.buttonEl.getAttribute("aria-controls");
					(this.contentEl = document.getElementById(n)),
						(this.open =
							"true" === this.buttonEl.getAttribute("aria-expanded")),
						this.buttonEl.addEventListener(
							"click",
							this.onButtonClick.bind(this)
						);
				}
				var t, n, o;
				return (
					(t = e),
					(n = [
						{
							key: "onButtonClick",
							value: function () {
								this.toggle(!this.open);
							},
						},
						{
							key: "toggle",
							value: function (e) {
								if (e !== this.open)
									if (
										((this.open = e),
										this.buttonEl.setAttribute("aria-expanded", "".concat(e)),
										e)
									) {
										var t = this.rootEl.id;
										history.replaceState(null, null, "#".concat(t)),
											this.contentEl.removeAttribute("hidden");
									} else
										history.replaceState(null, null, " "),
											this.contentEl.setAttribute("hidden", "");
							},
						},
						{
							key: "openAccordion",
							value: function () {
								this.toggle(!0);
							},
						},
						{
							key: "closeAccordion",
							value: function () {
								this.toggle(!1);
							},
						},
					]) && r(t.prototype, n),
					o && r(t, o),
					Object.defineProperty(t, "prototype", { writable: !1 }),
					e
				);
			})(),
			l = n(1),
			a = n.n(l);
		document.addEventListener("DOMContentLoaded", function () {
			new a.a({
				trigger: {
					once: !0,
					offset: {
						viewport: {
							x: 0,
							y: function (e, t, n) {
								return e.visible ? 0 : 0.4;
							},
						},
					},
				},
			}).add(".js-trigger");
			var e = document.querySelector(".site-header__menu");
			if (
				(document
					.querySelector(".js-nav-toggle")
					.addEventListener("click", function (t) {
						t.preventDefault, e.classList.toggle("menu-open");
					}),
				document.querySelectorAll(".js-stat-slider").length > 0)
			)
				Object(o.tns)({
					autoplay: !1,
					container: ".js-stat-slider",
					loop: !1,
					items: 1,
					nav: !1,
					speed: 500,
					controlsText: ["Previous", "Next"],
					responsive: { 768: { items: 3, slideBy: 1 } },
				});
			if (document.querySelectorAll(".js-tab-slider").length > 0)
				Object(o.tns)({
					autoplay: !1,
					autoHeight: !0,
					container: ".js-tab-slider",
					loop: !1,
					items: 1,
					nav: !1,
					speed: 500,
					controlsText: ["Previous", "Next"],
					responsive: { 768: { items: 2, slideBy: 1 }, 1024: { disable: !0 } },
				});
			if (document.querySelectorAll(".js-news-slider").length > 0)
				Object(o.tns)({
					autoplay: !0,
					autoplayButtonOutput: !1,
					autoplayTimeout: 3e3,
					container: ".js-news-slider",
					controls: !1,
					loop: !0,
					items: 1,
					nav: !0,
					navPosition: "bottom",
					speed: 750,
					responsive: { 768: { disable: !0 } },
				});
		}),
			document.querySelectorAll(".js-accordion").forEach(function (e) {
				var t = e.id;
				window[t] = new i(e);
			});
		var s = window.location.hash;
		if (s.length > 1) {
			window[s.slice(1)].openAccordion();
		} else {
			var c = document.querySelector(".js-accordion");
			if (c) {
				var u = c.id;
				window[u].openAccordion();
			}
		}
		var d = document.querySelectorAll(".js-tab-slider .tab-slider__card");
		d.forEach(function (e) {
			e.addEventListener("click", function () {
				d.forEach(function (e) {
					e.classList.remove("is-active");
				}),
					e.classList.add("is-active");
			});
		});
		var f = document.querySelectorAll(".js-tab-slider .tab-slider__card-label");
		f.forEach(function (e) {
			e.addEventListener("focus", function () {
				f.forEach(function (e) {
					e.parentNode.classList.remove("is-active");
				}),
					e.parentNode.classList.add("is-active");
			});
		});
	},
});
