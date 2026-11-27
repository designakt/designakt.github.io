"use strict";

const setActiveHowToStep = a => {
        const b = document.querySelectorAll(".active");
        b && b.forEach(a => {
            a.classList.remove("active")
        });
        const c = document.querySelectorAll(`[data-step="${a}"]`);
        c.forEach(a => {
            a.classList.add("active")
        })
    },
    getParent = (a, b) => {
        for (; a.parentNode;)
            if (a = a.parentNode, a.classList.contains(b)) return a;
        return null
    },
    closeModal = a => {
        const b = a.target,
            c = getParent(b, "close-parent");
        c && c.classList.add("hide"), c.classList.contains("mobile-or-outside-usa-modal") && document.body.classList.remove("disable-scrolling"), focusTrapModal(c, !1)
    },
    handleOtherBrowsers = (a, b) => {
        const c = document.querySelector(".mobile-or-outside-usa-modal");
        return c && (a || b) ? (document.body.classList = ["mobile-or-outside-usa disable-scrolling"], focusTrapModal(c), c.classList.remove("hide")) : void document.body.classList.add("show-non-fx-CTAs")
    },
    focusTrapModal = (a, b = !0) => {
        const c = ["button", "[href]", "[tabindex]"],
            d = document.body.querySelectorAll(c),
            e = a.querySelectorAll(c);
        let f = 0,
            g = -1;
        b && (f = -1, g = 0);
        const h = (a, b) => {
            a.forEach(a => {
                a.tabIndex = b
            })
        };
        return h(d, f), void h(e, g)
    };
(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const a = /firefox|FxiOS/i.test(navigator.userAgent),
            b = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            c = document.body.dataset.outsideUsa;
        (!a || b || c) && handleOtherBrowsers(b, c);
        const d = "IntersectionObserver" in window,
            e = document.querySelectorAll(".slide-controller");
        if (e && e.forEach(a => {
                a.onmouseover = () => {
                    setActiveHowToStep(a.dataset.step)
                }, a.onfocus = () => {
                    setActiveHowToStep(a.dataset.step)
                }
            }), d && e) {
            const a = document.querySelectorAll(".how-to-img, .card"),
                b = new IntersectionObserver((a, b) => {
                    a.forEach(a => {
                        a.isIntersecting && a.target.classList.contains("how-to-img") && .25 < a.intersectionRatio && (setActiveHowToStep("step-0"), b.unobserve(a.target)), a.isIntersecting && a.target.classList.contains("card") && (a.target.classList.remove("opacity-0"), b.unobserve(a.target))
                    })
                }, {
                    root: null,
                    rootMargin: "-10px",
                    threshold: .25
                });
            a.forEach(a => {
                b.observe(a)
            })
        }
        if (!d && e) {
            setActiveHowToStep("step-0");
            const a = document.querySelectorAll(".card.opacity-0");
            a && a.forEach(a => {
                a.classList.remove("opacity-0")
            })
        }
        const f = document.querySelectorAll(".close-btn");
        f && f.forEach(a => {
            a.addEventListener("click", closeModal)
        })
    })
})();
