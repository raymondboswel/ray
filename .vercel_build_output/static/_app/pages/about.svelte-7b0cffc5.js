import {
	S as a,
	i as t,
	s as e,
	e as s,
	t as n,
	k as r,
	c as i,
	a as o,
	g as l,
	d as c,
	n as u,
	b as m,
	f as d,
	D as h,
	F as g,
	G as p,
	x as f,
	u as y,
	w as b,
	A as v,
	H as x,
	O as w,
	r as I
} from '../chunks/vendor-bb5405de.js';
/* empty css                                                  */ const k =
		"I am a software engineer from Pretoria, South Africa. I mainly work as a frontend \nengineer at Fastcomm, and also lead a really great team. We mostly build projects in Angular and Elixir,\nthough I'm really excited about Svelte as well these days (which is what this little site is built in). ",
	E =
		"At Fastcomm I'm the organizer of the Angular/Web guild, and regularly contribute content and presentations, with topics \nranging from Angular performance pitfalls and optimizations, to more general topics such as Functional Programming principles.",
	A =
		"When I'm not programming, I like to get outdoors and ride my mountain bike, go climb some rocks or hang out with my amazing wife.";
function T(a) {
	let t, e, f, y, b, v, I, T, P, F, S, j;
	return {
		c() {
			(t = s('p')),
				(e = n(k)),
				(y = r()),
				(b = s('p')),
				(v = n(E)),
				(T = r()),
				(P = s('p')),
				(F = n(A)),
				this.h();
		},
		l(a) {
			t = i(a, 'P', { class: !0 });
			var s = o(t);
			(e = l(s, k)), s.forEach(c), (y = u(a)), (b = i(a, 'P', { class: !0 }));
			var n = o(b);
			(v = l(n, E)), n.forEach(c), (T = u(a)), (P = i(a, 'P', { class: !0 }));
			var r = o(P);
			(F = l(r, A)), r.forEach(c), this.h();
		},
		h() {
			m(t, 'class', 'mr-4 text-shale'),
				m(b, 'class', 'mr-4 my-2  text-shale'),
				m(P, 'class', 'mr-4  text-shale');
		},
		m(a, s) {
			d(a, t, s),
				h(t, e),
				d(a, y, s),
				d(a, b, s),
				h(b, v),
				d(a, T, s),
				d(a, P, s),
				h(P, F),
				(j = !0);
		},
		p(a, t) {},
		i(a) {
			j ||
				(g(() => {
					f || (f = p(t, w, { delay: 0, duration: 400, start: 0, opacity: 1, easing: x }, !0)),
						f.run(1);
				}),
				g(() => {
					I || (I = p(b, w, { delay: 800, duration: 400, start: 0, opacity: 1, easing: x }, !0)),
						I.run(1);
				}),
				g(() => {
					S || (S = p(P, w, { delay: 800, duration: 400, start: 0, opacity: 1, easing: x }, !0)),
						S.run(1);
				}),
				(j = !0));
		},
		o(a) {
			f || (f = p(t, w, { delay: 0, duration: 400, start: 0, opacity: 1, easing: x }, !1)),
				f.run(0),
				I || (I = p(b, w, { delay: 800, duration: 400, start: 0, opacity: 1, easing: x }, !1)),
				I.run(0),
				S || (S = p(P, w, { delay: 800, duration: 400, start: 0, opacity: 1, easing: x }, !1)),
				S.run(0),
				(j = !1);
		},
		d(a) {
			a && c(t),
				a && f && f.end(),
				a && c(y),
				a && c(b),
				a && I && I.end(),
				a && c(T),
				a && c(P),
				a && S && S.end();
		}
	};
}
function P(a) {
	let t,
		e,
		n,
		r = a[0] && T();
	return {
		c() {
			(t = s('section')), (e = s('div')), r && r.c(), this.h();
		},
		l(a) {
			t = i(a, 'SECTION', {});
			var s = o(t);
			e = i(s, 'DIV', { class: !0 });
			var n = o(e);
			r && r.l(n), n.forEach(c), s.forEach(c), this.h();
		},
		h() {
			m(e, 'class', 'flex-grow flex flex-col ');
		},
		m(a, s) {
			d(a, t, s), h(t, e), r && r.m(e, null), (n = !0);
		},
		p(a, [t]) {
			a[0]
				? r
					? (r.p(a, t), 1 & t && f(r, 1))
					: ((r = T()), r.c(), f(r, 1), r.m(e, null))
				: r &&
				  (I(),
				  y(r, 1, 1, () => {
						r = null;
				  }),
				  b());
		},
		i(a) {
			n || (f(r), (n = !0));
		},
		o(a) {
			y(r), (n = !1);
		},
		d(a) {
			a && c(t), r && r.d();
		}
	};
}
function F(a, t, e) {
	let s = !1;
	return (
		v(() => {
			setTimeout(() => !0, 500),
				setTimeout(() => !0, 1e3),
				setTimeout(() => {
					setTimeout(() => {
						setTimeout(() => {
							e(0, (s = !0));
						}, 500);
					}, 1e3);
				}, 300);
		}),
		[s]
	);
}
export default class extends a {
	constructor(a) {
		super(), t(this, a, F, P, e, {});
	}
}
