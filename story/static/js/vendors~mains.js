/** @format */

(window.webpackJsonp = window.webpackJsonp || []).push([
	[1],
	[
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 });
			var i = window,
				o =
					i.requestAnimationFrame ||
					i.webkitRequestAnimationFrame ||
					i.mozRequestAnimationFrame ||
					i.msRequestAnimationFrame ||
					function (t) {
						return setTimeout(t, 16);
					},
				r = window,
				a =
					r.cancelAnimationFrame ||
					r.mozCancelAnimationFrame ||
					function (t) {
						clearTimeout(t);
					};
			function s() {
				for (
					var t, e, n, i = arguments[0] || {}, o = 1, r = arguments.length;
					o < r;
					o++
				)
					if (null !== (t = arguments[o]))
						for (e in t) i !== (n = t[e]) && void 0 !== n && (i[e] = n);
				return i;
			}
			function l(t) {
				return ["true", "false"].indexOf(t) >= 0 ? JSON.parse(t) : t;
			}
			function u(t, e, n, i) {
				if (i)
					try {
						t.setItem(e, n);
					} catch (t) {}
				return n;
			}
			function c() {
				var t = document,
					e = t.body;
				return e || ((e = t.createElement("body")).fake = !0), e;
			}
			var f = document.documentElement;
			function d(t) {
				var e = "";
				return (
					t.fake &&
						((e = f.style.overflow),
						(t.style.background = ""),
						(t.style.overflow = f.style.overflow = "hidden"),
						f.appendChild(t)),
					e
				);
			}
			function h(t, e) {
				t.fake && (t.remove(), (f.style.overflow = e), f.offsetHeight);
			}
			function v(t, e, n, i) {
				"insertRule" in t
					? t.insertRule(e + "{" + n + "}", i)
					: t.addRule(e, n, i);
			}
			function p(t) {
				return ("insertRule" in t ? t.cssRules : t.rules).length;
			}
			function m(t, e, n) {
				for (var i = 0, o = t.length; i < o; i++) e.call(n, t[i], i);
			}
			var g = "classList" in document.createElement("_"),
				y = g
					? function (t, e) {
							return t.classList.contains(e);
					  }
					: function (t, e) {
							return t.className.indexOf(e) >= 0;
					  },
				b = g
					? function (t, e) {
							y(t, e) || t.classList.add(e);
					  }
					: function (t, e) {
							y(t, e) || (t.className += " " + e);
					  },
				x = g
					? function (t, e) {
							y(t, e) && t.classList.remove(e);
					  }
					: function (t, e) {
							y(t, e) && (t.className = t.className.replace(e, ""));
					  };
			function w(t, e) {
				return t.hasAttribute(e);
			}
			function C(t, e) {
				return t.getAttribute(e);
			}
			function k(t) {
				return void 0 !== t.item;
			}
			function T(t, e) {
				if (
					((t = k(t) || t instanceof Array ? t : [t]),
					"[object Object]" === Object.prototype.toString.call(e))
				)
					for (var n = t.length; n--; )
						for (var i in e) t[n].setAttribute(i, e[i]);
			}
			function M(t, e) {
				t = k(t) || t instanceof Array ? t : [t];
				for (
					var n = (e = e instanceof Array ? e : [e]).length, i = t.length;
					i--;

				)
					for (var o = n; o--; ) t[i].removeAttribute(e[o]);
			}
			function A(t) {
				for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]);
				return e;
			}
			function O(t, e) {
				"none" !== t.style.display && (t.style.display = "none");
			}
			function L(t, e) {
				"none" === t.style.display && (t.style.display = "");
			}
			function E(t) {
				return "none" !== window.getComputedStyle(t).display;
			}
			function S(t) {
				if ("string" == typeof t) {
					var e = [t],
						n = t.charAt(0).toUpperCase() + t.substr(1);
					["Webkit", "Moz", "ms", "O"].forEach(function (i) {
						("ms" === i && "transform" !== t) || e.push(i + n);
					}),
						(t = e);
				}
				var i = document.createElement("fakeelement");
				t.length;
				for (var o = 0; o < t.length; o++) {
					var r = t[o];
					if (void 0 !== i.style[r]) return r;
				}
				return !1;
			}
			function N(t, e) {
				var n = !1;
				return (
					/^Webkit/.test(t)
						? (n = "webkit" + e + "End")
						: /^O/.test(t)
						? (n = "o" + e + "End")
						: t && (n = e.toLowerCase() + "end"),
					n
				);
			}
			var _ = !1;
			try {
				var B = Object.defineProperty({}, "passive", {
					get: function () {
						_ = !0;
					},
				});
				window.addEventListener("test", null, B);
			} catch (t) {}
			var P = !!_ && { passive: !0 };
			function H(t, e, n) {
				for (var i in e) {
					var o = ["touchstart", "touchmove"].indexOf(i) >= 0 && !n && P;
					t.addEventListener(i, e[i], o);
				}
			}
			function R(t, e) {
				for (var n in e) {
					var i = ["touchstart", "touchmove"].indexOf(n) >= 0 && P;
					t.removeEventListener(n, e[n], i);
				}
			}
			function D() {
				return {
					topics: {},
					on: function (t, e) {
						(this.topics[t] = this.topics[t] || []), this.topics[t].push(e);
					},
					off: function (t, e) {
						if (this.topics[t])
							for (var n = 0; n < this.topics[t].length; n++)
								if (this.topics[t][n] === e) {
									this.topics[t].splice(n, 1);
									break;
								}
					},
					emit: function (t, e) {
						(e.type = t),
							this.topics[t] &&
								this.topics[t].forEach(function (n) {
									n(e, t);
								});
					},
				};
			}
			Object.keys ||
				(Object.keys = function (t) {
					var e = [];
					for (var n in t)
						Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
					return e;
				}),
				"remove" in Element.prototype ||
					(Element.prototype.remove = function () {
						this.parentNode && this.parentNode.removeChild(this);
					});
			var j = function (t) {
				t = s(
					{
						container: ".slider",
						mode: "carousel",
						axis: "horizontal",
						items: 1,
						gutter: 0,
						edgePadding: 0,
						fixedWidth: !1,
						autoWidth: !1,
						viewportMax: !1,
						slideBy: 1,
						center: !1,
						controls: !0,
						controlsPosition: "top",
						controlsText: ["prev", "next"],
						controlsContainer: !1,
						prevButton: !1,
						nextButton: !1,
						nav: !0,
						navPosition: "top",
						navContainer: !1,
						navAsThumbnails: !1,
						arrowKeys: !1,
						speed: 300,
						autoplay: !1,
						autoplayPosition: "top",
						autoplayTimeout: 5e3,
						autoplayDirection: "forward",
						autoplayText: ["start", "stop"],
						autoplayHoverPause: !1,
						autoplayButton: !1,
						autoplayButtonOutput: !0,
						autoplayResetOnVisibility: !0,
						animateIn: "tns-fadeIn",
						animateOut: "tns-fadeOut",
						animateNormal: "tns-normal",
						animateDelay: !1,
						loop: !0,
						rewind: !1,
						autoHeight: !1,
						responsive: !1,
						lazyload: !1,
						lazyloadSelector: ".tns-lazy-img",
						touch: !0,
						mouseDrag: !1,
						swipeAngle: 15,
						nested: !1,
						preventActionWhenRunning: !1,
						preventScrollOnTouch: !1,
						freezable: !0,
						onInit: !1,
						useLocalStorage: !0,
						nonce: !1,
					},
					t || {}
				);
				var e = document,
					n = window,
					i = { ENTER: 13, SPACE: 32, LEFT: 37, RIGHT: 39 },
					r = {},
					f = t.useLocalStorage;
				if (f) {
					var g = navigator.userAgent,
						k = new Date();
					try {
						(r = n.localStorage)
							? (r.setItem(k, k), (f = r.getItem(k) == k), r.removeItem(k))
							: (f = !1),
							f || (r = {});
					} catch (t) {
						f = !1;
					}
					f &&
						(r.tnsApp &&
							r.tnsApp !== g &&
							[
								"tC",
								"tPL",
								"tMQ",
								"tTf",
								"t3D",
								"tTDu",
								"tTDe",
								"tADu",
								"tADe",
								"tTE",
								"tAE",
							].forEach(function (t) {
								r.removeItem(t);
							}),
						(localStorage.tnsApp = g));
				}
				var _ = r.tC
						? l(r.tC)
						: u(
								r,
								"tC",
								(function () {
									var t = document,
										e = c(),
										n = d(e),
										i = t.createElement("div"),
										o = !1;
									e.appendChild(i);
									try {
										for (
											var r,
												a = "(10px * 10)",
												s = ["calc" + a, "-moz-calc" + a, "-webkit-calc" + a],
												l = 0;
											l < 3;
											l++
										)
											if (
												((r = s[l]), (i.style.width = r), 100 === i.offsetWidth)
											) {
												o = r.replace(a, "");
												break;
											}
									} catch (t) {}
									return e.fake ? h(e, n) : i.remove(), o;
								})(),
								f
						  ),
					B = r.tPL
						? l(r.tPL)
						: u(
								r,
								"tPL",
								(function () {
									var t,
										e = document,
										n = c(),
										i = d(n),
										o = e.createElement("div"),
										r = e.createElement("div"),
										a = "";
									(o.className = "tns-t-subp2"), (r.className = "tns-t-ct");
									for (var s = 0; s < 70; s++) a += "<div></div>";
									return (
										(r.innerHTML = a),
										o.appendChild(r),
										n.appendChild(o),
										(t =
											Math.abs(
												o.getBoundingClientRect().left -
													r.children[67].getBoundingClientRect().left
											) < 2),
										n.fake ? h(n, i) : o.remove(),
										t
									);
								})(),
								f
						  ),
					P = r.tMQ
						? l(r.tMQ)
						: u(
								r,
								"tMQ",
								(function () {
									if (window.matchMedia || window.msMatchMedia) return !0;
									var t,
										e = document,
										n = c(),
										i = d(n),
										o = e.createElement("div"),
										r = e.createElement("style"),
										a =
											"@media all and (min-width:1px){.tns-mq-test{position:absolute}}";
									return (
										(r.type = "text/css"),
										(o.className = "tns-mq-test"),
										n.appendChild(r),
										n.appendChild(o),
										r.styleSheet
											? (r.styleSheet.cssText = a)
											: r.appendChild(e.createTextNode(a)),
										(t = window.getComputedStyle
											? window.getComputedStyle(o).position
											: o.currentStyle.position),
										n.fake ? h(n, i) : o.remove(),
										"absolute" === t
									);
								})(),
								f
						  ),
					I = r.tTf ? l(r.tTf) : u(r, "tTf", S("transform"), f),
					q = r.t3D
						? l(r.t3D)
						: u(
								r,
								"t3D",
								(function (t) {
									if (!t) return !1;
									if (!window.getComputedStyle) return !1;
									var e,
										n = document,
										i = c(),
										o = d(i),
										r = n.createElement("p"),
										a =
											t.length > 9
												? "-" + t.slice(0, -9).toLowerCase() + "-"
												: "";
									return (
										(a += "transform"),
										i.insertBefore(r, null),
										(r.style[t] = "translate3d(1px,1px,1px)"),
										(e = window.getComputedStyle(r).getPropertyValue(a)),
										i.fake ? h(i, o) : r.remove(),
										void 0 !== e && e.length > 0 && "none" !== e
									);
								})(I),
								f
						  ),
					W = r.tTDu ? l(r.tTDu) : u(r, "tTDu", S("transitionDuration"), f),
					z = r.tTDe ? l(r.tTDe) : u(r, "tTDe", S("transitionDelay"), f),
					F = r.tADu ? l(r.tADu) : u(r, "tADu", S("animationDuration"), f),
					V = r.tADe ? l(r.tADe) : u(r, "tADe", S("animationDelay"), f),
					X = r.tTE ? l(r.tTE) : u(r, "tTE", N(W, "Transition"), f),
					Y = r.tAE ? l(r.tAE) : u(r, "tAE", N(F, "Animation"), f),
					G = n.console && "function" == typeof n.console.warn,
					Q = [
						"container",
						"controlsContainer",
						"prevButton",
						"nextButton",
						"navContainer",
						"autoplayButton",
					],
					J = {};
				if (
					(Q.forEach(function (n) {
						if ("string" == typeof t[n]) {
							var i = t[n],
								o = e.querySelector(i);
							if (((J[n] = i), !o || !o.nodeName))
								return void (G && console.warn("Can't find", t[n]));
							t[n] = o;
						}
					}),
					!(t.container.children.length < 1))
				) {
					var K = t.responsive,
						U = t.nested,
						Z = "carousel" === t.mode;
					if (K) {
						0 in K && ((t = s(t, K[0])), delete K[0]);
						var $ = {};
						for (var tt in K) {
							var et = K[tt];
							(et = "number" == typeof et ? { items: et } : et), ($[tt] = et);
						}
						(K = $), ($ = null);
					}
					if (
						(Z ||
							(function t(e) {
								for (var n in e)
									Z ||
										("slideBy" === n && (e[n] = "page"),
										"edgePadding" === n && (e[n] = !1),
										"autoHeight" === n && (e[n] = !1)),
										"responsive" === n && t(e[n]);
							})(t),
						!Z)
					) {
						(t.axis = "horizontal"), (t.slideBy = "page"), (t.edgePadding = !1);
						var nt = t.animateIn,
							it = t.animateOut,
							ot = t.animateDelay,
							rt = t.animateNormal;
					}
					var at,
						st,
						lt = "horizontal" === t.axis,
						ut = e.createElement("div"),
						ct = e.createElement("div"),
						ft = t.container,
						dt = ft.parentNode,
						ht = ft.outerHTML,
						vt = ft.children,
						pt = vt.length,
						mt = _n(),
						gt = !1;
					K && Zn(), Z && (ft.className += " tns-vpfix");
					var yt,
						bt,
						xt,
						wt,
						Ct,
						kt,
						Tt = t.autoWidth,
						Mt = Rn("fixedWidth"),
						At = Rn("edgePadding"),
						Ot = Rn("gutter"),
						Lt = Pn(),
						Et = Rn("center"),
						St = Tt ? 1 : Math.floor(Rn("items")),
						Nt = Rn("slideBy"),
						_t = t.viewportMax || t.fixedWidthViewportWidth,
						Bt = Rn("arrowKeys"),
						Pt = Rn("speed"),
						Ht = t.rewind,
						Rt = !Ht && t.loop,
						Dt = Rn("autoHeight"),
						jt = Rn("controls"),
						It = Rn("controlsText"),
						qt = Rn("nav"),
						Wt = Rn("touch"),
						zt = Rn("mouseDrag"),
						Ft = Rn("autoplay"),
						Vt = Rn("autoplayTimeout"),
						Xt = Rn("autoplayText"),
						Yt = Rn("autoplayHoverPause"),
						Gt = Rn("autoplayResetOnVisibility"),
						Qt =
							((wt = null),
							(Ct = Rn("nonce")),
							(kt = document.createElement("style")),
							wt && kt.setAttribute("media", wt),
							Ct && kt.setAttribute("nonce", Ct),
							document.querySelector("head").appendChild(kt),
							kt.sheet ? kt.sheet : kt.styleSheet),
						Jt = t.lazyload,
						Kt = t.lazyloadSelector,
						Ut = [],
						Zt = Rt
							? ((bt = (function () {
									if (Tt || (Mt && !_t)) return pt - 1;
									var e = Mt ? "fixedWidth" : "items",
										n = [];
									if (((Mt || t[e] < pt) && n.push(t[e]), K))
										for (var i in K) {
											var o = K[i][e];
											o && (Mt || o < pt) && n.push(o);
										}
									return (
										n.length || n.push(0),
										Math.ceil(
											Mt
												? _t / Math.min.apply(null, n)
												: Math.max.apply(null, n)
										)
									);
							  })()),
							  (xt = Z ? Math.ceil((5 * bt - pt) / 2) : 4 * bt - pt),
							  (xt = Math.max(bt, xt)),
							  Hn("edgePadding") ? xt + 1 : xt)
							: 0,
						$t = Z ? pt + 2 * Zt : pt + Zt,
						te = !((!Mt && !Tt) || Rt),
						ee = Mt ? Ti() : null,
						ne = !Z || !Rt,
						ie = lt ? "left" : "top",
						oe = "",
						re = "",
						ae = Mt
							? function () {
									return Et && !Rt ? pt - 1 : Math.ceil(-ee / (Mt + Ot));
							  }
							: Tt
							? function () {
									for (var t = 0; t < $t; t++) if (yt[t] >= -ee) return t;
							  }
							: function () {
									return Et && Z && !Rt
										? pt - 1
										: Rt || Z
										? Math.max(0, $t - Math.ceil(St))
										: $t - 1;
							  },
						se = En(Rn("startIndex")),
						le = se;
					Ln();
					var ue,
						ce,
						fe,
						de = 0,
						he = Tt ? null : ae(),
						ve = t.preventActionWhenRunning,
						pe = t.swipeAngle,
						me = !pe || "?",
						ge = !1,
						ye = t.onInit,
						be = new D(),
						xe = " tns-slider tns-" + t.mode,
						we =
							ft.id ||
							((fe = window.tnsId),
							(window.tnsId = fe ? fe + 1 : 1),
							"tns" + window.tnsId),
						Ce = Rn("disable"),
						ke = !1,
						Te = t.freezable,
						Me = !(!Te || Tt) && Un(),
						Ae = !1,
						Oe = {
							click: Bi,
							keydown: function (t) {
								t = Wi(t);
								var e = [i.LEFT, i.RIGHT].indexOf(t.keyCode);
								e >= 0 &&
									(0 === e
										? Qe.disabled || Bi(t, -1)
										: Je.disabled || Bi(t, 1));
							},
						},
						Le = {
							click: function (t) {
								if (ge) {
									if (ve) return;
									Ni();
								}
								var e = zi((t = Wi(t)));
								for (; e !== $e && !w(e, "data-nav"); ) e = e.parentNode;
								if (w(e, "data-nav")) {
									var n = (on = Number(C(e, "data-nav"))),
										i = Mt || Tt ? (n * pt) / en : n * St;
									_i(Re ? n : Math.min(Math.ceil(i), pt - 1), t),
										rn === n && (fn && ji(), (on = -1));
								}
							},
							keydown: function (t) {
								t = Wi(t);
								var n = e.activeElement;
								if (!w(n, "data-nav")) return;
								var o = [i.LEFT, i.RIGHT, i.ENTER, i.SPACE].indexOf(t.keyCode),
									r = Number(C(n, "data-nav"));
								o >= 0 &&
									(0 === o
										? r > 0 && qi(Ze[r - 1])
										: 1 === o
										? r < en - 1 && qi(Ze[r + 1])
										: ((on = r), _i(r, t)));
							},
						},
						Ee = {
							mouseover: function () {
								fn && (Hi(), (dn = !0));
							},
							mouseout: function () {
								dn && (Pi(), (dn = !1));
							},
						},
						Se = {
							visibilitychange: function () {
								e.hidden ? fn && (Hi(), (vn = !0)) : vn && (Pi(), (vn = !1));
							},
						},
						Ne = {
							keydown: function (t) {
								t = Wi(t);
								var e = [i.LEFT, i.RIGHT].indexOf(t.keyCode);
								e >= 0 && Bi(t, 0 === e ? -1 : 1);
							},
						},
						_e = {
							touchstart: Yi,
							touchmove: Gi,
							touchend: Qi,
							touchcancel: Qi,
						},
						Be = { mousedown: Yi, mousemove: Gi, mouseup: Qi, mouseleave: Qi },
						Pe = Hn("controls"),
						He = Hn("nav"),
						Re = !!Tt || t.navAsThumbnails,
						De = Hn("autoplay"),
						je = Hn("touch"),
						Ie = Hn("mouseDrag"),
						qe = "tns-slide-active",
						We = "tns-complete",
						ze = {
							load: function (t) {
								si(zi(t));
							},
							error: function (t) {
								(e = zi(t)), b(e, "failed"), li(e);
								var e;
							},
						},
						Fe = "force" === t.preventScrollOnTouch;
					if (Pe)
						var Ve,
							Xe,
							Ye = t.controlsContainer,
							Ge = t.controlsContainer ? t.controlsContainer.outerHTML : "",
							Qe = t.prevButton,
							Je = t.nextButton,
							Ke = t.prevButton ? t.prevButton.outerHTML : "",
							Ue = t.nextButton ? t.nextButton.outerHTML : "";
					if (He)
						var Ze,
							$e = t.navContainer,
							tn = t.navContainer ? t.navContainer.outerHTML : "",
							en = Tt ? pt : Ki(),
							nn = 0,
							on = -1,
							rn = Nn(),
							an = rn,
							sn = "tns-nav-active",
							ln = "Carousel Page ",
							un = " (Current Slide)";
					if (De)
						var cn,
							fn,
							dn,
							hn,
							vn,
							pn = "forward" === t.autoplayDirection ? 1 : -1,
							mn = t.autoplayButton,
							gn = t.autoplayButton ? t.autoplayButton.outerHTML : "",
							yn = ["<span class='tns-visually-hidden'>", " animation</span>"];
					if (je || Ie)
						var bn,
							xn,
							wn = {},
							Cn = {},
							kn = !1,
							Tn = lt
								? function (t, e) {
										return t.x - e.x;
								  }
								: function (t, e) {
										return t.y - e.y;
								  };
					Tt || On(Ce || Me),
						I &&
							((ie = I),
							(oe = "translate"),
							q
								? ((oe += lt ? "3d(" : "3d(0px, "),
								  (re = lt ? ", 0px, 0px)" : ", 0px)"))
								: ((oe += lt ? "X(" : "Y("), (re = ")"))),
						Z && (ft.className = ft.className.replace("tns-vpfix", "")),
						(function () {
							Hn("gutter"),
								(ut.className = "tns-outer"),
								(ct.className = "tns-inner"),
								(ut.id = we + "-ow"),
								(ct.id = we + "-iw"),
								"" === ft.id && (ft.id = we);
							(xe += B || Tt ? " tns-subpixel" : " tns-no-subpixel"),
								(xe += _ ? " tns-calc" : " tns-no-calc"),
								Tt && (xe += " tns-autowidth");
							(xe += " tns-" + t.axis),
								(ft.className += xe),
								Z
									? (((at = e.createElement("div")).id = we + "-mw"),
									  (at.className = "tns-ovh"),
									  ut.appendChild(at),
									  at.appendChild(ct))
									: ut.appendChild(ct);
							if (Dt) {
								(at || ct).className += " tns-ah";
							}
							if (
								(dt.insertBefore(ut, ft),
								ct.appendChild(ft),
								m(vt, function (t, e) {
									b(t, "tns-item"),
										t.id || (t.id = we + "-item" + e),
										!Z && rt && b(t, rt),
										T(t, { "aria-hidden": "true", tabindex: "-1" });
								}),
								Zt)
							) {
								for (
									var n = e.createDocumentFragment(),
										i = e.createDocumentFragment(),
										o = Zt;
									o--;

								) {
									var r = o % pt,
										a = vt[r].cloneNode(!0);
									if (
										(b(a, "tns-slide-cloned"),
										M(a, "id"),
										i.insertBefore(a, i.firstChild),
										Z)
									) {
										var s = vt[pt - 1 - r].cloneNode(!0);
										b(s, "tns-slide-cloned"), M(s, "id"), n.appendChild(s);
									}
								}
								ft.insertBefore(n, ft.firstChild),
									ft.appendChild(i),
									(vt = ft.children);
							}
						})(),
						(function () {
							if (!Z)
								for (var e = se, i = se + Math.min(pt, St); e < i; e++) {
									var o = vt[e];
									(o.style.left = (100 * (e - se)) / St + "%"),
										b(o, nt),
										x(o, rt);
								}
							lt &&
								(B || Tt
									? (v(
											Qt,
											"#" + we + " > .tns-item",
											"font-size:" + n.getComputedStyle(vt[0]).fontSize + ";",
											p(Qt)
									  ),
									  v(Qt, "#" + we, "font-size:0;", p(Qt)))
									: Z &&
									  m(vt, function (t, e) {
											t.style.marginLeft = (function (t) {
												return _
													? _ + "(" + 100 * t + "% / " + $t + ")"
													: (100 * t) / $t + "%";
											})(e);
									  }));
							if (P) {
								if (W) {
									var r = at && t.autoHeight ? zn(t.speed) : "";
									v(Qt, "#" + we + "-mw", r, p(Qt));
								}
								(r = Dn(
									t.edgePadding,
									t.gutter,
									t.fixedWidth,
									t.speed,
									t.autoHeight
								)),
									v(Qt, "#" + we + "-iw", r, p(Qt)),
									Z &&
										((r =
											lt && !Tt
												? "width:" + jn(t.fixedWidth, t.gutter, t.items) + ";"
												: ""),
										W && (r += zn(Pt)),
										v(Qt, "#" + we, r, p(Qt))),
									(r = lt && !Tt ? In(t.fixedWidth, t.gutter, t.items) : ""),
									t.gutter && (r += qn(t.gutter)),
									Z || (W && (r += zn(Pt)), F && (r += Fn(Pt))),
									r && v(Qt, "#" + we + " > .tns-item", r, p(Qt));
							} else {
								Z && Dt && (at.style[W] = Pt / 1e3 + "s"),
									(ct.style.cssText = Dn(At, Ot, Mt, Dt)),
									Z && lt && !Tt && (ft.style.width = jn(Mt, Ot, St));
								r = lt && !Tt ? In(Mt, Ot, St) : "";
								Ot && (r += qn(Ot)),
									r && v(Qt, "#" + we + " > .tns-item", r, p(Qt));
							}
							if (K && P)
								for (var a in K) {
									a = parseInt(a);
									var s = K[a],
										l = ((r = ""), ""),
										u = "",
										c = "",
										f = "",
										d = Tt ? null : Rn("items", a),
										h = Rn("fixedWidth", a),
										g = Rn("speed", a),
										y = Rn("edgePadding", a),
										w = Rn("autoHeight", a),
										C = Rn("gutter", a);
									W &&
										at &&
										Rn("autoHeight", a) &&
										"speed" in s &&
										(l = "#" + we + "-mw{" + zn(g) + "}"),
										("edgePadding" in s || "gutter" in s) &&
											(u = "#" + we + "-iw{" + Dn(y, C, h, g, w) + "}"),
										Z &&
											lt &&
											!Tt &&
											("fixedWidth" in s ||
												"items" in s ||
												(Mt && "gutter" in s)) &&
											(c = "width:" + jn(h, C, d) + ";"),
										W && "speed" in s && (c += zn(g)),
										c && (c = "#" + we + "{" + c + "}"),
										("fixedWidth" in s ||
											(Mt && "gutter" in s) ||
											(!Z && "items" in s)) &&
											(f += In(h, C, d)),
										"gutter" in s && (f += qn(C)),
										!Z &&
											"speed" in s &&
											(W && (f += zn(g)), F && (f += Fn(g))),
										f && (f = "#" + we + " > .tns-item{" + f + "}"),
										(r = l + u + c + f) &&
											Qt.insertRule(
												"@media (min-width: " + a / 16 + "em) {" + r + "}",
												Qt.cssRules.length
											);
								}
						})(),
						Vn();
					var Mn = Rt
							? Z
								? function () {
										var t = de,
											e = he;
										(t += Nt),
											(e -= Nt),
											At
												? ((t += 1), (e -= 1))
												: Mt && (Lt + Ot) % (Mt + Ot) && (e -= 1),
											Zt && (se > e ? (se -= pt) : se < t && (se += pt));
								  }
								: function () {
										if (se > he) for (; se >= de + pt; ) se -= pt;
										else if (se < de) for (; se <= he - pt; ) se += pt;
								  }
							: function () {
									se = Math.max(de, Math.min(he, se));
							  },
						An = Z
							? function () {
									var t, e, n, i, o, r, a, s, l, u, c;
									Ci(ft, ""),
										W || !Pt
											? (Oi(), (Pt && E(ft)) || Ni())
											: ((t = ft),
											  (e = ie),
											  (n = oe),
											  (i = re),
											  (o = Mi()),
											  (r = Pt),
											  (a = Ni),
											  (s = Math.min(r, 10)),
											  (l = o.indexOf("%") >= 0 ? "%" : "px"),
											  (o = o.replace(l, "")),
											  (u = Number(
													t.style[e]
														.replace(n, "")
														.replace(i, "")
														.replace(l, "")
											  )),
											  (c = ((o - u) / r) * s),
											  setTimeout(function o() {
													(r -= s),
														(u += c),
														(t.style[e] = n + u + l + i),
														r > 0 ? setTimeout(o, s) : a();
											  }, s)),
										lt || Ji();
							  }
							: function () {
									Ut = [];
									var t = {};
									(t[X] = t[Y] = Ni),
										R(vt[le], t),
										H(vt[se], t),
										Li(le, nt, it, !0),
										Li(se, rt, nt),
										(X && Y && Pt && E(ft)) || Ni();
							  };
					return {
						version: "2.9.4",
						getInfo: Zi,
						events: be,
						goTo: _i,
						play: function () {
							Ft && !fn && (Di(), (hn = !1));
						},
						pause: function () {
							fn && (ji(), (hn = !0));
						},
						isOn: gt,
						updateSliderHeight: vi,
						refresh: Vn,
						destroy: function () {
							if (
								((Qt.disabled = !0),
								Qt.ownerNode && Qt.ownerNode.remove(),
								R(n, { resize: Jn }),
								Bt && R(e, Ne),
								Ye && R(Ye, Oe),
								$e && R($e, Le),
								R(ft, Ee),
								R(ft, Se),
								mn && R(mn, { click: Ii }),
								Ft && clearInterval(cn),
								Z && X)
							) {
								var i = {};
								(i[X] = Ni), R(ft, i);
							}
							Wt && R(ft, _e), zt && R(ft, Be);
							var o = [ht, Ge, Ke, Ue, tn, gn];
							for (var r in (Q.forEach(function (e, n) {
								var i = "container" === e ? ut : t[e];
								if ("object" == typeof i && i) {
									var r =
											!!i.previousElementSibling && i.previousElementSibling,
										a = i.parentNode;
									(i.outerHTML = o[n]),
										(t[e] = r ? r.nextElementSibling : a.firstElementChild);
								}
							}),
							(Q =
								nt =
								it =
								ot =
								rt =
								lt =
								ut =
								ct =
								ft =
								dt =
								ht =
								vt =
								pt =
								st =
								mt =
								Tt =
								Mt =
								At =
								Ot =
								Lt =
								St =
								Nt =
								_t =
								Bt =
								Pt =
								Ht =
								Rt =
								Dt =
								Qt =
								Jt =
								yt =
								Ut =
								Zt =
								$t =
								te =
								ee =
								ne =
								ie =
								oe =
								re =
								ae =
								se =
								le =
								de =
								he =
								pe =
								me =
								ge =
								ye =
								be =
								xe =
								we =
								Ce =
								ke =
								Te =
								Me =
								Ae =
								Oe =
								Le =
								Ee =
								Se =
								Ne =
								_e =
								Be =
								Pe =
								He =
								Re =
								De =
								je =
								Ie =
								qe =
								We =
								ze =
								ue =
								jt =
								It =
								Ye =
								Ge =
								Qe =
								Je =
								Ve =
								Xe =
								qt =
								$e =
								tn =
								Ze =
								en =
								nn =
								on =
								rn =
								an =
								sn =
								ln =
								un =
								Ft =
								Vt =
								pn =
								Xt =
								Yt =
								mn =
								gn =
								Gt =
								yn =
								cn =
								fn =
								dn =
								hn =
								vn =
								wn =
								Cn =
								bn =
								kn =
								xn =
								Tn =
								Wt =
								zt =
									null),
							this))
								"rebuild" !== r && (this[r] = null);
							gt = !1;
						},
						rebuild: function () {
							return j(s(t, J));
						},
					};
				}
				function On(t) {
					t && (jt = qt = Wt = zt = Bt = Ft = Yt = Gt = !1);
				}
				function Ln() {
					for (var t = Z ? se - Zt : se; t < 0; ) t += pt;
					return (t % pt) + 1;
				}
				function En(t) {
					return (
						(t = t ? Math.max(0, Math.min(Rt ? pt - 1 : pt - St, t)) : 0),
						Z ? t + Zt : t
					);
				}
				function Sn(t) {
					for (null == t && (t = se), Z && (t -= Zt); t < 0; ) t += pt;
					return Math.floor(t % pt);
				}
				function Nn() {
					var t,
						e = Sn();
					return (
						(t = Re
							? e
							: Mt || Tt
							? Math.ceil(((e + 1) * en) / pt - 1)
							: Math.floor(e / St)),
						!Rt && Z && se === he && (t = en - 1),
						t
					);
				}
				function _n() {
					return (
						n.innerWidth || e.documentElement.clientWidth || e.body.clientWidth
					);
				}
				function Bn(t) {
					return "top" === t ? "afterbegin" : "beforeend";
				}
				function Pn() {
					var t = At ? 2 * At - Ot : 0;
					return (
						(function t(n) {
							if (null != n) {
								var i,
									o,
									r = e.createElement("div");
								return (
									n.appendChild(r),
									(o = (i = r.getBoundingClientRect()).right - i.left),
									r.remove(),
									o || t(n.parentNode)
								);
							}
						})(dt) - t
					);
				}
				function Hn(e) {
					if (t[e]) return !0;
					if (K) for (var n in K) if (K[n][e]) return !0;
					return !1;
				}
				function Rn(e, n) {
					if ((null == n && (n = mt), "items" === e && Mt))
						return Math.floor((Lt + Ot) / (Mt + Ot)) || 1;
					var i = t[e];
					if (K)
						for (var o in K) n >= parseInt(o) && e in K[o] && (i = K[o][e]);
					return (
						"slideBy" === e && "page" === i && (i = Rn("items")),
						Z || ("slideBy" !== e && "items" !== e) || (i = Math.floor(i)),
						i
					);
				}
				function Dn(t, e, n, i, o) {
					var r = "";
					if (void 0 !== t) {
						var a = t;
						e && (a -= e),
							(r = lt
								? "margin: 0 " + a + "px 0 " + t + "px;"
								: "margin: " + t + "px 0 " + a + "px 0;");
					} else if (e && !n) {
						var s = "-" + e + "px";
						r = "margin: 0 " + (lt ? s + " 0 0" : "0 " + s + " 0") + ";";
					}
					return !Z && o && W && i && (r += zn(i)), r;
				}
				function jn(t, e, n) {
					return t
						? (t + e) * $t + "px"
						: _
						? _ + "(" + 100 * $t + "% / " + n + ")"
						: (100 * $t) / n + "%";
				}
				function In(t, e, n) {
					var i;
					if (t) i = t + e + "px";
					else {
						Z || (n = Math.floor(n));
						var o = Z ? $t : n;
						i = _ ? _ + "(100% / " + o + ")" : 100 / o + "%";
					}
					return (
						(i = "width:" + i), "inner" !== U ? i + ";" : i + " !important;"
					);
				}
				function qn(t) {
					var e = "";
					!1 !== t &&
						(e =
							(lt ? "padding-" : "margin-") +
							(lt ? "right" : "bottom") +
							": " +
							t +
							"px;");
					return e;
				}
				function Wn(t, e) {
					var n = t.substring(0, t.length - e).toLowerCase();
					return n && (n = "-" + n + "-"), n;
				}
				function zn(t) {
					return Wn(W, 18) + "transition-duration:" + t / 1e3 + "s;";
				}
				function Fn(t) {
					return Wn(F, 17) + "animation-duration:" + t / 1e3 + "s;";
				}
				function Vn() {
					if (Hn("autoHeight") || Tt || !lt) {
						var t = ft.querySelectorAll("img");
						m(t, function (t) {
							var e = t.src;
							Jt ||
								(e && e.indexOf("data:image") < 0
									? ((t.src = ""), H(t, ze), b(t, "loading"), (t.src = e))
									: si(t));
						}),
							o(function () {
								fi(A(t), function () {
									ue = !0;
								});
							}),
							Hn("autoHeight") && (t = ui(se, Math.min(se + St - 1, $t - 1))),
							Jt
								? Xn()
								: o(function () {
										fi(A(t), Xn);
								  });
					} else Z && Ai(), Gn(), Qn();
				}
				function Xn() {
					if (Tt && pt > 1) {
						var t = Rt ? se : pt - 1;
						!(function e() {
							var n = vt[t].getBoundingClientRect().left,
								i = vt[t - 1].getBoundingClientRect().right;
							Math.abs(n - i) <= 1
								? Yn()
								: setTimeout(function () {
										e();
								  }, 16);
						})();
					} else Yn();
				}
				function Yn() {
					(lt && !Tt) ||
						(pi(),
						Tt
							? ((ee = Ti()), Te && (Me = Un()), (he = ae()), On(Ce || Me))
							: Ji()),
						Z && Ai(),
						Gn(),
						Qn();
				}
				function Gn() {
					if (
						(mi(),
						ut.insertAdjacentHTML(
							"afterbegin",
							'<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' +
								oi() +
								"</span>  of " +
								pt +
								"</div>"
						),
						(ce = ut.querySelector(".tns-liveregion .current")),
						De)
					) {
						var e = Ft ? "stop" : "start";
						mn
							? T(mn, { "data-action": e })
							: t.autoplayButtonOutput &&
							  (ut.insertAdjacentHTML(
									Bn(t.autoplayPosition),
									'<button type="button" data-action="' +
										e +
										'">' +
										yn[0] +
										e +
										yn[1] +
										Xt[0] +
										"</button>"
							  ),
							  (mn = ut.querySelector("[data-action]"))),
							mn && H(mn, { click: Ii }),
							Ft && (Di(), Yt && H(ft, Ee), Gt && H(ft, Se));
					}
					if (He) {
						if ($e)
							T($e, { "aria-label": "Carousel Pagination" }),
								m((Ze = $e.children), function (t, e) {
									T(t, {
										"data-nav": e,
										tabindex: "-1",
										"aria-label": ln + (e + 1),
										"aria-controls": we,
									});
								});
						else {
							for (
								var n = "", i = Re ? "" : 'style="display:none"', o = 0;
								o < pt;
								o++
							)
								n +=
									'<button type="button" data-nav="' +
									o +
									'" tabindex="-1" aria-controls="' +
									we +
									'" ' +
									i +
									' aria-label="' +
									ln +
									(o + 1) +
									'"></button>';
							(n =
								'<div class="tns-nav" aria-label="Carousel Pagination">' +
								n +
								"</div>"),
								ut.insertAdjacentHTML(Bn(t.navPosition), n),
								($e = ut.querySelector(".tns-nav")),
								(Ze = $e.children);
						}
						if ((Ui(), W)) {
							var r = W.substring(0, W.length - 18).toLowerCase(),
								a = "transition: all " + Pt / 1e3 + "s";
							r && (a = "-" + r + "-" + a),
								v(Qt, "[aria-controls^=" + we + "-item]", a, p(Qt));
						}
						T(Ze[rn], { "aria-label": ln + (rn + 1) + un }),
							M(Ze[rn], "tabindex"),
							b(Ze[rn], sn),
							H($e, Le);
					}
					Pe &&
						(Ye ||
							(Qe && Je) ||
							(ut.insertAdjacentHTML(
								Bn(t.controlsPosition),
								'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' +
									we +
									'">' +
									It[0] +
									'</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' +
									we +
									'">' +
									It[1] +
									"</button></div>"
							),
							(Ye = ut.querySelector(".tns-controls"))),
						(Qe && Je) || ((Qe = Ye.children[0]), (Je = Ye.children[1])),
						t.controlsContainer &&
							T(Ye, { "aria-label": "Carousel Navigation", tabindex: "0" }),
						(t.controlsContainer || (t.prevButton && t.nextButton)) &&
							T([Qe, Je], { "aria-controls": we, tabindex: "-1" }),
						(t.controlsContainer || (t.prevButton && t.nextButton)) &&
							(T(Qe, { "data-controls": "prev" }),
							T(Je, { "data-controls": "next" })),
						(Ve = yi(Qe)),
						(Xe = yi(Je)),
						wi(),
						Ye ? H(Ye, Oe) : (H(Qe, Oe), H(Je, Oe))),
						$n();
				}
				function Qn() {
					if (Z && X) {
						var i = {};
						(i[X] = Ni), H(ft, i);
					}
					Wt && H(ft, _e, t.preventScrollOnTouch),
						zt && H(ft, Be),
						Bt && H(e, Ne),
						"inner" === U
							? be.on("outerResized", function () {
									Kn(), be.emit("innerLoaded", Zi());
							  })
							: (K || Mt || Tt || Dt || !lt) && H(n, { resize: Jn }),
						Dt && ("outer" === U ? be.on("innerLoaded", ci) : Ce || ci()),
						ai(),
						Ce ? ni() : Me && ei(),
						be.on("indexChanged", di),
						"inner" === U && be.emit("innerLoaded", Zi()),
						"function" == typeof ye && ye(Zi()),
						(gt = !0);
				}
				function Jn(t) {
					o(function () {
						Kn(Wi(t));
					});
				}
				function Kn(n) {
					if (gt) {
						"outer" === U && be.emit("outerResized", Zi(n)), (mt = _n());
						var i,
							o = st,
							r = !1;
						K && (Zn(), (i = o !== st) && be.emit("newBreakpointStart", Zi(n)));
						var a,
							s,
							l = St,
							u = Ce,
							c = Me,
							f = Bt,
							d = jt,
							h = qt,
							g = Wt,
							y = zt,
							w = Ft,
							C = Yt,
							k = Gt,
							T = se;
						if (i) {
							var M = Mt,
								A = Dt,
								E = It,
								S = Et,
								N = Xt;
							if (!P)
								var _ = Ot,
									B = At;
						}
						if (
							((Bt = Rn("arrowKeys")),
							(jt = Rn("controls")),
							(qt = Rn("nav")),
							(Wt = Rn("touch")),
							(Et = Rn("center")),
							(zt = Rn("mouseDrag")),
							(Ft = Rn("autoplay")),
							(Yt = Rn("autoplayHoverPause")),
							(Gt = Rn("autoplayResetOnVisibility")),
							i &&
								((Ce = Rn("disable")),
								(Mt = Rn("fixedWidth")),
								(Pt = Rn("speed")),
								(Dt = Rn("autoHeight")),
								(It = Rn("controlsText")),
								(Xt = Rn("autoplayText")),
								(Vt = Rn("autoplayTimeout")),
								P || ((At = Rn("edgePadding")), (Ot = Rn("gutter")))),
							On(Ce),
							(Lt = Pn()),
							(lt && !Tt) || Ce || (pi(), lt || (Ji(), (r = !0))),
							(Mt || Tt) && ((ee = Ti()), (he = ae())),
							(i || Mt) &&
								((St = Rn("items")),
								(Nt = Rn("slideBy")),
								(s = St !== l) && (Mt || Tt || (he = ae()), Mn())),
							i &&
								Ce !== u &&
								(Ce
									? ni()
									: (function () {
											if (!ke) return;
											if (((Qt.disabled = !1), (ft.className += xe), Ai(), Rt))
												for (var t = Zt; t--; )
													Z && L(vt[t]), L(vt[$t - t - 1]);
											if (!Z)
												for (var e = se, n = se + pt; e < n; e++) {
													var i = vt[e],
														o = e < se + St ? nt : rt;
													(i.style.left = (100 * (e - se)) / St + "%"), b(i, o);
												}
											ti(), (ke = !1);
									  })()),
							Te &&
								(i || Mt || Tt) &&
								(Me = Un()) !== c &&
								(Me
									? (Oi(Mi(En(0))), ei())
									: (!(function () {
											if (!Ae) return;
											At && P && (ct.style.margin = "");
											if (Zt)
												for (var t = "tns-transparent", e = Zt; e--; )
													Z && x(vt[e], t), x(vt[$t - e - 1], t);
											ti(), (Ae = !1);
									  })(),
									  (r = !0))),
							On(Ce || Me),
							Ft || (Yt = Gt = !1),
							Bt !== f && (Bt ? H(e, Ne) : R(e, Ne)),
							jt !== d &&
								(jt
									? Ye
										? L(Ye)
										: (Qe && L(Qe), Je && L(Je))
									: Ye
									? O(Ye)
									: (Qe && O(Qe), Je && O(Je))),
							qt !== h && (qt ? (L($e), Ui()) : O($e)),
							Wt !== g && (Wt ? H(ft, _e, t.preventScrollOnTouch) : R(ft, _e)),
							zt !== y && (zt ? H(ft, Be) : R(ft, Be)),
							Ft !== w &&
								(Ft
									? (mn && L(mn), fn || hn || Di())
									: (mn && O(mn), fn && ji())),
							Yt !== C && (Yt ? H(ft, Ee) : R(ft, Ee)),
							Gt !== k && (Gt ? H(e, Se) : R(e, Se)),
							i)
						) {
							if (
								((Mt === M && Et === S) || (r = !0),
								Dt !== A && (Dt || (ct.style.height = "")),
								jt &&
									It !== E &&
									((Qe.innerHTML = It[0]), (Je.innerHTML = It[1])),
								mn && Xt !== N)
							) {
								var D = Ft ? 1 : 0,
									j = mn.innerHTML,
									I = j.length - N[D].length;
								j.substring(I) === N[D] &&
									(mn.innerHTML = j.substring(0, I) + Xt[D]);
							}
						} else Et && (Mt || Tt) && (r = !0);
						if (
							((s || (Mt && !Tt)) && ((en = Ki()), Ui()),
							(a = se !== T)
								? (be.emit("indexChanged", Zi()), (r = !0))
								: s
								? a || di()
								: (Mt || Tt) && (ai(), mi(), ii()),
							s &&
								!Z &&
								(function () {
									for (var t = se + Math.min(pt, St), e = $t; e--; ) {
										var n = vt[e];
										e >= se && e < t
											? (b(n, "tns-moving"),
											  (n.style.left = (100 * (e - se)) / St + "%"),
											  b(n, nt),
											  x(n, rt))
											: n.style.left &&
											  ((n.style.left = ""), b(n, rt), x(n, nt)),
											x(n, it);
									}
									setTimeout(function () {
										m(vt, function (t) {
											x(t, "tns-moving");
										});
									}, 300);
								})(),
							!Ce && !Me)
						) {
							if (
								i &&
								!P &&
								((At === B && Ot === _) ||
									(ct.style.cssText = Dn(At, Ot, Mt, Pt, Dt)),
								lt)
							) {
								Z && (ft.style.width = jn(Mt, Ot, St));
								var q = In(Mt, Ot, St) + qn(Ot);
								!(function (t, e) {
									"deleteRule" in t ? t.deleteRule(e) : t.removeRule(e);
								})(Qt, p(Qt) - 1),
									v(Qt, "#" + we + " > .tns-item", q, p(Qt));
							}
							Dt && ci(), r && (Ai(), (le = se));
						}
						i && be.emit("newBreakpointEnd", Zi(n));
					}
				}
				function Un() {
					if (!Mt && !Tt) return pt <= (Et ? St - (St - 1) / 2 : St);
					var t = Mt ? (Mt + Ot) * pt : yt[pt],
						e = At ? Lt + 2 * At : Lt + Ot;
					return (
						Et &&
							(e -= Mt ? (Lt - Mt) / 2 : (Lt - (yt[se + 1] - yt[se] - Ot)) / 2),
						t <= e
					);
				}
				function Zn() {
					for (var t in ((st = 0), K)) (t = parseInt(t)), mt >= t && (st = t);
				}
				function $n() {
					!Ft && mn && O(mn),
						!qt && $e && O($e),
						jt || (Ye ? O(Ye) : (Qe && O(Qe), Je && O(Je)));
				}
				function ti() {
					Ft && mn && L(mn),
						qt && $e && L($e),
						jt && (Ye ? L(Ye) : (Qe && L(Qe), Je && L(Je)));
				}
				function ei() {
					if (!Ae) {
						if ((At && (ct.style.margin = "0px"), Zt))
							for (var t = "tns-transparent", e = Zt; e--; )
								Z && b(vt[e], t), b(vt[$t - e - 1], t);
						$n(), (Ae = !0);
					}
				}
				function ni() {
					if (!ke) {
						if (
							((Qt.disabled = !0),
							(ft.className = ft.className.replace(xe.substring(1), "")),
							M(ft, ["style"]),
							Rt)
						)
							for (var t = Zt; t--; ) Z && O(vt[t]), O(vt[$t - t - 1]);
						if (((lt && Z) || M(ct, ["style"]), !Z))
							for (var e = se, n = se + pt; e < n; e++) {
								var i = vt[e];
								M(i, ["style"]), x(i, nt), x(i, rt);
							}
						$n(), (ke = !0);
					}
				}
				function ii() {
					var t = oi();
					ce.innerHTML !== t && (ce.innerHTML = t);
				}
				function oi() {
					var t = ri(),
						e = t[0] + 1,
						n = t[1] + 1;
					return e === n ? e + "" : e + " to " + n;
				}
				function ri(t) {
					null == t && (t = Mi());
					var e,
						n,
						i,
						o = se;
					if (
						(Et || At
							? (Tt || Mt) &&
							  ((n = -(parseFloat(t) + At)), (i = n + Lt + 2 * At))
							: Tt && ((n = yt[se]), (i = n + Lt)),
						Tt)
					)
						yt.forEach(function (t, r) {
							r < $t &&
								((Et || At) && t <= n + 0.5 && (o = r),
								i - t >= 0.5 && (e = r));
						});
					else {
						if (Mt) {
							var r = Mt + Ot;
							Et || At
								? ((o = Math.floor(n / r)), (e = Math.ceil(i / r - 1)))
								: (e = o + Math.ceil(Lt / r) - 1);
						} else if (Et || At) {
							var a = St - 1;
							if ((Et ? ((o -= a / 2), (e = se + a / 2)) : (e = se + a), At)) {
								var s = (At * St) / Lt;
								(o -= s), (e += s);
							}
							(o = Math.floor(o)), (e = Math.ceil(e));
						} else e = o + St - 1;
						(o = Math.max(o, 0)), (e = Math.min(e, $t - 1));
					}
					return [o, e];
				}
				function ai() {
					if (Jt && !Ce) {
						var t = ri();
						t.push(Kt),
							ui.apply(null, t).forEach(function (t) {
								if (!y(t, We)) {
									var e = {};
									(e[X] = function (t) {
										t.stopPropagation();
									}),
										H(t, e),
										H(t, ze),
										(t.src = C(t, "data-src"));
									var n = C(t, "data-srcset");
									n && (t.srcset = n), b(t, "loading");
								}
							});
					}
				}
				function si(t) {
					b(t, "loaded"), li(t);
				}
				function li(t) {
					b(t, We), x(t, "loading"), R(t, ze);
				}
				function ui(t, e, n) {
					var i = [];
					for (n || (n = "img"); t <= e; )
						m(vt[t].querySelectorAll(n), function (t) {
							i.push(t);
						}),
							t++;
					return i;
				}
				function ci() {
					var t = ui.apply(null, ri());
					o(function () {
						fi(t, vi);
					});
				}
				function fi(t, e) {
					return ue
						? e()
						: (t.forEach(function (e, n) {
								!Jt && e.complete && li(e), y(e, We) && t.splice(n, 1);
						  }),
						  t.length
								? void o(function () {
										fi(t, e);
								  })
								: e());
				}
				function di() {
					ai(),
						mi(),
						ii(),
						wi(),
						(function () {
							if (qt && ((rn = on >= 0 ? on : Nn()), (on = -1), rn !== an)) {
								var t = Ze[an],
									e = Ze[rn];
								T(t, { tabindex: "-1", "aria-label": ln + (an + 1) }),
									x(t, sn),
									T(e, { "aria-label": ln + (rn + 1) + un }),
									M(e, "tabindex"),
									b(e, sn),
									(an = rn);
							}
						})();
				}
				function hi(t, e) {
					for (var n = [], i = t, o = Math.min(t + e, $t); i < o; i++)
						n.push(vt[i].offsetHeight);
					return Math.max.apply(null, n);
				}
				function vi() {
					var t = Dt ? hi(se, St) : hi(Zt, pt),
						e = at || ct;
					e.style.height !== t && (e.style.height = t + "px");
				}
				function pi() {
					yt = [0];
					var t = lt ? "left" : "top",
						e = lt ? "right" : "bottom",
						n = vt[0].getBoundingClientRect()[t];
					m(vt, function (i, o) {
						o && yt.push(i.getBoundingClientRect()[t] - n),
							o === $t - 1 && yt.push(i.getBoundingClientRect()[e] - n);
					});
				}
				function mi() {
					var t = ri(),
						e = t[0],
						n = t[1];
					m(vt, function (t, i) {
						i >= e && i <= n
							? w(t, "aria-hidden") &&
							  (M(t, ["aria-hidden", "tabindex"]), b(t, qe))
							: w(t, "aria-hidden") ||
							  (T(t, { "aria-hidden": "true", tabindex: "-1" }), x(t, qe));
					});
				}
				function gi(t) {
					return t.nodeName.toLowerCase();
				}
				function yi(t) {
					return "button" === gi(t);
				}
				function bi(t) {
					return "true" === t.getAttribute("aria-disabled");
				}
				function xi(t, e, n) {
					t ? (e.disabled = n) : e.setAttribute("aria-disabled", n.toString());
				}
				function wi() {
					if (jt && !Ht && !Rt) {
						var t = Ve ? Qe.disabled : bi(Qe),
							e = Xe ? Je.disabled : bi(Je),
							n = se <= de,
							i = !Ht && se >= he;
						n && !t && xi(Ve, Qe, !0),
							!n && t && xi(Ve, Qe, !1),
							i && !e && xi(Xe, Je, !0),
							!i && e && xi(Xe, Je, !1);
					}
				}
				function Ci(t, e) {
					W && (t.style[W] = e);
				}
				function ki(t) {
					return (
						null == t && (t = se),
						Tt
							? (Lt - (At ? Ot : 0) - (yt[t + 1] - yt[t] - Ot)) / 2
							: Mt
							? (Lt - Mt) / 2
							: (St - 1) / 2
					);
				}
				function Ti() {
					var t = Lt + (At ? Ot : 0) - (Mt ? (Mt + Ot) * $t : yt[$t]);
					return (
						Et &&
							!Rt &&
							(t = Mt ? -(Mt + Ot) * ($t - 1) - ki() : ki($t - 1) - yt[$t - 1]),
						t > 0 && (t = 0),
						t
					);
				}
				function Mi(t) {
					var e;
					if ((null == t && (t = se), lt && !Tt))
						if (Mt) (e = -(Mt + Ot) * t), Et && (e += ki());
						else {
							var n = I ? $t : St;
							Et && (t -= ki()), (e = (100 * -t) / n);
						}
					else (e = -yt[t]), Et && Tt && (e += ki());
					return (
						te && (e = Math.max(e, ee)), (e += !lt || Tt || Mt ? "px" : "%")
					);
				}
				function Ai(t) {
					Ci(ft, "0s"), Oi(t);
				}
				function Oi(t) {
					null == t && (t = Mi()), (ft.style[ie] = oe + t + re);
				}
				function Li(t, e, n, i) {
					var o = t + St;
					Rt || (o = Math.min(o, $t));
					for (var r = t; r < o; r++) {
						var a = vt[r];
						i || (a.style.left = (100 * (r - se)) / St + "%"),
							ot && z && (a.style[z] = a.style[V] = (ot * (r - t)) / 1e3 + "s"),
							x(a, e),
							b(a, n),
							i && Ut.push(a);
					}
				}
				function Ei(t, e) {
					ne && Mn(),
						(se !== le || e) &&
							(be.emit("indexChanged", Zi()),
							be.emit("transitionStart", Zi()),
							Dt && ci(),
							fn && t && ["click", "keydown"].indexOf(t.type) >= 0 && ji(),
							(ge = !0),
							An());
				}
				function Si(t) {
					return t.toLowerCase().replace(/-/g, "");
				}
				function Ni(t) {
					if (Z || ge) {
						if ((be.emit("transitionEnd", Zi(t)), !Z && Ut.length > 0))
							for (var e = 0; e < Ut.length; e++) {
								var n = Ut[e];
								(n.style.left = ""),
									V && z && ((n.style[V] = ""), (n.style[z] = "")),
									x(n, it),
									b(n, rt);
							}
						if (
							!t ||
							(!Z && t.target.parentNode === ft) ||
							(t.target === ft && Si(t.propertyName) === Si(ie))
						) {
							if (!ne) {
								var i = se;
								Mn(), se !== i && (be.emit("indexChanged", Zi()), Ai());
							}
							"inner" === U && be.emit("innerLoaded", Zi()),
								(ge = !1),
								(le = se);
						}
					}
				}
				function _i(t, e) {
					if (!Me)
						if ("prev" === t) Bi(e, -1);
						else if ("next" === t) Bi(e, 1);
						else {
							if (ge) {
								if (ve) return;
								Ni();
							}
							var n = Sn(),
								i = 0;
							if (
								("first" === t
									? (i = -n)
									: "last" === t
									? (i = Z ? pt - St - n : pt - 1 - n)
									: ("number" != typeof t && (t = parseInt(t)),
									  isNaN(t) ||
											(e || (t = Math.max(0, Math.min(pt - 1, t))),
											(i = t - n))),
								!Z && i && Math.abs(i) < St)
							) {
								var o = i > 0 ? 1 : -1;
								i += se + i - pt >= de ? pt * o : 2 * pt * o * -1;
							}
							(se += i),
								Z && Rt && (se < de && (se += pt), se > he && (se -= pt)),
								Sn(se) !== Sn(le) && Ei(e);
						}
				}
				function Bi(t, e) {
					if (ge) {
						if (ve) return;
						Ni();
					}
					var n;
					if (!e) {
						for (var i = zi((t = Wi(t))); i !== Ye && [Qe, Je].indexOf(i) < 0; )
							i = i.parentNode;
						var o = [Qe, Je].indexOf(i);
						o >= 0 && ((n = !0), (e = 0 === o ? -1 : 1));
					}
					if (Ht) {
						if (se === de && -1 === e) return void _i("last", t);
						if (se === he && 1 === e) return void _i("first", t);
					}
					e &&
						((se += Nt * e),
						Tt && (se = Math.floor(se)),
						Ei(n || (t && "keydown" === t.type) ? t : null));
				}
				function Pi() {
					(cn = setInterval(function () {
						Bi(null, pn);
					}, Vt)),
						(fn = !0);
				}
				function Hi() {
					clearInterval(cn), (fn = !1);
				}
				function Ri(t, e) {
					T(mn, { "data-action": t }), (mn.innerHTML = yn[0] + t + yn[1] + e);
				}
				function Di() {
					Pi(), mn && Ri("stop", Xt[1]);
				}
				function ji() {
					Hi(), mn && Ri("start", Xt[0]);
				}
				function Ii() {
					fn ? (ji(), (hn = !0)) : (Di(), (hn = !1));
				}
				function qi(t) {
					t.focus();
				}
				function Wi(t) {
					return Fi((t = t || n.event)) ? t.changedTouches[0] : t;
				}
				function zi(t) {
					return t.target || n.event.srcElement;
				}
				function Fi(t) {
					return t.type.indexOf("touch") >= 0;
				}
				function Vi(t) {
					t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
				}
				function Xi() {
					return (
						(r = Cn.y - wn.y),
						(a = Cn.x - wn.x),
						(e = Math.atan2(r, a) * (180 / Math.PI)),
						(n = pe),
						(i = !1),
						(o = Math.abs(90 - Math.abs(e))) >= 90 - n
							? (i = "horizontal")
							: o <= n && (i = "vertical"),
						i === t.axis
					);
					var e, n, i, o, r, a;
				}
				function Yi(t) {
					if (ge) {
						if (ve) return;
						Ni();
					}
					Ft && fn && Hi(), (kn = !0), xn && (a(xn), (xn = null));
					var e = Wi(t);
					be.emit(Fi(t) ? "touchStart" : "dragStart", Zi(t)),
						!Fi(t) && ["img", "a"].indexOf(gi(zi(t))) >= 0 && Vi(t),
						(Cn.x = wn.x = e.clientX),
						(Cn.y = wn.y = e.clientY),
						Z &&
							((bn = parseFloat(ft.style[ie].replace(oe, ""))), Ci(ft, "0s"));
				}
				function Gi(t) {
					if (kn) {
						var e = Wi(t);
						(Cn.x = e.clientX),
							(Cn.y = e.clientY),
							Z
								? xn ||
								  (xn = o(function () {
										!(function t(e) {
											if (!me) return void (kn = !1);
											a(xn),
												kn &&
													(xn = o(function () {
														t(e);
													}));
											"?" === me && (me = Xi());
											if (me) {
												!Fe && Fi(e) && (Fe = !0);
												try {
													e.type &&
														be.emit(Fi(e) ? "touchMove" : "dragMove", Zi(e));
												} catch (t) {}
												var n = bn,
													i = Tn(Cn, wn);
												if (!lt || Mt || Tt) (n += i), (n += "px");
												else
													(n += I
														? (i * St * 100) / ((Lt + Ot) * $t)
														: (100 * i) / (Lt + Ot)),
														(n += "%");
												ft.style[ie] = oe + n + re;
											}
										})(t);
								  }))
								: ("?" === me && (me = Xi()), me && (Fe = !0)),
							("boolean" != typeof t.cancelable || t.cancelable) &&
								Fe &&
								t.preventDefault();
					}
				}
				function Qi(e) {
					if (kn) {
						xn && (a(xn), (xn = null)), Z && Ci(ft, ""), (kn = !1);
						var n = Wi(e);
						(Cn.x = n.clientX), (Cn.y = n.clientY);
						var i = Tn(Cn, wn);
						if (Math.abs(i)) {
							if (!Fi(e)) {
								var r = zi(e);
								H(r, {
									click: function t(e) {
										Vi(e), R(r, { click: t });
									},
								});
							}
							Z
								? (xn = o(function () {
										if (lt && !Tt) {
											var t = (-i * St) / (Lt + Ot);
											(t = i > 0 ? Math.floor(t) : Math.ceil(t)), (se += t);
										} else {
											var n = -(bn + i);
											if (n <= 0) se = de;
											else if (n >= yt[$t - 1]) se = he;
											else
												for (var o = 0; o < $t && n >= yt[o]; )
													(se = o), n > yt[o] && i < 0 && (se += 1), o++;
										}
										Ei(e, i), be.emit(Fi(e) ? "touchEnd" : "dragEnd", Zi(e));
								  }))
								: me && Bi(e, i > 0 ? -1 : 1);
						}
					}
					"auto" === t.preventScrollOnTouch && (Fe = !1),
						pe && (me = "?"),
						Ft && !fn && Pi();
				}
				function Ji() {
					(at || ct).style.height = yt[se + St] - yt[se] + "px";
				}
				function Ki() {
					var t = Mt ? ((Mt + Ot) * pt) / Lt : pt / St;
					return Math.min(Math.ceil(t), pt);
				}
				function Ui() {
					if (qt && !Re && en !== nn) {
						var t = nn,
							e = en,
							n = L;
						for (nn > en && ((t = en), (e = nn), (n = O)); t < e; )
							n(Ze[t]), t++;
						nn = en;
					}
				}
				function Zi(t) {
					return {
						container: ft,
						slideItems: vt,
						navContainer: $e,
						navItems: Ze,
						controlsContainer: Ye,
						hasControls: Pe,
						prevButton: Qe,
						nextButton: Je,
						items: St,
						slideBy: Nt,
						cloneCount: Zt,
						slideCount: pt,
						slideCountNew: $t,
						index: se,
						indexCached: le,
						displayIndex: Ln(),
						navCurrentIndex: rn,
						navCurrentIndexCached: an,
						pages: en,
						pagesCached: nn,
						sheet: Qt,
						isOn: gt,
						event: t || {},
					};
				}
				G && console.warn("No slides found in", t.container);
			};
			e.tns = j;
		},
		function (t, e, n) {
			var i;
			window,
				(i = function () {
					return (function (t) {
						var e = {};
						function n(i) {
							if (e[i]) return e[i].exports;
							var o = (e[i] = { i: i, l: !1, exports: {} });
							return (
								t[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
							);
						}
						return (
							(n.m = t),
							(n.c = e),
							(n.d = function (t, e, i) {
								n.o(t, e) ||
									Object.defineProperty(t, e, { enumerable: !0, get: i });
							}),
							(n.r = function (t) {
								"undefined" != typeof Symbol &&
									Symbol.toStringTag &&
									Object.defineProperty(t, Symbol.toStringTag, {
										value: "Module",
									}),
									Object.defineProperty(t, "__esModule", { value: !0 });
							}),
							(n.t = function (t, e) {
								if ((1 & e && (t = n(t)), 8 & e)) return t;
								if (4 & e && "object" == typeof t && t && t.__esModule)
									return t;
								var i = Object.create(null);
								if (
									(n.r(i),
									Object.defineProperty(i, "default", {
										enumerable: !0,
										value: t,
									}),
									2 & e && "string" != typeof t)
								)
									for (var o in t)
										n.d(
											i,
											o,
											function (e) {
												return t[e];
											}.bind(null, o)
										);
								return i;
							}),
							(n.n = function (t) {
								var e =
									t && t.__esModule
										? function () {
												return t.default;
										  }
										: function () {
												return t;
										  };
								return n.d(e, "a", e), e;
							}),
							(n.o = function (t, e) {
								return Object.prototype.hasOwnProperty.call(t, e);
							}),
							(n.p = ""),
							n((n.s = 2))
						);
					})([
						function (t, e) {
							/*!
							 * object-extend
							 * A well-tested function to deep extend (or merge) JavaScript objects without further dependencies.
							 *
							 * http://github.com/bernhardw
							 *
							 * Copyright 2013, Bernhard Wanger <mail@bernhardwanger.com>
							 * Released under the MIT license.
							 *
							 * Date: 2013-04-10
							 */
							t.exports = function t(e, n) {
								return (
									null == e ||
										null == n ||
										Object.keys(n).forEach(function (i) {
											"[object Object]" == Object.prototype.toString.call(n[i])
												? "[object Object]" !=
												  Object.prototype.toString.call(e[i])
													? (e[i] = n[i])
													: (e[i] = t(e[i], n[i]))
												: (e[i] = n[i]);
										}),
									e
								);
							};
						},
						function (t, e) {
							(Array.prototype.each = function (t) {
								for (var e = this.length, n = 0; n < e; n++) {
									var i = this[n];
									i && t(i, n);
								}
							}),
								(NodeList.prototype.each = Array.prototype.each),
								(NodeList.prototype.filter = Array.prototype.filter);
						},
						function (t, e, n) {
							"use strict";
							n.r(e);
							var i = function () {
									(this.trigger = {
										once: !1,
										offset: {
											viewport: { x: 0, y: 0 },
											element: { x: 0, y: 0 },
										},
										toggle: {
											class: { in: "visible", out: "invisible" },
											callback: { in: null, visible: null, out: null },
										},
									}),
										(this.scroll = {
											sustain: 300,
											element: window,
											callback: function () {},
											start: function () {},
											stop: function () {},
											directionChange: function () {},
										});
								},
								o = n(0),
								r = n.n(o);
							function a(t, e) {
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									(i.enumerable = i.enumerable || !1),
										(i.configurable = !0),
										"value" in i && (i.writable = !0),
										Object.defineProperty(t, i.key, i);
								}
							}
							function s(t) {
								return Number(t) === t && t % 1 == 0;
							}
							function l(t) {
								return Number(t) === t && t % 1 != 0;
							}
							n(1);
							var u = (function () {
								function t(e, n) {
									!(function (t, e) {
										if (!(t instanceof e))
											throw new TypeError("Cannot call a class as a function");
									})(this, t),
										(this.element = e),
										(n = r()(new i().trigger, n)),
										(this.offset = n.offset),
										(this.toggle = n.toggle),
										(this.once = n.once),
										(this.visible = null),
										(this.active = !0);
								}
								var e, n, o;
								return (
									(e = t),
									(n = [
										{
											key: "checkVisibility",
											value: function (t, e) {
												if (!this.active) return this.visible;
												var n = {
														w: t.offsetWidth || t.innerWidth || 0,
														h: t.offsetHeight || t.innerHeight || 0,
													},
													i = this.getBounds(),
													o = this._checkVisibility(i, n, e);
												if (o !== this.visible) {
													this.visible = o;
													var r = this._toggleCallback();
													r instanceof Promise
														? r
																.then(this._toggleClass.bind(this))
																.catch(function (t) {
																	console.error("Trigger promise failed"),
																		console.error(t);
																})
														: this._toggleClass(),
														this.visible && this.once && (this.active = !1);
												} else if (
													o &&
													"function" == typeof this.toggle.callback.visible
												)
													return this.toggle.callback.visible.call(
														this.element,
														this
													);
												return o;
											},
										},
										{
											key: "getBounds",
											value: function () {
												return this.element.getBoundingClientRect();
											},
										},
										{
											key: "_getElementOffset",
											value: function (t, e) {
												var n = { x: 0, y: 0 };
												return (
													"function" == typeof this.offset.element.x
														? (n.x =
																t.width * this.offset.element.x(this, t, e))
														: l(this.offset.element.x)
														? (n.x = t.width * this.offset.element.x)
														: s(this.offset.element.x) &&
														  (n.x = this.offset.element.x),
													"function" == typeof this.offset.element.y
														? (n.y =
																t.height * this.offset.element.y(this, t, e))
														: l(this.offset.element.y)
														? (n.y = t.height * this.offset.element.y)
														: s(this.offset.element.y) &&
														  (n.y = this.offset.element.y),
													n
												);
											},
										},
										{
											key: "_getViewportOffset",
											value: function (t, e) {
												var n = { x: 0, y: 0 };
												return (
													"function" == typeof this.offset.viewport.x
														? (n.x = t.w * this.offset.viewport.x(this, t, e))
														: l(this.offset.viewport.x)
														? (n.x = t.w * this.offset.viewport.x)
														: s(this.offset.viewport.x) &&
														  (n.x = this.offset.viewport.x),
													"function" == typeof this.offset.viewport.y
														? (n.y = t.h * this.offset.viewport.y(this, t, e))
														: l(this.offset.viewport.y)
														? (n.y = t.h * this.offset.viewport.y)
														: s(this.offset.viewport.y) &&
														  (n.y = this.offset.viewport.y),
													n
												);
											},
										},
										{
											key: "_checkVisibility",
											value: function (t, e, n) {
												var i = this._getElementOffset(t, n),
													o = this._getViewportOffset(e, n),
													r = !0;
												return (
													t.left - o.x < -(t.width - i.x) && (r = !1),
													t.left + o.x > e.w - i.x && (r = !1),
													t.top - o.y < -(t.height - i.y) && (r = !1),
													t.top + o.y > e.h - i.y && (r = !1),
													r
												);
											},
										},
										{
											key: "_toggleClass",
											value: function () {
												var t = this;
												if (this.visible)
													return (
														Array.isArray(this.toggle.class.in)
															? this.toggle.class.in.each(function (e) {
																	t.element.classList.add(e);
															  })
															: this.element.classList.add(
																	this.toggle.class.in
															  ),
														void (Array.isArray(this.toggle.class.out)
															? this.toggle.class.out.each(function (e) {
																	t.element.classList.remove(e);
															  })
															: this.element.classList.remove(
																	this.toggle.class.out
															  ))
													);
												Array.isArray(this.toggle.class.in)
													? this.toggle.class.in.each(function (e) {
															t.element.classList.remove(e);
													  })
													: this.element.classList.remove(this.toggle.class.in),
													Array.isArray(this.toggle.class.out)
														? this.toggle.class.out.each(function (e) {
																t.element.classList.add(e);
														  })
														: this.element.classList.add(this.toggle.class.out);
											},
										},
										{
											key: "_toggleCallback",
											value: function () {
												if (this.visible) {
													if ("function" == typeof this.toggle.callback.in)
														return this.toggle.callback.in.call(
															this.element,
															this
														);
												} else if (
													"function" == typeof this.toggle.callback.out
												)
													return this.toggle.callback.out.call(
														this.element,
														this
													);
											},
										},
									]) && a(e.prototype, n),
									o && a(e, o),
									t
								);
							})();
							function c(t, e) {
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									(i.enumerable = i.enumerable || !1),
										(i.configurable = !0),
										"value" in i && (i.writable = !0),
										Object.defineProperty(t, i.key, i);
								}
							}
							var f = (function () {
								function t(e) {
									!(function (t, e) {
										if (!(t instanceof e))
											throw new TypeError("Cannot call a class as a function");
									})(this, t),
										(this.triggers = e instanceof Array ? e : []);
								}
								var e, n, i;
								return (
									(e = t),
									(n = [
										{
											key: "add",
											value: function (t) {
												var e = this;
												if (t instanceof u) return this.triggers.push(t);
												t.each(function (t) {
													t instanceof u
														? e.triggers.push(t)
														: console.error(
																"Object added to TriggerCollection is not a Trigger. Object: ",
																t
														  );
												});
											},
										},
										{
											key: "remove",
											value: function (t) {
												t instanceof u && (t = [t]),
													(this.triggers = this.triggers.filter(function (e) {
														var n = !1;
														return (
															t.each(function (t) {
																t == e && (n = !0);
															}),
															!n
														);
													}));
											},
										},
										{
											key: "query",
											value: function (t) {
												return this.triggers.filter(function (e) {
													var n = e.element,
														i = n.parentNode;
													return (
														[].slice.call(i.querySelectorAll(t)).indexOf(n) > -1
													);
												});
											},
										},
										{
											key: "search",
											value: function (t) {
												var e = this.triggers.filter(function (e) {
													if (t instanceof NodeList || Array.isArray(t)) {
														var n = !1;
														return (
															t.each(function (t) {
																e.element == t && (n = !0);
															}),
															n
														);
													}
													return e.element == t;
												});
												return 0 == e.length ? null : e.length > 1 ? e : e[0];
											},
										},
										{
											key: "call",
											value: function (t) {
												this.triggers.each(t);
											},
										},
									]) && c(e.prototype, n),
									i && c(e, i),
									t
								);
							})();
							function d(t, e) {
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									(i.enumerable = i.enumerable || !1),
										(i.configurable = !0),
										"value" in i && (i.writable = !0),
										Object.defineProperty(t, i.key, i);
								}
							}
							var h = (function () {
								function t(e, n) {
									!(function (t, e) {
										if (!(t instanceof e))
											throw new TypeError("Cannot call a class as a function");
									})(this, t),
										this._parseOptions(e),
										"function" == typeof n && (this.callback = n),
										(this.direction = "none"),
										(this.position = this.getPosition()),
										(this.lastAction = this._getTimestamp()),
										this._startRun(),
										(this._boundListener = this._didScroll.bind(this)),
										this.element.addEventListener(
											"scroll",
											this._boundListener
										);
								}
								var e, n, o;
								return (
									(e = t),
									(n = [
										{
											key: "_parseOptions",
											value: function (t) {
												var e = new i().scroll;
												"function" != typeof t
													? ((e.callback = function () {}), (e = r()(e, t)))
													: (e.callback = t),
													(this.element = e.element),
													(this.sustain = e.sustain),
													(this.callback = e.callback),
													(this.startCallback = e.start),
													(this.stopCallback = e.stop),
													(this.directionChange = e.directionChange);
											},
										},
										{
											key: "_didScroll",
											value: function () {
												var t = this.getPosition();
												if (this.position !== t) {
													var e = this.direction;
													(e =
														t.x !== this.position.x
															? t.x > this.position.x
																? "right"
																: "left"
															: t.y !== this.position.y
															? t.y > this.position.y
																? "bottom"
																: "top"
															: "none") !== this.direction &&
														((this.direction = e),
														"function" == typeof this.directionChange &&
															this.directionChange(this.direction)),
														(this.position = t),
														(this.lastAction = this._getTimestamp());
												} else this.direction = "none";
												this.running || this._startRun();
											},
										},
										{
											key: "_startRun",
											value: function () {
												(this.running = !0),
													"function" == typeof this.startCallback &&
														this.startCallback(),
													this._loop();
											},
										},
										{
											key: "_stopRun",
											value: function () {
												(this.running = !1),
													"function" == typeof this.stopCallback &&
														this.stopCallback();
											},
										},
										{
											key: "getPosition",
											value: function () {
												return {
													x:
														this.element.pageXOffset ||
														this.element.scrollLeft ||
														document.documentElement.scrollLeft ||
														0,
													y:
														this.element.pageYOffset ||
														this.element.scrollTop ||
														document.documentElement.scrollTop ||
														0,
												};
											},
										},
										{
											key: "_getTimestamp",
											value: function () {
												return Number(Date.now());
											},
										},
										{
											key: "_tick",
											value: function () {
												this.callback(this.position, this.direction),
													this._getTimestamp() - this.lastAction >
														this.sustain && this._stopRun(),
													this.running && this._loop();
											},
										},
										{
											key: "_loop",
											value: function () {
												(
													window.requestAnimationFrame ||
													window.webkitRequestAnimationFrame ||
													window.mozRequestAnimationFrame ||
													window.msRequestAnimationFrame ||
													window.oRequestAnimationFrame ||
													function (t) {
														setTimeout(t, 1e3 / 60);
													}
												)(this._tick.bind(this));
											},
										},
										{
											key: "kill",
											value: function () {
												(this.running = !1),
													this.element.removeEventListener(
														"scroll",
														this._boundListener
													);
											},
										},
									]) && d(e.prototype, n),
									o && d(e, o),
									t
								);
							})();
							function v(t, e) {
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									(i.enumerable = i.enumerable || !1),
										(i.configurable = !0),
										"value" in i && (i.writable = !0),
										Object.defineProperty(t, i.key, i);
								}
							}
							n.d(e, "Trigger", function () {
								return p;
							}),
								n.d(e, "TriggerCollection", function () {
									return m;
								}),
								n.d(e, "ScrollAnimationLoop", function () {
									return g;
								}),
								n.d(e, "default", function () {
									return y;
								});
							/*!
							 * ScrollTrigger
							 *
							 *
							 * http://github.com/terwanerik
							 *
							 * Copyright 2017, Erik Terwan <erik@erikterwan.com>
							 * Released under the MIT license.
							 *
							 * Date: 2017-07-09
							 */
							var p = u,
								m = f,
								g = h,
								y = (function () {
									function t(e) {
										!(function (t, e) {
											if (!(t instanceof e))
												throw new TypeError(
													"Cannot call a class as a function"
												);
										})(this, t),
											this._parseOptions(e),
											this._initCollection(),
											this._initLoop();
									}
									var e, n, o;
									return (
										(e = t),
										(n = [
											{
												key: "_parseOptions",
												value: function (t) {
													(t = r()(new i(), t)),
														(this.defaultTrigger = t.trigger),
														(this.scrollOptions = t.scroll);
												},
											},
											{
												key: "_initCollection",
												value: function () {
													var t = document.querySelectorAll("[data-scroll]"),
														e = [];
													t.length > 0 && (e = this.createTriggers(t)),
														(this.collection = new m(e));
												},
											},
											{
												key: "_initLoop",
												value: function () {
													var t = this;
													this.loop = new g({
														sustain: this.scrollOptions.sustain,
														element: this.scrollOptions.element,
														callback: function (e, n) {
															t._scrollCallback(e, n);
														},
														start: function () {
															t._scrollStart();
														},
														stop: function () {
															t._scrollStop();
														},
														directionChange: function (e) {
															t._scrollDirectionChange(e);
														},
													});
												},
											},
											{
												key: "_scrollCallback",
												value: function (t, e) {
													var n = this;
													this.collection.call(function (t) {
														t.checkVisibility(n.scrollOptions.element, e);
													}),
														this.scrollOptions.callback(t, e);
												},
											},
											{
												key: "_scrollStart",
												value: function () {
													this.scrollOptions.start();
												},
											},
											{
												key: "_scrollStop",
												value: function () {
													this.scrollOptions.stop();
												},
											},
											{
												key: "_scrollDirectionChange",
												value: function (t) {
													this.scrollOptions.directionChange(t);
												},
											},
											{
												key: "createTrigger",
												value: function (t, e) {
													return new p(t, r()(this.defaultTrigger, e));
												},
											},
											{
												key: "createTriggers",
												value: function (t, e) {
													var n = this,
														i = [];
													return (
														t.each(function (t) {
															i.push(n.createTrigger(t, e));
														}),
														i
													);
												},
											},
											{
												key: "add",
												value: function (t, e) {
													return t instanceof HTMLElement
														? (this.collection.add(this.createTrigger(t, e)),
														  this)
														: t instanceof p
														? (this.collection.add(t), this)
														: t instanceof NodeList
														? (this.collection.add(this.createTriggers(t, e)),
														  this)
														: Array.isArray(t) && t.length && t[0] instanceof p
														? (this.collection.add(t), this)
														: Array.isArray(t) &&
														  t.length &&
														  t[0] instanceof HTMLElement
														? (this.collection.add(this.createTriggers(t, e)),
														  this)
														: (this.collection.add(
																this.createTriggers(
																	document.querySelectorAll(t),
																	e
																)
														  ),
														  this);
												},
											},
											{
												key: "remove",
												value: function (t) {
													return t instanceof p ||
														(Array.isArray(t) && t.length && t[0] instanceof p)
														? (this.collection.remove(t), this)
														: t instanceof HTMLElement ||
														  (Array.isArray(t) &&
																t.length &&
																t[0] instanceof HTMLElement) ||
														  t instanceof NodeList
														? (this.collection.remove(this.search(t)), this)
														: Array.isArray(t) && t.length && t[0] instanceof p
														? (this.collection.remove(t), this)
														: (this.collection.remove(this.query(t.toString())),
														  this);
												},
											},
											{
												key: "query",
												value: function (t) {
													return this.collection.query(t);
												},
											},
											{
												key: "search",
												value: function (t) {
													return this.collection.search(t);
												},
											},
											{
												key: "listen",
												value: function () {
													this.loop || this._initLoop();
												},
											},
											{
												key: "kill",
												value: function () {
													this.loop.kill(), (this.loop = null);
												},
											},
										]) && v(e.prototype, n),
										o && v(e, o),
										t
									);
								})();
						},
					]);
				}),
				(t.exports = i());
		},
	],
]);
