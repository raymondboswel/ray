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
		const r = l(t, n, e, o);
		return t[0](r);
	}
}
function l(t, n, o, r) {
	return t[1] && r ? e(o.ctx.slice(), t[1](r(n))) : o.ctx;
}
function u(t, n, e, o, r, i, s) {
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
		const r = l(n, e, o, s);
		t.p(r, c);
	}
}
const f = 'undefined' != typeof window;
let d = f ? () => window.performance.now() : () => Date.now(),
	h = f ? (t) => requestAnimationFrame(t) : t;
const _ = new Set();
function p(t) {
	_.forEach((n) => {
		n.c(t) || (_.delete(n), n.f());
	}),
		0 !== _.size && h(p);
}
let m = !1;
function g(t, n, e, o) {
	for (; t < n; ) {
		const r = t + ((n - t) >> 1);
		e(r) <= o ? (t = r + 1) : (n = r);
	}
	return t;
}
function $(t, n) {
	m
		? (!(function (t) {
				if (t.hydrate_init) return;
				t.hydrate_init = !0;
				const n = t.childNodes,
					e = new Int32Array(n.length + 1),
					o = new Int32Array(n.length);
				e[0] = -1;
				let r = 0;
				for (let a = 0; a < n.length; a++) {
					const t = g(1, r + 1, (t) => n[e[t]].claim_order, n[a].claim_order) - 1;
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
				for (let a = 0, l = 0; a < s.length; a++) {
					for (; l < i.length && s[a].claim_order >= i[l].claim_order; ) l++;
					const n = l < i.length ? i[l] : null;
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
function y(t, n, e) {
	m && !e
		? $(t, n)
		: (n.parentNode !== t || (e && n.nextSibling !== e)) && t.insertBefore(n, e || null);
}
function b(t) {
	t.parentNode.removeChild(t);
}
function x(t) {
	return document.createElement(t);
}
function v(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
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
function A(t, n, e) {
	null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function C(t) {
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
function S(t, n, e, o) {
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
		() => (o ? v(n) : x(n))
	);
}
function j(t, n) {
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
	return j(t, ' ');
}
function O(t, n) {
	(n = '' + n), t.wholeText !== n && (t.data = n);
}
function z(t, n, e, o) {
	t.style.setProperty(n, e, o ? 'important' : '');
}
const B = new Set();
let P,
	R = 0;
function T(t, n, e, o, r, i, s, c = 0) {
	const a = 16.666 / o;
	let l = '{\n';
	for (let m = 0; m <= 1; m += a) {
		const t = n + (e - n) * i(m);
		l += 100 * m + `%{${s(t, 1 - t)}}\n`;
	}
	const u = l + `100% {${s(e, 1 - e)}}\n}`,
		f = `__svelte_${(function (t) {
			let n = 5381,
				e = t.length;
			for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
			return n >>> 0;
		})(u)}_${c}`,
		d = t.ownerDocument;
	B.add(d);
	const h = d.__svelte_stylesheet || (d.__svelte_stylesheet = d.head.appendChild(x('style')).sheet),
		_ = d.__svelte_rules || (d.__svelte_rules = {});
	_[f] || ((_[f] = !0), h.insertRule(`@keyframes ${f} ${u}`, h.cssRules.length));
	const p = t.style.animation || '';
	return (t.style.animation = `${p ? `${p}, ` : ''}${f} ${o}ms linear ${r}ms 1 both`), (R += 1), f;
}
function q(t, n) {
	const e = (t.style.animation || '').split(', '),
		o = e.filter(n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf('__svelte')),
		r = e.length - o.length;
	r &&
		((t.style.animation = o.join(', ')),
		(R -= r),
		R ||
			h(() => {
				R ||
					(B.forEach((t) => {
						const n = t.__svelte_stylesheet;
						let e = n.cssRules.length;
						for (; e--; ) n.deleteRule(e);
						t.__svelte_rules = {};
					}),
					B.clear());
			}));
}
function D(t) {
	P = t;
}
function F() {
	if (!P) throw new Error('Function called outside component initialization');
	return P;
}
function I(t) {
	F().$$.on_mount.push(t);
}
function L(t) {
	F().$$.after_update.push(t);
}
function G(t, n) {
	F().$$.context.set(t, n);
}
const H = [],
	J = [],
	K = [],
	Q = [],
	U = Promise.resolve();
let V = !1;
function W(t) {
	K.push(t);
}
let X = !1;
const Y = new Set();
function Z() {
	if (!X) {
		X = !0;
		do {
			for (let t = 0; t < H.length; t += 1) {
				const n = H[t];
				D(n), tt(n.$$);
			}
			for (D(null), H.length = 0; J.length; ) J.pop()();
			for (let t = 0; t < K.length; t += 1) {
				const n = K[t];
				Y.has(n) || (Y.add(n), n());
			}
			K.length = 0;
		} while (H.length);
		for (; Q.length; ) Q.pop()();
		(V = !1), (X = !1), Y.clear();
	}
}
function tt(t) {
	if (null !== t.fragment) {
		t.update(), i(t.before_update);
		const n = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(W);
	}
}
let nt;
function et(t, n, e) {
	t.dispatchEvent(
		(function (t, n) {
			const e = document.createEvent('CustomEvent');
			return e.initCustomEvent(t, !1, !1, n), e;
		})(`${n ? 'intro' : 'outro'}${e}`)
	);
}
const ot = new Set();
let rt;
function it() {
	rt = { r: 0, c: [], p: rt };
}
function st() {
	rt.r || i(rt.c), (rt = rt.p);
}
function ct(t, n) {
	t && t.i && (ot.delete(t), t.i(n));
}
function at(t, n, e, o) {
	if (t && t.o) {
		if (ot.has(t)) return;
		ot.add(t),
			rt.c.push(() => {
				ot.delete(t), o && (e && t.d(1), o());
			}),
			t.o(n);
	}
}
const lt = { duration: 0 };
function ut(e, o, r, c) {
	let a = o(e, r),
		l = c ? 0 : 1,
		u = null,
		f = null,
		m = null;
	function g() {
		m && q(e, m);
	}
	function $(t, n) {
		const e = t.b - l;
		return (
			(n *= Math.abs(e)),
			{ a: l, b: t.b, d: e, duration: n, start: t.start, end: t.start + n, group: t.group }
		);
	}
	function y(o) {
		const { delay: r = 0, duration: s = 300, easing: c = n, tick: y = t, css: b } = a || lt,
			x = { start: d() + r, b: o };
		o || ((x.group = rt), (rt.r += 1)),
			u || f
				? (f = x)
				: (b && (g(), (m = T(e, l, o, s, r, c, b))),
				  o && y(0, 1),
				  (u = $(x, s)),
				  W(() => et(e, o, 'start')),
				  (function (t) {
						let n;
						0 === _.size && h(p),
							new Promise((e) => {
								_.add((n = { c: t, f: e }));
							});
				  })((t) => {
						if (
							(f &&
								t > f.start &&
								((u = $(f, s)),
								(f = null),
								et(e, u.b, 'start'),
								b && (g(), (m = T(e, l, u.b, u.duration, 0, c, a.css)))),
							u)
						)
							if (t >= u.end)
								y((l = u.b), 1 - l),
									et(e, u.b, 'end'),
									f || (u.b ? g() : --u.group.r || i(u.group.c)),
									(u = null);
							else if (t >= u.start) {
								const n = t - u.start;
								(l = u.a + u.d * c(n / u.duration)), y(l, 1 - l);
							}
						return !(!u && !f);
				  }));
	}
	return {
		run(t) {
			s(a)
				? (nt ||
						((nt = Promise.resolve()),
						nt.then(() => {
							nt = null;
						})),
				  nt).then(() => {
						(a = a()), y(t);
				  })
				: y(t);
		},
		end() {
			g(), (u = f = null);
		}
	};
}
function ft(t, n) {
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
function dt(t) {
	return 'object' == typeof t && null !== t ? t : {};
}
function ht(t) {
	t && t.c();
}
function _t(t, n) {
	t && t.l(n);
}
function pt(t, n, e, r) {
	const { fragment: c, on_mount: a, on_destroy: l, after_update: u } = t.$$;
	c && c.m(n, e),
		r ||
			W(() => {
				const n = a.map(o).filter(s);
				l ? l.push(...n) : i(n), (t.$$.on_mount = []);
			}),
		u.forEach(W);
}
function mt(t, n) {
	const e = t.$$;
	null !== e.fragment &&
		(i(e.on_destroy),
		e.fragment && e.fragment.d(n),
		(e.on_destroy = e.fragment = null),
		(e.ctx = []));
}
function gt(t, n) {
	-1 === t.$$.dirty[0] && (H.push(t), V || ((V = !0), U.then(Z)), t.$$.dirty.fill(0)),
		(t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function $t(n, e, o, s, c, a, l = [-1]) {
	const u = P;
	D(n);
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
		context: new Map(u ? u.$$.context : e.context || []),
		callbacks: r(),
		dirty: l,
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
							(!f.skip_bound && f.bound[t] && f.bound[t](r), d && gt(n, t)),
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
			m = !0;
			const t = C(e.target);
			f.fragment && f.fragment.l(t), t.forEach(b);
		} else f.fragment && f.fragment.c();
		e.intro && ct(n.$$.fragment), pt(n, e.target, e.anchor, e.customElement), (m = !1), Z();
	}
	D(u);
}
class yt {
	$destroy() {
		mt(this, 1), (this.$destroy = t);
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
const bt = [];
function xt(n, e = t) {
	let o;
	const r = [];
	function i(t) {
		if (c(n, t) && ((n = t), o)) {
			const t = !bt.length;
			for (let e = 0; e < r.length; e += 1) {
				const t = r[e];
				t[1](), bt.push(t, n);
			}
			if (t) {
				for (let t = 0; t < bt.length; t += 2) bt[t][0](bt[t + 1]);
				bt.length = 0;
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
function vt(t) {
	return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function wt(t) {
	const n = t - 1;
	return n * n * n + 1;
}
function Et(t) {
	return --t * t * t * t * t + 1;
}
function kt(
	t,
	{ delay: n = 0, duration: e = 400, easing: o = wt, x: r = 0, y: i = 0, opacity: s = 0 } = {}
) {
	const c = getComputedStyle(t),
		a = +c.opacity,
		l = 'none' === c.transform ? '' : c.transform,
		u = a * (1 - s);
	return {
		delay: n,
		duration: e,
		easing: o,
		css: (t, n) =>
			`\n\t\t\ttransform: ${l} translate(${(1 - t) * r}px, ${(1 - t) * i}px);\n\t\t\topacity: ${
				a - u * n
			}`
	};
}
function At(t, { delay: n = 0, speed: e, duration: o, easing: r = vt } = {}) {
	const i = t.getTotalLength();
	return (
		void 0 === o ? (o = void 0 === e ? 800 : i / e) : 'function' == typeof o && (o = o(i)),
		{ delay: n, duration: o, easing: r, css: (t, n) => `stroke-dasharray: ${t * i} ${n * i}` }
	);
}
export {
	I as A,
	e as B,
	xt as C,
	a as D,
	u as E,
	$ as F,
	t as G,
	v as H,
	z as I,
	W as J,
	ut as K,
	At as L,
	Et as M,
	kt as N,
	yt as S,
	C as a,
	A as b,
	S as c,
	b as d,
	x as e,
	y as f,
	j as g,
	O as h,
	$t as i,
	ht as j,
	E as k,
	k as l,
	_t as m,
	M as n,
	pt as o,
	ft as p,
	dt as q,
	it as r,
	c as s,
	w as t,
	at as u,
	mt as v,
	st as w,
	ct as x,
	G as y,
	L as z
};
