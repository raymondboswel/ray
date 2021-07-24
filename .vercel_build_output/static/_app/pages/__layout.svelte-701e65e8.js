import {
	S as s,
	i as a,
	s as e,
	e as t,
	t as r,
	k as l,
	c as n,
	a as o,
	g as c,
	d as i,
	n as u,
	b as d,
	f,
	D as m,
	E as h,
	F as g,
	G as y,
	H as v,
	I as p,
	J as $,
	K as b,
	j as x,
	m as E,
	L as I,
	o as k,
	M as w,
	x as j,
	u as A,
	v as D
} from '../chunks/vendor-bb5405de.js';
import { r as N, a as P } from '../chunks/paths-803150c5.js';
/* empty css                                                  */ const S = async function (s, a) {
	return N.goto(s, a, []);
};
function V(s) {
	let a, e, b, x, E, I, k, w, j, A, D, N, P, S;
	return {
		c() {
			(a = t('span')),
				(e = r('About')),
				(x = l()),
				(E = t('span')),
				(I = r('Programming')),
				(w = l()),
				(j = t('span')),
				(A = r('Interests')),
				this.h();
		},
		l(s) {
			a = n(s, 'SPAN', { class: !0 });
			var t = o(a);
			(e = c(t, 'About')), t.forEach(i), (x = u(s)), (E = n(s, 'SPAN', { class: !0 }));
			var r = o(E);
			(I = c(r, 'Programming')), r.forEach(i), (w = u(s)), (j = n(s, 'SPAN', { class: !0 }));
			var l = o(j);
			(A = c(l, 'Interests')), l.forEach(i), this.h();
		},
		h() {
			d(a, 'class', ' menu-item mb-2 hover:bg-dark-grey svelte-18l9664'),
				d(E, 'class', 'menu-item mb-2 hover:bg-dark-grey svelte-18l9664'),
				d(j, 'class', 'menu-item mb-2 hover:bg-dark-grey svelte-18l9664');
		},
		m(t, r) {
			f(t, a, r),
				m(a, e),
				f(t, x, r),
				f(t, E, r),
				m(E, I),
				f(t, w, r),
				f(t, j, r),
				m(j, A),
				(N = !0),
				P || ((S = h(a, 'click', s[0])), (P = !0));
		},
		p(a, [e]) {
			s = a;
		},
		i(s) {
			N ||
				(g(() => {
					b ||
						(b = y(a, p, { delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: v }, !0)),
						b.run(1);
				}),
				k ||
					g(() => {
						(k = $(E, p, { delay: 600, duration: 400, x: 500, y: 0, opacity: 1, easing: v })),
							k.start();
					}),
				D ||
					g(() => {
						(D = $(j, p, { delay: 700, duration: 400, x: 500, y: 0, opacity: 1, easing: v })),
							D.start();
					}),
				(N = !0));
		},
		o(s) {
			b || (b = y(a, p, { delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: v }, !1)),
				b.run(0),
				(N = !1);
		},
		d(s) {
			s && i(a), s && b && b.end(), s && i(x), s && i(E), s && i(w), s && i(j), (P = !1), S();
		}
	};
}
function C(s) {
	return [() => S('/about')];
}
class H extends s {
	constructor(s) {
		super(), a(this, s, C, V, e, {});
	}
}
function R(s) {
	let a, e, h, y, N, S, V, C, R, _, G, L, M, T, B, F, J, K, O;
	const q = s[1].default,
		z = b(q, s, s[0], null);
	return (
		(B = new H({})),
		(K = new H({})),
		{
			c() {
				(a = t('article')),
					(e = t('div')),
					(h = t('div')),
					(y = r("Hi! I'm Raymond.")),
					(S = l()),
					(V = t('img')),
					(_ = l()),
					(G = t('section')),
					(L = t('div')),
					z && z.c(),
					(M = l()),
					(T = t('div')),
					x(B.$$.fragment),
					(F = l()),
					(J = t('div')),
					x(K.$$.fragment),
					this.h();
			},
			l(s) {
				a = n(s, 'ARTICLE', { style: !0, class: !0 });
				var t = o(a);
				e = n(t, 'DIV', { class: !0 });
				var r = o(e);
				h = n(r, 'DIV', { class: !0 });
				var l = o(h);
				(y = c(l, "Hi! I'm Raymond.")),
					l.forEach(i),
					(S = u(r)),
					(V = n(r, 'IMG', { alt: !0, class: !0, src: !0 })),
					r.forEach(i),
					(_ = u(t)),
					(G = n(t, 'SECTION', { class: !0 }));
				var d = o(G);
				L = n(d, 'DIV', { class: !0 });
				var f = o(L);
				z && z.l(f), f.forEach(i), (M = u(d)), (T = n(d, 'DIV', { class: !0 }));
				var m = o(T);
				E(B.$$.fragment, m), m.forEach(i), (F = u(d)), (J = n(d, 'DIV', { class: !0 }));
				var g = o(J);
				E(K.$$.fragment, g), g.forEach(i), d.forEach(i), t.forEach(i), this.h();
			},
			h() {
				d(h, 'class', 'text-shale text-3xl'),
					d(V, 'alt', ''),
					d(V, 'class', 'h-20 w-20 rounded-full border-2 border-shale'),
					V.src !== (C = P + '/beer_hat_l.jpg') && d(V, 'src', C),
					d(e, 'class', 'flex justify-between items-center mx-20'),
					d(L, 'class', 'flex-grow'),
					d(T, 'class', 'font-bold md:flex-col justify-between md:flex hidden mr-16 mt-8'),
					d(J, 'class', 'absolute bottom-0 left-0 w-full flex justify-center md:hidden'),
					d(G, 'class', 'flex'),
					I(a, 'background-color', '#0B0C10'),
					d(a, 'class', 'h-full w-full overflow-x-none pt-8 px-12');
			},
			m(s, t) {
				f(s, a, t),
					m(a, e),
					m(e, h),
					m(h, y),
					m(e, S),
					m(e, V),
					m(a, _),
					m(a, G),
					m(G, L),
					z && z.m(L, null),
					m(G, M),
					m(G, T),
					k(B, T, null),
					m(G, F),
					m(G, J),
					k(K, J, null),
					(O = !0);
			},
			p(a, [e]) {
				(s = a), z && z.p && (!O || 1 & e) && w(z, q, s, s[0], O ? e : -1, null, null);
			},
			i(s) {
				O ||
					(N ||
						g(() => {
							(N = $(h, p, { delay: 300, duration: 400, x: -500, y: 0, opacity: 1, easing: v })),
								N.start();
						}),
					R ||
						g(() => {
							(R = $(V, p, { delay: 0, duration: 400, x: 200, y: 0, opacity: 1, easing: v })),
								R.start();
						}),
					j(z, s),
					j(B.$$.fragment, s),
					j(K.$$.fragment, s),
					(O = !0));
			},
			o(s) {
				A(z, s), A(B.$$.fragment, s), A(K.$$.fragment, s), (O = !1);
			},
			d(s) {
				s && i(a), z && z.d(s), D(B), D(K);
			}
		}
	);
}
function _(s, a, e) {
	let { $$slots: t = {}, $$scope: r } = a;
	return (
		(s.$$set = (s) => {
			'$$scope' in s && e(0, (r = s.$$scope));
		}),
		[r, t]
	);
}
export default class extends s {
	constructor(s) {
		super(), a(this, s, _, R, e, {});
	}
}
