import {
	S as e,
	i as t,
	s,
	N as n,
	l as o,
	f as u,
	d as r,
	A as l
} from '../chunks/vendor-bb5405de.js';
/* empty css                                                  */ function a(e) {
	return { c: n, l: n, m: n, d: n };
}
function i(e) {
	let t,
		s = e[0] && a();
	return {
		c() {
			s && s.c(), (t = o());
		},
		l(e) {
			s && s.l(e), (t = o());
		},
		m(e, n) {
			s && s.m(e, n), u(e, t, n);
		},
		p(e, [n]) {
			e[0] ? s || ((s = a()), s.c(), s.m(t.parentNode, t)) : s && (s.d(1), (s = null));
		},
		i: n,
		o: n,
		d(e) {
			s && s.d(e), e && r(t);
		}
	};
}
function c(e, t, s) {
	let n = !1;
	return (
		l(() => {
			setTimeout(() => s(0, (n = !0)), 500),
				setTimeout(() => !0, 1e3),
				setTimeout(() => {
					setTimeout(() => {
						setTimeout(() => {}, 500);
					}, 1e3);
				}, 300);
		}),
		[n]
	);
}
export default class extends e {
	constructor(e) {
		super(), t(this, e, c, i, s, {});
	}
}
