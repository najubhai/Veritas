// @license Copyright (C) 2014 Erik Ringsmuth - MIT license
!function(t,e){function a(t,a,r){var i=e.createEvent("CustomEvent");return i.initCustomEvent(t,!1,!0,a),r.dispatchEvent(i)}function r(e){var r=d.parseUrl(t.location.href,e.getAttribute("mode")),n={path:r.path};if(a("state-change",n,e)){for(var s=e.firstElementChild;s;){if("APP-ROUTE"===s.tagName&&d.testRoute(s.getAttribute("path"),r.path,e.getAttribute("trailingSlash"),s.hasAttribute("regex")))return i(e,s,r),void 0;s=s.nextSibling}a("not-found",n,e)}}function i(t,e,r){if(e.hasAttribute("redirect"))return t.go(e.getAttribute("redirect"),{replace:!0}),void 0;var i={path:r.path,route:e,oldRoute:t.activeRoute};a("activate-route-start",i,t)&&a("activate-route-start",i,e)&&(t.previousRoute&&t.previousRoute.transitionAnimationInProgress&&l(t.previousRoute),t.activeRoute&&t.activeRoute.removeAttribute("active"),t.previousRoute=t.activeRoute,t.activeRoute=e,t.activeRoute.setAttribute("active","active"),e.hasAttribute("import")?n(t,e.getAttribute("import"),e,r,i):e.hasAttribute("element")?o(t,e.getAttribute("element"),e,r,i):e.firstElementChild&&"TEMPLATE"===e.firstElementChild.tagName&&u(t,e.firstElementChild,e,r,i))}function n(t,a,r,i,n){function o(){s(t,u,a,r,i,n)}var u;g.hasOwnProperty(a)?(u=e.querySelector('link[href="'+a+'"]'),u.import?o():u.addEventListener("load",o)):(g[a]=!0,u=e.createElement("link"),u.setAttribute("rel","import"),u.setAttribute("href",a),u.addEventListener("load",o),e.head.appendChild(u))}function s(t,e,a,r,i,n){r.hasAttribute("active")&&(r.hasAttribute("template")?u(t,e.import.querySelector("template"),r,i,n):o(t,r.getAttribute("element")||a.split("/").slice(-1)[0].replace(".html",""),r,i,n))}function o(t,a,r,i,n){var s=e.createElement(a),o=h(t,r,i,n);for(var u in o)o.hasOwnProperty(u)&&(s[u]=o[u]);c(t,s,i,n)}function u(t,a,r,i,n){var s;if("createInstance"in a){var o=h(t,r,i,n);s=a.createInstance(o)}else s=e.importNode(a.content,!0);c(t,s,i,n)}function h(t,e,r,i){var n=d.routeArguments(e.getAttribute("path"),r.path,r.search,e.hasAttribute("regex"));return(e.hasAttribute("bindRouter")||t.hasAttribute("bindRouter"))&&(n.router=t),i.model=n,a("before-data-binding",i,t),a("before-data-binding",i,i.route),n}function c(t,r,i,n){if(t.hasAttribute("core-animated-pages")&&n.route!==n.oldRoute||p(t.previousRoute),t.activeRoute.appendChild(r),t.hasAttribute("core-animated-pages")&&(t.coreAnimatedPages.selected=t.activeRoute.getAttribute("path"),t.previousRoute&&(t.previousRoute.transitionAnimationInProgress=!0)),i.hash&&!t.hasAttribute("core-animated-pages")){var s=i.hash;setTimeout(function(){var t=e.querySelector("html /deep/ "+s)||e.querySelector('html /deep/ [name="'+s.substring(1)+'"]');t&&t.scrollIntoView&&t.scrollIntoView(!0)},0)}a("activate-route-end",n,t),a("activate-route-end",n,n.route)}function l(t){t&&(t.transitionAnimationInProgress=!1,p(t))}function p(t){if(t)for(var e=t.firstChild;e;){var a=e;e=e.nextSibling,"TEMPLATE"!==a.tagName&&t.removeChild(a)}}var d={},g={},v="ActiveXObject"in t,f=Object.create(HTMLElement.prototype);f.util=d,e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),f.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},f.init=function(){var a=this;a.isInitialized||(a.isInitialized=!0,a.hasAttribute("trailingSlash")||a.setAttribute("trailingSlash","strict"),a.hasAttribute("mode")||a.setAttribute("mode","auto"),a.hasAttribute("core-animated-pages")&&(a.createShadowRoot(),a.coreAnimatedPages=e.createElement("core-animated-pages"),a.coreAnimatedPages.appendChild(e.createElement("content")),a.coreAnimatedPages.style.position="static",a.coreAnimatedPages.setAttribute("valueattr","path"),a.coreAnimatedPages.setAttribute("transitions",a.getAttribute("transitions")),a.shadowRoot.appendChild(a.coreAnimatedPages),a.coreAnimatedPages.addEventListener("core-animated-pages-transition-end",function(){l(a.previousRoute)})),a.stateChangeHandler=r.bind(null,a),t.addEventListener("popstate",a.stateChangeHandler,!1),v&&t.addEventListener("hashchange",a.stateChangeHandler,!1),r(a))},f.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),v&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},f.go=function(e,a){"pushstate"!==this.getAttribute("mode")&&(e="#"+e),a&&a.replace!==!0?t.history.pushState(null,null,e):t.history.replaceState(null,null,e),r(this)},d.parseUrl=function(t,a){var r={isHashPath:"hash"===a};if("function"==typeof URL){var i=new URL(t);r.path=i.pathname,r.hash=i.hash,r.search=i.search}else{var n=e.createElement("a");n.href=t,r.path=n.pathname,"/"!==r.path.charAt(0)&&(r.path="/"+r.path),r.hash=n.hash,r.search=n.search}if("pushstate"!==a&&("#/"===r.hash.substring(0,2)?(r.isHashPath=!0,r.path=r.hash.substring(1)):"#!/"===r.hash.substring(0,3)?(r.isHashPath=!0,r.path=r.hash.substring(2)):r.isHashPath&&(r.path=0===r.hash.length?"/":r.hash.substring(1)),r.isHashPath)){r.hash="";var s=r.path.indexOf("#");-1!==s&&(r.hash=r.path.substring(s),r.path=r.path.substring(0,s));var o=r.path.indexOf("?");-1!==o&&(r.search=r.path.substring(o),r.path=r.path.substring(0,o))}return r},d.testRoute=function(t,e,a,r){if("ignore"===a&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||r||(t=t.slice(0,-1))),r)return d.testRegExString(t,e);if(t===e||"*"===t)return!0;if(-1===t.indexOf("*")&&-1===t.indexOf(":"))return!1;var i=e.split("/"),n=t.split("/");if(i.length!==n.length)return!1;for(var s=0;s<n.length;s++){var o=n[s];if(o!==i[s]&&"*"!==o&&":"!==o.charAt(0))return!1}return!0},d.routeArguments=function(t,e,a,r){var i={};if(!r)for(var n=e.split("/"),s=t.split("/"),o=0;o<s.length;o++){var u=s[o];":"===u.charAt(0)&&(i[u.substring(1)]=n[o])}var h=a.substring(1).split("&");1===h.length&&""===h[0]&&(h=[]);for(var c=0;c<h.length;c++){var l=h[c],p=l.split("=");i[p[0]]=p.splice(1,p.length-1).join("=")}for(var g in i)i[g]=d.typecast(i[g]);return i},d.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},d.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var a="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),a="i"}return new RegExp(t,a).test(e)},e.registerElement("app-router",{prototype:f})}(window,document);
