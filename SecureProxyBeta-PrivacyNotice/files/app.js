"use strict";

function _dntEnabled(a, b) {
    let c = a || navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    const d = b || navigator.userAgent,
        e = d.match(/Firefox\/(\d+)/),
        f = /MSIE|Trident/i,
        g = f.test(d),
        h = d.match(/Windows.+?(?=;)/g);
    return !(g && "function" != typeof Array.prototype.indexOf) && (c = e && 32 > parseInt(e[1], 10) ? "Unspecified" : g && h && -1 !== ["Windows NT 6.1", "Windows NT 6.2", "Windows NT 6.3"].indexOf(h.toString()) ? "Unspecified" : {
        0: "Disabled",
        1: "Enabled"
    }[c] || "Unspecified", "Enabled" === c)
}
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
    },
    initiateGoogleAnalytics = () => {
        if (!_dntEnabled()) {
            (function(b, c, d, e, f, g, h) {
                b.GoogleAnalyticsObject = f, b[f] = b[f] || function() {
                    (b[f].q = b[f].q || []).push(arguments)
                }, b[f].l = 1 * new Date, g = c.createElement(d), h = c.getElementsByTagName(d)[0], g.async = 1, g.src = e, h.parentNode.insertBefore(g, h)
            })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), "undefined" != typeof ga && (ga("create", "UA-36116321-30"), ga("set", "anonymizeIp", !0), ga("set", "transport", "beacon"), ga("send", "pageview"));
            const a = document.querySelectorAll(".add-to-fx, .only-with-fx");
            a && a.forEach((a, b) => {
                a.addEventListener("click", a => {
                    const c = a.target.classList.contains("only-with-fx") ? "download-firefox-button" : "install-fpn-button";
                    ga("send", "event", "Button Clicks", `${c}-click`, `${c} - ${b}`)
                })
            })
        }
    };
(() => {
    document.addEventListener("DOMContentLoaded", () => {
        initiateGoogleAnalytics();
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
