function t() {}
const n = (t) => t;
function e(t, n) {
	for (const e in n) t[e] = n[e];
	return t;
}
function o(t) {
	return t();
}
function r() {
	return Object.create(null);
}
function i(t) {
	t.forEach(o);
}
function s(t) {
	return 'function' == typeof t;
}
function c(t, n) {
	return t != t ? n == n : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
}
function a(t, n, e, o) {
	if (t) {
		const r = u(t, n, e, o);
		return t[0](r);
	}
}
function u(t, n, o, r) {
	return t[1] && r ? e(o.ctx.slice(), t[1](r(n))) : o.ctx;
}
function l(t, n, e, o, r, i, s) {
	const c = (function (t, n, e, o) {
		if (t[2] && o) {
			const r = t[2](o(e));
			if (void 0 === n.dirty) return r;
			if ('object' == typeof r) {
				const t = [],
					e = Math.max(n.dirty.length, r.length);
				for (let o = 0; o < e; o += 1) t[o] = n.dirty[o] | r[o];
				return t;
			}
			return n.dirty | r;
		}
		return n.dirty;
	})(n, o, r, i);
	if (c) {
		const r = u(n, e, o, s);
		t.p(r, c);
	}
}
const f = 'undefined' != typeof window;
let d = f ? () => window.performance.now() : () => Date.now(),
	h = f ? (t) => requestAnimationFrame(t) : t;
const m = new Set();
function p(t) {
	m.forEach((n) => {
		n.c(t) || (m.delete(n), n.f());
	}),
		0 !== m.size && h(p);
}
function _(t) {
	let n;
	return (
		0 === m.size && h(p),
		{
			promise: new Promise((e) => {
				m.add((n = { c: t, f: e }));
			}),
			abort() {
				m.delete(n);
			}
		}
	);
}
let g = !1;
function $(t, n, e, o) {
	for (; t < n; ) {
		const r = t + ((n - t) >> 1);
		e(r) <= o ? (t = r + 1) : (n = r);
	}
	return t;
}
function y(t, n) {
	g
		? (!(function (t) {
				if (t.hydrate_init) return;
				t.hydrate_init = !0;
				const n = t.childNodes,
					e = new Int32Array(n.length + 1),
					o = new Int32Array(n.length);
				e[0] = -1;
				let r = 0;
				for (let a = 0; a < n.length; a++) {
					const t = $(1, r + 1, (t) => n[e[t]].claim_order, n[a].claim_order) - 1;
					o[a] = e[t] + 1;
					const i = t + 1;
					(e[i] = a), (r = Math.max(i, r));
				}
				const i = [],
					s = [];
				let c = n.length - 1;
				for (let a = e[r] + 1; 0 != a; a = o[a - 1]) {
					for (i.push(n[a - 1]); c >= a; c--) s.push(n[c]);
					c--;
				}
				for (; c >= 0; c--) s.push(n[c]);
				i.reverse(), s.sort((t, n) => t.claim_order - n.claim_order);
				for (let a = 0, u = 0; a < s.length; a++) {
					for (; u < i.length && s[a].claim_order >= i[u].claim_order; ) u++;
					const n = u < i.length ? i[u] : null;
					t.insertBefore(s[a], n);
				}
		  })(t),
		  (void 0 === t.actual_end_child ||
				(null !== t.actual_end_child && t.actual_end_child.parentElement !== t)) &&
				(t.actual_end_child = t.firstChild),
		  n !== t.actual_end_child
				? t.insertBefore(n, t.actual_end_child)
				: (t.actual_end_child = n.nextSibling))
		: n.parentNode !== t && t.appendChild(n);
}
function b(t, n, e) {
	g && !e
		? y(t, n)
		: (n.parentNode !== t || (e && n.nextSibling !== e)) && t.insertBefore(n, e || null);
}
function x(t) {
	t.parentNode.removeChild(t);
}
function v(t) {
	return document.createElement(t);
}
function w(t) {
	return document.createTextNode(t);
}
function E() {
	return w(' ');
}
function k() {
	return w('');
}
function A(t, n, e, o) {
	return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
}
function C(t, n, e) {
	null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function S(t) {
	return Array.from(t.childNodes);
}
function N(t, n, e, o, r = !1) {
	void 0 === t.claim_info && (t.claim_info = { last_index: 0, total_claimed: 0 });
	const i = (() => {
		for (let o = t.claim_info.last_index; o < t.length; o++) {
			const i = t[o];
			if (n(i)) return e(i), t.splice(o, 1), r || (t.claim_info.last_index = o), i;
		}
		for (let o = t.claim_info.last_index - 1; o >= 0; o--) {
			const i = t[o];
			if (n(i))
				return (
					e(i), t.splice(o, 1), r ? t.claim_info.last_index-- : (t.claim_info.last_index = o), i
				);
		}
		return o();
	})();
	return (i.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), i;
}
function j(t, n, e, o) {
	return N(
		t,
		(t) => t.nodeName === n,
		(t) => {
			const n = [];
			for (let o = 0; o < t.attributes.length; o++) {
				const r = t.attributes[o];
				e[r.name] || n.push(r.name);
			}
			n.forEach((n) => t.removeAttribute(n));
		},
		() =>
			o
				? (function (t) {
						return document.createElementNS('http://www.w3.org/2000/svg', t);
				  })(n)
				: v(n)
	);
}
function O(t, n) {
	return N(
		t,
		(t) => 3 === t.nodeType,
		(t) => {
			t.data = '' + n;
		},
		() => w(n),
		!0
	);
}
function M(t) {
	return O(t, ' ');
}
function z(t, n) {
	(n = '' + n), t.wholeText !== n && (t.data = n);
}
function B(t, n, e, o) {
	t.style.setProperty(n, e, o ? 'important' : '');
}
const P = new Set();
let R,
	q = 0;
function D(t, n, e, o, r, i, s, c = 0) {
	const a = 16.666 / o;
	let u = '{\n';
	for (let _ = 0; _ <= 1; _ += a) {
		const t = n + (e - n) * i(_);
		u += 100 * _ + `%{${s(t, 1 - t)}}\n`;
	}
	const l = u + `100% {${s(e, 1 - e)}}\n}`,
		f = `__svelte_${(function (t) {
			let n = 5381,
				e = t.length;
			for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
			return n >>> 0;
		})(l)}_${c}`,
		d = t.ownerDocument;
	P.add(d);
	const h = d.__svelte_stylesheet || (d.__svelte_stylesheet = d.head.appendChild(v('style')).sheet),
		m = d.__svelte_rules || (d.__svelte_rules = {});
	m[f] || ((m[f] = !0), h.insertRule(`@keyframes ${f} ${l}`, h.cssRules.length));
	const p = t.style.animation || '';
	return (t.style.animation = `${p ? `${p}, ` : ''}${f} ${o}ms linear ${r}ms 1 both`), (q += 1), f;
}
function F(t, n) {
	const e = (t.style.animation || '').split(', '),
		o = e.filter(n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf('__svelte')),
		r = e.length - o.length;
	r &&
		((t.style.animation = o.join(', ')),
		(q -= r),
		q ||
			h(() => {
				q ||
					(P.forEach((t) => {
						const n = t.__svelte_stylesheet;
						let e = n.cssRules.length;
						for (; e--; ) n.deleteRule(e);
						t.__svelte_rules = {};
					}),
					P.clear());
			}));
}
function I(t) {
	R = t;
}
function L() {
	if (!R) throw new Error('Function called outside component initialization');
	return R;
}
function T(t) {
	L().$$.on_mount.push(t);
}
function G(t) {
	L().$$.after_update.push(t);
}
function H(t, n) {
	L().$$.context.set(t, n);
}
const J = [],
	K = [],
	Q = [],
	U = [],
	V = Promise.resolve();
let W = !1;
function X(t) {
	Q.push(t);
}
let Y = !1;
const Z = new Set();
function tt() {
	if (!Y) {
		Y = !0;
		do {
			for (let t = 0; t < J.length; t += 1) {
				const n = J[t];
				I(n), nt(n.$$);
			}
			for (I(null), J.length = 0; K.length; ) K.pop()();
			for (let t = 0; t < Q.length; t += 1) {
				const n = Q[t];
				Z.has(n) || (Z.add(n), n());
			}
			Q.length = 0;
		} while (J.length);
		for (; U.length; ) U.pop()();
		(W = !1), (Y = !1), Z.clear();
	}
}
function nt(t) {
	if (null !== t.fragment) {
		t.update(), i(t.before_update);
		const n = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(X);
	}
}
let et;
function ot() {
	return (
		et ||
			((et = Promise.resolve()),
			et.then(() => {
				et = null;
			})),
		et
	);
}
function rt(t, n, e) {
	t.dispatchEvent(
		(function (t, n) {
			const e = document.createEvent('CustomEvent');
			return e.initCustomEvent(t, !1, !1, n), e;
		})(`${n ? 'intro' : 'outro'}${e}`)
	);
}
const it = new Set();
let st;
function ct() {
	st = { r: 0, c: [], p: st };
}
function at() {
	st.r || i(st.c), (st = st.p);
}
function ut(t, n) {
	t && t.i && (it.delete(t), t.i(n));
}
function lt(t, n, e, o) {
	if (t && t.o) {
		if (it.has(t)) return;
		it.add(t),
			st.c.push(() => {
				it.delete(t), o && (e && t.d(1), o());
			}),
			t.o(n);
	}
}
const ft = { duration: 0 };
function dt(e, o, r) {
	let i,
		c,
		a = o(e, r),
		u = !1,
		l = 0;
	function f() {
		i && F(e, i);
	}
	function h() {
		const { delay: o = 0, duration: r = 300, easing: s = n, tick: h = t, css: m } = a || ft;
		m && (i = D(e, 0, 1, r, o, s, m, l++)), h(0, 1);
		const p = d() + o,
			g = p + r;
		c && c.abort(),
			(u = !0),
			X(() => rt(e, !0, 'start')),
			(c = _((t) => {
				if (u) {
					if (t >= g) return h(1, 0), rt(e, !0, 'end'), f(), (u = !1);
					if (t >= p) {
						const n = s((t - p) / r);
						h(n, 1 - n);
					}
				}
				return u;
			}));
	}
	let m = !1;
	return {
		start() {
			m || (F(e), s(a) ? ((a = a()), ot().then(h)) : h());
		},
		invalidate() {
			m = !1;
		},
		end() {
			u && (f(), (u = !1));
		}
	};
}
function ht(e, o, r, c) {
	let a = o(e, r),
		u = c ? 0 : 1,
		l = null,
		f = null,
		h = null;
	function m() {
		h && F(e, h);
	}
	function p(t, n) {
		const e = t.b - u;
		return (
			(n *= Math.abs(e)),
			{ a: u, b: t.b, d: e, duration: n, start: t.start, end: t.start + n, group: t.group }
		);
	}
	function g(o) {
		const { delay: r = 0, duration: s = 300, easing: c = n, tick: g = t, css: $ } = a || ft,
			y = { start: d() + r, b: o };
		o || ((y.group = st), (st.r += 1)),
			l || f
				? (f = y)
				: ($ && (m(), (h = D(e, u, o, s, r, c, $))),
				  o && g(0, 1),
				  (l = p(y, s)),
				  X(() => rt(e, o, 'start')),
				  _((t) => {
						if (
							(f &&
								t > f.start &&
								((l = p(f, s)),
								(f = null),
								rt(e, l.b, 'start'),
								$ && (m(), (h = D(e, u, l.b, l.duration, 0, c, a.css)))),
							l)
						)
							if (t >= l.end)
								g((u = l.b), 1 - u),
									rt(e, l.b, 'end'),
									f || (l.b ? m() : --l.group.r || i(l.group.c)),
									(l = null);
							else if (t >= l.start) {
								const n = t - l.start;
								(u = l.a + l.d * c(n / l.duration)), g(u, 1 - u);
							}
						return !(!l && !f);
				  }));
	}
	return {
		run(t) {
			s(a)
				? ot().then(() => {
						(a = a()), g(t);
				  })
				: g(t);
		},
		end() {
			m(), (l = f = null);
		}
	};
}
function mt(t, n) {
	const e = {},
		o = {},
		r = { $$scope: 1 };
	let i = t.length;
	for (; i--; ) {
		const s = t[i],
			c = n[i];
		if (c) {
			for (const t in s) t in c || (o[t] = 1);
			for (const t in c) r[t] || ((e[t] = c[t]), (r[t] = 1));
			t[i] = c;
		} else for (const t in s) r[t] = 1;
	}
	for (const s in o) s in e || (e[s] = void 0);
	return e;
}
function pt(t) {
	return 'object' == typeof t && null !== t ? t : {};
}
function _t(t) {
	t && t.c();
}
function gt(t, n) {
	t && t.l(n);
}
function $t(t, n, e, r) {
	const { fragment: c, on_mount: a, on_destroy: u, after_update: l } = t.$$;
	c && c.m(n, e),
		r ||
			X(() => {
				const n = a.map(o).filter(s);
				u ? u.push(...n) : i(n), (t.$$.on_mount = []);
			}),
		l.forEach(X);
}
function yt(t, n) {
	const e = t.$$;
	null !== e.fragment &&
		(i(e.on_destroy),
		e.fragment && e.fragment.d(n),
		(e.on_destroy = e.fragment = null),
		(e.ctx = []));
}
function bt(t, n) {
	-1 === t.$$.dirty[0] && (J.push(t), W || ((W = !0), V.then(tt)), t.$$.dirty.fill(0)),
		(t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function xt(n, e, o, s, c, a, u = [-1]) {
	const l = R;
	I(n);
	const f = (n.$$ = {
		fragment: null,
		ctx: null,
		props: a,
		update: t,
		not_equal: c,
		bound: r(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(l ? l.$$.context : e.context || []),
		callbacks: r(),
		dirty: u,
		skip_bound: !1
	});
	let d = !1;
	if (
		((f.ctx = o
			? o(n, e.props || {}, (t, e, ...o) => {
					const r = o.length ? o[0] : e;
					return (
						f.ctx &&
							c(f.ctx[t], (f.ctx[t] = r)) &&
							(!f.skip_bound && f.bound[t] && f.bound[t](r), d && bt(n, t)),
						e
					);
			  })
			: []),
		f.update(),
		(d = !0),
		i(f.before_update),
		(f.fragment = !!s && s(f.ctx)),
		e.target)
	) {
		if (e.hydrate) {
			g = !0;
			const t = S(e.target);
			f.fragment && f.fragment.l(t), t.forEach(x);
		} else f.fragment && f.fragment.c();
		e.intro && ut(n.$$.fragment), $t(n, e.target, e.anchor, e.customElement), (g = !1), tt();
	}
	I(l);
}
class vt {
	$destroy() {
		yt(this, 1), (this.$destroy = t);
	}
	$on(t, n) {
		const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
		return (
			e.push(n),
			() => {
				const t = e.indexOf(n);
				-1 !== t && e.splice(t, 1);
			}
		);
	}
	$set(t) {
		var n;
		this.$$set &&
			((n = t), 0 !== Object.keys(n).length) &&
			((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
}
const wt = [];
function Et(n, e = t) {
	let o;
	const r = [];
	function i(t) {
		if (c(n, t) && ((n = t), o)) {
			const t = !wt.length;
			for (let e = 0; e < r.length; e += 1) {
				const t = r[e];
				t[1](), wt.push(t, n);
			}
			if (t) {
				for (let t = 0; t < wt.length; t += 2) wt[t][0](wt[t + 1]);
				wt.length = 0;
			}
		}
	}
	return {
		set: i,
		update: function (t) {
			i(t(n));
		},
		subscribe: function (s, c = t) {
			const a = [s, c];
			return (
				r.push(a),
				1 === r.length && (o = e(i) || t),
				s(n),
				() => {
					const t = r.indexOf(a);
					-1 !== t && r.splice(t, 1), 0 === r.length && (o(), (o = null));
				}
			);
		}
	};
}
function kt(t) {
	const n = t - 1;
	return n * n * n + 1;
}
function At(t) {
	return --t * t * t * t * t + 1;
}
function Ct(
	t,
	{ delay: n = 0, duration: e = 400, easing: o = kt, x: r = 0, y: i = 0, opacity: s = 0 } = {}
) {
	const c = getComputedStyle(t),
		a = +c.opacity,
		u = 'none' === c.transform ? '' : c.transform,
		l = a * (1 - s);
	return {
		delay: n,
		duration: e,
		easing: o,
		css: (t, n) =>
			`\n\t\t\ttransform: ${u} translate(${(1 - t) * r}px, ${(1 - t) * i}px);\n\t\t\topacity: ${
				a - l * n
			}`
	};
}
function St(
	t,
	{ delay: n = 0, duration: e = 400, easing: o = kt, start: r = 0, opacity: i = 0 } = {}
) {
	const s = getComputedStyle(t),
		c = +s.opacity,
		a = 'none' === s.transform ? '' : s.transform,
		u = 1 - r,
		l = c * (1 - i);
	return {
		delay: n,
		duration: e,
		easing: o,
		css: (t, n) => `\n\t\t\ttransform: ${a} scale(${1 - u * n});\n\t\t\topacity: ${c - l * n}\n\t\t`
	};
}
export {
	T as A,
	e as B,
	Et as C,
	y as D,
	A as E,
	X as F,
	ht as G,
	At as H,
	Ct as I,
	dt as J,
	a as K,
	B as L,
	l as M,
	t as N,
	St as O,
	vt as S,
	S as a,
	C as b,
	j as c,
	x as d,
	v as e,
	b as f,
	O as g,
	z as h,
	xt as i,
	_t as j,
	E as k,
	k as l,
	gt as m,
	M as n,
	$t as o,
	mt as p,
	pt as q,
	ct as r,
	c as s,
	w as t,
	lt as u,
	yt as v,
	at as w,
	ut as x,
	H as y,
	G as z
};
