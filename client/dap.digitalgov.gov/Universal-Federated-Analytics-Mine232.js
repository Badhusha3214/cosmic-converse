(function () {
    function E() {
      dataLayer.push(arguments)
    }
  
    function w(a) {
      switch (a.toString().toLowerCase()) {
      case "true":
      case "on":
      case "yes":
      case "1":
        return !0;
      case "false":
      case "off":
      case "no":
      case "0":
        return !1;
      default:
        return a
      }
    }
  
    function M(a) {
      a = a.toLowerCase();
      a = a.match(/^g\-([0-9a-z])+$/);
      return null !== a && 0 < a.length && a[0] !== c.GWT_GA4ID[0].toLowerCase()
    }
  
    function x(a, b) {
      try {
        return b = b.replace(/\s/g, "_").replace(/([^\w]+)/g, "").match(/[A-Za-z]\w*$/ig), null !== b ? b[0]
          .toLowerCase() : "d" === a ? "custom_dimension_" +
          S++ : "dap_event"
      } catch (d) {}
    }
  
    function q(a, b) {
      for (var d = "", e = 0; e < c.GWT_GA4ID.length; e++) try {
        d += c.GA4_NAME + e + ","
      } catch (g) {}
      b = z(F(b), "json");
      b = N(b);
      b = O(b);
      b.send_to = d.replace(/.$/, "");
      b.event_name_dimension = a;
      E("event", a, b)
    }
  
    function H(a) {
      q("view_search_results", a);
      y = !1
    }
  
    function T() {
      var a = function (e) {
          e = e.href.toLowerCase().replace(/[#?&].*/, "").split(e.hostname)[1].split(".");
          e = e[e.length - 1];
          return null != e.match(new RegExp("^(" + c.EXTS + ")$")) ? e : !1
        },
        b = function (e) {
          try {
            var g = JSON.stringify(e);
            return JSON.parse(g.toLowerCase())
          } catch (h) {}
        },
        d = function (e) {
          try {
            if ("mousedown" === e.type || "keydown" === e.type && 13 === e.keyCode)
              if ("A" === e.target.nodeName || null !== e.target.closest("a")) {
                var g = c.COOKIE_DOMAIN,
                  h = "",
                  k = "",
                  f = "",
                  n = /^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
                  l = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
                  r = "",
                  t = "",
                  u = {},
                  P = /^(tel:)(.*)$/i,
                  m = e.target.closest("a");
                "mousedown" === e.type ? t = "Mouse Click" : "keydown" === e.type && 13 === e.keyCode && (t =
                  "Enter Key Keystroke");
                if (n.test(m.href) || l.test(m.href) ||
                  P.test(m.href)) try {
                  l.test(m.href) ? (f = m.hostname.toLowerCase().replace(/^www\./i, ""), r = "l") : n.test(m.href) ? (
                    f = m.href.split("@")[1].toLowerCase(), r = "m") : P.test(m.href) && (f = m.href, f = f
                    .toLowerCase(), r = "t")
                } catch (U) {}(c.SUBDOMAIN_BASED ? -1 !== f.indexOf(g) : f === g) ? "m" === r ? (h = m.href.match(
                  /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/), u = {
                  link_id: m.id,
                  link_url: h[0],
                  link_domain: h[0].split("@")[1],
                  link_text: m.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                  link_classes: m.className,
                  interaction_type: t
                }, q("email_click",
                  b(u))) : "l" === r && a(m) ? (h = m.pathname.split(/[#?&?]/)[0], k = a(m), u = {
                  file_name: h,
                  file_extension: k,
                  link_text: m.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                  link_id: m.id,
                  link_url: m.href.replace(/[#?&].*/, ""),
                  link_domain: m.hostname.replace(/^www\./i, ""),
                  interaction_type: t
                }, q("file_download", b(u))) : "l" !== r || a(m) : "l" === r && a(m) ? (h = m.pathname.split(
                  /[#?&?]/)[0], k = a(m), u = {
                    file_name: h,
                    file_extension: k,
                    link_text: m.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                    link_id: m.id,
                    link_url: m.href.replace(/[#?&].*/, ""),
                    link_domain: m.hostname.replace(/^www\./i,
                      ""),
                    outbound: !0,
                    interaction_type: t
                  }, q("file_download", b(u))) : "l" !== r || a(m) ? "m" === r ? (h = m.href.match(
                  /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/), u = {
                  link_id: m.id,
                  link_url: h[0],
                  link_domain: h[0].split("@")[1],
                  link_text: m.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                  link_classes: m.className,
                  outbound: !0,
                  interaction_type: t
                }, q("email_click", b(u))) : "t" === r && (u = {
                  link_id: m.id,
                  link_url: m.href.split("tel:")[1],
                  link_text: m.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                  link_classes: m.className,
                  interaction_type: t
                }, q("telephone_click",
                  b(u))) : (u = {
                  link_id: m.id,
                  link_url: m.href.replace(/[#?&].*/, ""),
                  link_domain: m.hostname.replace(/^www\./i, ""),
                  link_text: m.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                  link_classes: m.className,
                  outbound: !0,
                  interaction_type: t
                }, q("click", b(u)))
              }
          } catch (U) {}
        };
      document.addEventListener ? document.addEventListener("mousedown", d, !1) : document.attachEvent && document
        .attachEvent("onmousedown", d);
      document.addEventListener ? document.addEventListener("keydown", d, !1) : document.attachEvent && document
        .attachEvent("onkeydown", d)
    }
  
    function V() {
      function a(f) {
        var n = "VIDEO" === f.target.nodeName ? "video" : "audio",
          l = {};
        "video" === n ? l = {
          video_provider: "html5 video",
          video_title: decodeURIComponent(f.target.currentSrc.split("/")[f.target.currentSrc.split("/").length - 1]),
          video_id: f.target.id,
          video_url: decodeURIComponent(f.target.currentSrc)
        } : l = {
          audio_provider: "html5 audio",
          audio_title: decodeURIComponent(f.target.currentSrc.split("/")[f.target.currentSrc.split("/").length - 1]),
          audio_id: f.target.id,
          audio_url: decodeURIComponent(f.target.currentSrc)
        };
        switch (f.type) {
        case "timeupdate":
          d[f.target.id].current = Math.round(f.target.currentTime);
          var r = Math.floor(100 * d[f.target.id].current / Math.round(f.target.duration)),
            t;
          for (t in d[f.target.id]._progress_milestones) r >= t && t > d[f.target.id].latest_milestone && (d[f.target
            .id].latest_milestone = t);
          d[f.target.id].latest_milestone && !d[f.target.id]._progress_milestones[d[f.target.id].latest_milestone] && (
            d[f.target.id]._progress_milestones[d[f.target.id].latest_milestone] = !0, "video" === n ? (l
              .video_current_time = d[f.target.id].current,
              l.video_duration = Math.round(f.target.duration), l.video_percent = d[f.target.id].latest_milestone) : (
              l.audio_current_time = d[f.target.id].current, l.audio_duration = Math.round(f.target.duration), l
              .audio_percent = d[f.target.id].latest_milestone), q(n + "_progress", l));
          break;
        case "play":
          "video" === n ? (l.video_current_time = d[f.target.id].current, l.video_duration = Math.round(f.target
            .duration), l.video_percent = d[f.target.id].latest_milestone) : (l.audio_current_time = d[f.target.id]
            .current, l.audio_duration = Math.round(f.target.duration),
            l.audio_percent = d[f.target.id].latest_milestone);
          q(0 === d[f.target.id].current ? n + "_start" : n + "_play", l);
          break;
        case "pause":
          d[f.target.id].current !== Math.round(f.target.duration) && ("video" === n ? (l.video_current_time = d[f
            .target.id].current, l.video_duration = Math.round(f.target.duration), l.video_percent = d[f.target
            .id].latest_milestone) : (l.audio_current_time = d[f.target.id].current, l.audio_duration = Math.round(f
            .target.duration), l.audio_percent = d[f.target.id].latest_milestone), q(n + "_pause", l));
          break;
        case "ended":
          for ("video" ===
            n ? (l.video_current_time = d[f.target.id].current, l.video_duration = Math.round(f.target.duration), l
              .video_percent = "100") : (l.audio_current_time = d[f.target.id].current, l.audio_duration = Math.round(f
              .target.duration), l.audio_percent = "100"), q(n + "_complete", l), d[f.target.id].current = 0, d[f.target
              .id].latest_milestone = 0, n = 1; n <= 100 / b; n++) 4 === 100 / b && n === 100 / b ? d[f.target.id]
            .progress_point = 95 : 100 !== b * n ? d[f.target.id].progress_point = b * n : "", d[f.target.id]
            ._progress_milestones[d[f.target.id].progress_point] = !1
        }
      }
      for (var b =
          c.YT_MILESTONE, d = {}, e = document.querySelectorAll("video,audio"), g = 0; g < e.length; g++) {
        var h;
        e[g].getAttribute("id") ? h = e[g].getAttribute("id") : (h = "html5_media_" + Math.random().toString(36).slice(
          2), e[g].setAttribute("id", h));
        d[h] = {};
        d[h].latest_milestone = 0;
        d[h]._progress_milestones = {};
        for (var k = 1; k <= 100 / b; k++) 4 === 100 / b && k === 100 / b ? d[h].progress_point = 95 : 100 !== b * k ?
          d[h].progress_point = b * k : "", d[h]._progress_milestones[d[h].progress_point] = !1;
        d[h].current = 0;
        e[g].addEventListener("play", a, !1);
        e[g].addEventListener("pause",
          a, !1);
        e[g].addEventListener("ended", a, !1);
        e[g].addEventListener("timeupdate", a, !1);
        e[g].addEventListener("ended", a, !1)
      }
    }
  
    function O(a) {
      try {
        if (Object(a) !== a || Array.isArray(a)) return a;
        var b = {},
          d;
        for (d in a) {
          var e = b;
          var g = "";
          var h = 0;
          do {
            var k = d.indexOf(".", h);
            var f = d.substring(h, -1 !== k ? k : void 0);
            e = e[g] || (e[g] = isNaN(parseInt(f)) ? {} : []);
            g = f;
            h = k + 1
          } while (0 <= k);
          e[g] = a[d]
        }
        return b[""]
      } catch (n) {}
    }
  
    function W(a) {
      try {
        var b = {};
  
        function d(e, g) {
          if (Object(e) !== e) b[g] = e;
          else if (Array.isArray(e)) {
            for (var h = 0, k = e.length; h <
              k; h++) d(e[h], g ? g + "." + h : "" + h);
            0 == k && (b[g] = [])
          } else {
            h = !0;
            for (k in e) h = !1, d(e[k], g ? g + "." + k : k);
            h && (b[g] = {})
          }
        }
        d(a, "");
        return b
      } catch (d) {}
    }
  
    function F(a) {
      return Object.keys(a).reduce(function (b, d, e) {
        e = 0 === e ? "" : "&";
        d = encodeURIComponent(d);
        var g = encodeURIComponent(a[d]);
        return [b, e, d, "=", g].join("")
      }, "")
    }
  
    function N(a) {
      var b = {};
      a.split("&").forEach(function (d) {
        var e = d.split("=");
        d = e[0];
        e = decodeURIComponent(e[1] || "");
        b[d] ? "[object Array]" === Object.prototype.toString.call(b[d]) ? b[d].push(e) : b[d] = [b[d], e] : b[d] =
          e
      });
      return JSON.parse(JSON.stringify(b))
    }
  
    function I() {
      return [{
          name: "EMAIL",
          regex: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gi
        }, {
          name: "TEL",
          regex: /((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]\d{3}[\s\.\-]\d{4})([^&\s\?\/]*)/gi
        }, {
          name: "SSN",
          regex: /((full)?(([\-_])?)?ssn=)?(\d{3}([\s\.\-\+]|%20)\d{2}([\s\.\-\+]|%20)\d{4})([^&\s\?\/]*)/ig
        }, {
          name: "NAME",
          regex: /((first|last|middle|sur|f|l|user)([\-_])?)?name=([^&\s\?\/]*)/ig
        }, {
          name: "PASSWORD",
          regex: /(((confirm([\-_])?)?password)|passwd|pwd)=([^&\s\?\/]*)/ig
        },
        {
          name: "ZIP",
          regex: /(post(al)?[\s]?code|zip[\s]?code|zip)=([^&\s\?\/]*)/gi
        }, {
          name: "ADDRESS",
          regex: /add(ress)?([1-2])?=([^&\s\?\/]*)/ig
        }
      ]
    }
  
    function z(a, b) {
      try {
        var d = I();
        a = "object" === typeof a && /json|default/.test(b) ? (W(a), a = F(a)) : a;
        I();
        var e = J().toString().replace(/,/g, "=|") + "=",
          g = a.split("&");
        for (a = 0; a < g.length; a++) {
          var h = "",
            k = g[a].split("="),
            f = 2 < k.length ? k.slice(1).join("=") : k[1];
          k.splice(2);
          k[1] = f;
          try {
            var n = decodeURIComponent(decodeURIComponent(k[1]))
          } catch (t) {
            n = decodeURIComponent(k[1])
          }
          if ((null !=
              k[0].match(RegExp("dl|dr|dt|dt|en|ep.|up.|uid")) || /query|json/ig.test(b)) && -1 < n.indexOf("?")) {
            var l = n.split("?").splice(1).join("&").split("&"),
              r = [];
            for (pa = 0; pa < l.length; pa++) - 1 < l[pa].indexOf("?") && r.push(l[pa].split("?")[1]);
            l = l.concat(r);
            for (r = 0; r < l.length; r++) null != l[r].toLowerCase().match(new RegExp(e)) && (h += l[r] + "&");
            n = n.replace(/\?.*/, "?" + h.replace(/&$/, ""))
          }
          "json" === b ? d.push({
              name: "DOB",
              regex: /(((birth)?date|dob)=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,
              format: "YYYY-MM-DD"
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^&\s\?\/]*)/ig,
              format: "YYYY-DD-MM"
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,
              format: "DD-MM-YYYY"
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,
              format: "MM-DD-YYYY"
            }) :
            ("query" === b || "json" === b &&
              /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(n)) && d.push({
              name: "TEL",
              regex: /((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]?\d{3}[\s\.\-]?\d{4})([^&\s\?\/]*)/gi
            }, {
              name: "SSN",
              regex: /((full)?(([\-_])?)?ssn=)?(\d{3}([\s\.\-\+]|%20)?\d{2}([\s\.\-\+]|%20)?\d{4})([^&\s\?\/]*)/ig
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]%20)(0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,
              format: "YYYY-MM-DD"
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^&\s\?\/]*)/ig,
              format: "YYYY-DD-MM"
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)?(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,
              format: "DD-MM-YYYY"
            }, {
              name: "DOB",
              regex: /(((birth)?date|dob)=)?(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]%20)(19|20)\d\d([^&\s\?\/]*)/ig,
              format: "MM-DD-YYYY"
            });
          if (null != k[0].match(RegExp("dl|dr|dt|dt|en|ep.|up.|uid")) && null != k[0].match(RegExp(
              "ep.agency||ep.subagency|ep.site_topic|ep.site_platform|ep.script_source|ep.version|ep.protocol")) ||
            /query|json|default/ig.test(b)) d.forEach(function (t) {
            n = n.replace(t.regex, "[REDACTED_" + t.name + "]")
          }), k[1] = encodeURIComponent(n.replace(/\?$/, "")) || n.replace(/\?$/, ""), g[a] = k.join("=")
        }
        I();
        return g.join("&")
      } catch (t) {}
    }
  
    function X() {
      try {
        var a = document.querySelector("section.usa-banner button.usa-accordion__button");
        a && a.addEventListener("click",
          function (b) {
            gas4("official_usa_site_banner_click", {
              link_text: b.target.textContent.trim(),
              section: "header"
            })
          })
      } catch (b) {}
    }
  
    function K(a) {
      var b = new RegExp("([?&])(" + c.SEARCH_PARAMS + ")(=[^&]+)", "i");
      b.test(a) && (a = a.replace(b, "$1query$3"), y = a.match(/([?&])(query=)([^&#?]*)/i)[3]);
      return a
    }
  
    function C(a) {
      RegExp.escape = function (e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
      };
      var b = "";
      a = ((new RegExp(`^(https?:\\/\\/(www\\.)?)?${RegExp.escape(document.location.hostname.replace(/^www\\./,""))}`,
          "ig")).test(a) ?
        a : document.location.protocol + "//" + document.location.hostname + a).toLowerCase();
      var d = a.split("?")[0];
      return 1 < a.split("?").length ? (a.split("?")[1].split("&").forEach(function (e, g) {
        -1 < J().indexOf(e.split("=")[0]) && (b = b + "&" + e)
      }), 0 < b.length ? d + "?" + z(b.substring(1), "query") : d) : d
    }
  
    function J() {
      var a = {
        "default": "utm_id utm_source utm_medium utm_campaign utm_term utm_content utm_source_platform utm_creative_format utm_marketing_tactic gbraid wbraid _gl gclid dclid gclsrc affiliate dap-dev-env v"
          .split(" "),
        gsa: ["challenge", "state"],
        dhs: ["appreceiptnum"],
        doc: "station meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid lan office pil"
          .split(" "),
        hhs: ["s_cid", "selectedFacets"],
        hud: ["PostID"],
        nasa: ["feature", "ProductID", "selectedFacets"],
        nps: ["gid", "mapid", "site", "webcam", "id"],
        nsf: "meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid"
          .split(" "),
        va: ["id"],
        dod: ["p"],
        opm: "l soc jt j rmi smin hp g d a".split(" ")
      };
      return a.default.concat(a[c.AGENCY.toLowerCase()]).concat(c.SEARCH_PARAMS.toLowerCase().split("|"))
    }
  
    function Q() {
      c.AUTOTRACKER ? T() : "";
      c.YOUTUBE ? _initYouTubeTracker() : "";
      c.HTMLVIDEO ? V() : "";
      X()
    }
  
    function R() {
      return "interactive" === document.readyState || "complete" === document.readyState ? (Q(), !0) : !1
    }
    var y = !1,
      c = {
        GWT_GA4ID: ["G-CSLL4ZEK4L"],
        FORCE_SSL: !0,
        ANONYMIZE_IP: !0,
        AGENCY: "",
        SUB_AGENCY: "",
        VERSION: "20240925 v8.3 - GA4",
        SITE_TOPIC: "",
        SITE_PLATFORM: "",
        SCRIPT_SOURCE: "",
        URL_PROTOCOL: location.protocol,
        USE_MAIN_CUSTOM_DIMENSIONS: !0,
        MAIN_AGENCY_DIMENSION: "agency",
        MAIN_SUBAGENCY_DIMENSION: "subagency",
        MAIN_CODEVERSION_DIMENSION: "version",
        MAIN_SITE_TOPIC_DIMENSION: "site_topic",
        MAIN_SITE_PLATFORM_DIMENSION: "site_platform",
        MAIN_SCRIPT_SOURCE_URL_DIMENSION: "script_source",
        MAIN_URL_PROTOCOL_DIMENSION: "protocol",
        MAIN_INTERACTION_TYPE_DIMENSION: "interaction_type",
        MAIN_USING_PARALLEL_DIMENSION: "using_parallel_tracker",
        USE_PARALLEL_CUSTOM_DIMENSIONS: !1,
        PARALLEL_AGENCY_DIMENSION: "agency",
        PARALLEL_SUBAGENCY_DIMENSION: "subagency",
        PARALLEL_CODEVERSION_DIMENSION: "version",
        PARALLEL_SITE_TOPIC_DIMENSION: "site_topic",
        PARALLEL_SITE_PLATFORM_DIMENSION: "site_platform",
        PARALLEL_SCRIPT_SOURCE_URL_DIMENSION: "script_source",
        PARALLEL_URL_PROTOCOL_DIMENSION: "protocol",
        PARALLEL_INTERACTION_TYPE_DIMENSION: "interaction_type",
        PARALLEL_USING_PARALLEL_DIMENSION: "using_parallel_tracker",
        COOKIE_DOMAIN: location.hostname.replace(/^www\./, "").toLowerCase(),
        COOKIE_TIMEOUT: 63072E3,
        SEARCH_PARAMS: "q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords|searchString",
        YOUTUBE: !1,
        HTMLVIDEO: !0,
        YT_MILESTONE: 25,
        AUTOTRACKER: !0,
        EXTS: "doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",
        SUBDOMAIN_BASED: !0,
        GA4_NAME: "GSA_GA4_ENOR",
        USE_CUSTOM_URL: !1,
        USE_CUSTOM_TITLE: !1,
        USING_PARALLEL_TRACKER: "no",
        ACTIVATE_DEV: !1
      };
    (function () {
      if ("undefined" !== typeof _fedParmsGTM) {
        var a = _fedParmsGTM.toLowerCase().split("&");
        c.SCRIPT_SOURCE = "GTM"
      } else {
        var b = document.getElementById("_fed_an_ua_tag");
        _fullParams = b.src.match(/^([^\?]*)(.*)$/i)[2].replace("?", "");
        a = _fullParams.split("&");
        c.SCRIPT_SOURCE = b.src.split("?")[0]
      }
      for (b = 0; b < a.length; b++) switch (_keyValuePair = decodeURIComponent(a[b].toLowerCase()), _key =
        _keyValuePair.split("=")[0], _value = _keyValuePair.split("=")[1], _key) {
      case "pua":
        for (var d = _value.split(","), e = 0; e < d.length; e++) M(d[e]) && (c.GWT_GA4ID.push(d[e].toUpperCase()),
          c.USING_PARALLEL_TRACKER = "pua");
        break;
      case "pga4":
        d = _value.split(",");
        for (e = 0; e < d.length; e++) M(d[e]) && (c.GWT_GA4ID.push(d[e].toUpperCase()),
          c.USING_PARALLEL_TRACKER = "pga4");
        break;
      case "agency":
        c.AGENCY = _value.toUpperCase();
        break;
      case "subagency":
        c.SUB_AGENCY = _value.toUpperCase();
        break;
      case "sitetopic":
        c.SITE_TOPIC = _value;
        break;
      case "siteplatform":
        c.SITE_PLATFORM = _value;
        break;
      case "parallelcd":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.USE_PARALLEL_CUSTOM_DIMENSIONS = _value;
        break;
      case "custurl":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.USE_CUSTOM_URL = _value;
        break;
      case "custitle":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.USE_CUSTOM_TITLE =
          _value;
        break;
      case "dapdev":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.ACTIVATE_DEV = _value;
        break;
      case "palagencydim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_AGENCY_DIMENSION = _value);
        break;
      case "palsubagencydim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_SUBAGENCY_DIMENSION = _value);
        break;
      case "palversiondim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_CODEVERSION_DIMENSION = _value);
        break;
      case "paltopicdim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_SITE_TOPIC_DIMENSION = _value);
        break;
      case "palplatformdim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_SITE_PLATFORM_DIMENSION = _value);
        break;
      case "palscriptsrcdim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION = _value);
        break;
      case "palurlprotocoldim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_URL_PROTOCOL_DIMENSION = _value);
        break;
      case "palinteractiontypedim":
        _value = x("d", _value);
        "" !== _value && (c.PARALLEL_INTERACTION_TYPE_DIMENSION = _value);
        break;
      case "cto":
        c.COOKIE_TIMEOUT = 2628E3 * parseInt(_value);
        break;
      case "sp":
        c.SEARCH_PARAMS +=
          "|" + _value.replace(/,/g, "|");
        break;
      case "exts":
        c.EXTS += "|" + _value.replace(/,/g, "|");
        break;
      case "htmlvideo":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.HTMLVIDEO = _value;
        break;
      case "yt":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.YOUTUBE = _value;
        break;
      case "ytm":
        c.YT_MILESTONE = /^(10|20|25)$/.test(_value) ? parseInt(_value) : 25;
        break;
      case "autotracker":
        _value = w(_value);
        if (!0 === _value || !1 === _value) c.AUTOTRACKER = _value;
        break;
      case "sdor":
        c.SUBDOMAIN_BASED = w(_value)
      }
    })();
    if (document.location.href.match(/([?&])(dap-dev-env)([^&$]*)/i) ||
      c.ACTIVATE_DEV) c.GWT_GA4ID[0] = "G-9TNNMGP8WJ";
    var G = document.getElementsByTagName("head").item(0),
      A = document.createElement("script");
    A.setAttribute("type", "text/javascript");
    A.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + c.GWT_GA4ID[0]);
    G.appendChild(A);
    window.dataLayer = window.dataLayer || [];
    E("js", new Date);
    E("set", {
      cookie_flags: "SameSite=Strict;Secure",
      transport_type: "beacon"
    });
    window.gas = function (a, b, d, e, g, h, k) {
      if (void 0 !== a && "" !== a && void 0 !== b && "" !== b && void 0 !== d && "" !== d)
        if ("pageview" ===
          b.toLowerCase()) try {
          d = K(C(d)).split(/[#]/)[0], q("page_view", {
            page_location: d,
            page_title: void 0 === e || "" === e ? document.title : e
          }), y ? H({
            search_term: y
          }) : ""
        } catch (f) {} else if ("event" === b.toLowerCase() && void 0 !== e && "" !== e) try {
          a = !1, void 0 !== k && "boolean" === typeof w(k) && (a = w(k)), q("dap_event", {
            event_category: d,
            event_action: e,
            event_label: void 0 === g ? "" : g,
            event_value: void 0 === h || "" === h || isNaN(h) ? 0 : parseInt(h),
            non_interaction: a
          })
        } catch (f) {} else - 1 == b.toLowerCase().indexOf("dimension") && b.toLowerCase().indexOf("metric")
    };
    window.gas4 = function (a, b) {
      if (void 0 !== a && "" !== a && void 0 !== b && "object" === typeof b)
        if (a = x("e", a), "page_view" === a.toLowerCase()) try {
          0 !== Object.keys(b).length && (b.page_location = K(C(b.page_location ? b.page_location : location.href))
            .split(/[#]/)[0], b.page_title = b.page_title ? b.page_title : document.title, q("page_view", b), y ?
            H({
              search_term: y
            }) : "")
        } catch (e) {} else try {
          var d =
            /^(((email|telephone|image|cta|navigation|faq|accordion)_)?click|file_download|view_search_results|video_(start|pause|progress|complete|play)|official_USA_site_banner_click|form_(start|submit|progress)|content_view|social_share|error|sort|filter|was_this_helpful_submit)$/gi
            .test(a) ?
            a : "dap_event";
          0 !== Object.keys(b).length ? q(d, b) : q(d)
        } catch (e) {}
    };
    (function () {
      window._isRedacted = window._isRedacted || !1;
      if (!window._isRedacted) {
        window._isRedacted = !0;
        try {
          var a = window.navigator.sendBeacon,
            b = c.GWT_GA4ID.join("|");
          window.navigator.sendBeacon = function () {
            if (arguments && arguments[0].match(/google-analytics\.com.*v=2&/i) && arguments[0].match(new RegExp(
              b))) {
              var d = arguments[0].split("?")[0],
                e = arguments[0].split("?")[1];
              e = z(e, "ga4");
              var g = [];
              arguments[1] && arguments[1].split("\r\n").forEach(function (h) {
                g.push(z(h,
                  "ga4"))
              });
              arguments[0] = [d, e].join("?");
              arguments[1] && 0 < g.length && (g.join("\r\n"), arguments[1] = g.join("\r\n"))
            }
            return a.apply(this, arguments)
          }
        } catch (d) {
          return a.apply(this, arguments)
        }
      }
    })();
    /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(c.SUBDOMAIN_BASED.toString()) ? (c
        .COOKIE_DOMAIN = c.SUBDOMAIN_BASED.toLowerCase().replace(/^www\./i, ""), c.SUBDOMAIN_BASED = !0) : !1 === c
      .SUBDOMAIN_BASED ? (c.COOKIE_DOMAIN = document.location.hostname.match(
          /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1],
        c.SUBDOMAIN_BASED = !0) : (c.COOKIE_DOMAIN = location.hostname.toLowerCase().replace(/^www\./i, ""), c
        .SUBDOMAIN_BASED = !1);
    c.AGENCY = c.AGENCY || "unspecified:" + c.COOKIE_DOMAIN;
    c.SUB_AGENCY = c.SUB_AGENCY || "" + c.COOKIE_DOMAIN;
    c.SITE_TOPIC = c.SITE_TOPIC || "unspecified:" + c.COOKIE_DOMAIN;
    c.SITE_PLATFORM = c.SITE_PLATFORM || "unspecified:" + c.COOKIE_DOMAIN;
    J();
    (function (a) {
      a = /^\/.*$/i;
      try {
        var b = c.USE_CUSTOM_URL && a.test(custom_dap_data.url) ? location.protocol + "//" + location.hostname +
          custom_dap_data.url.replace(location.protocol +
            "//" + location.hostname, "") : document.location.href;
        var d = c.USE_CUSTOM_TITLE ? custom_dap_data.title : document.title
      } catch (g) {
        b = document.location.href, d = document.title
      }
      a = b.split(document.location.hostname)[1]; - 1 !== document.title.search(/404|not found/i) && (a = (
        "/vpv404/" + a).replace(/\/\//g, "/") + (document.referrer ? "/" + document.referrer : document.referrer));
      b = -1 !== document.title.search(/404|not found/ig) ? document.location.protocol + "//" + document.location
        .hostname + a : b;
      b = K(C(b));
      for (a = 0; a < c.GWT_GA4ID.length; a++) {
        if (0 ===
          a) {
          var e = {
            groups: c.GA4_NAME + a,
            cookie_expires: parseInt(c.COOKIE_TIMEOUT),
            page_location: b,
            page_title: d,
            [c.MAIN_AGENCY_DIMENSION]: c.AGENCY.toUpperCase(),
            [c.MAIN_SUBAGENCY_DIMENSION]: c.SUB_AGENCY.toUpperCase(),
            [c.MAIN_SITE_TOPIC_DIMENSION]: c.SITE_TOPIC.toLowerCase(),
            [c.MAIN_SITE_PLATFORM_DIMENSION]: c.SITE_PLATFORM.toLowerCase(),
            [c.MAIN_SCRIPT_SOURCE_URL_DIMENSION]: c.SCRIPT_SOURCE.toLowerCase(),
            [c.MAIN_CODEVERSION_DIMENSION]: c.VERSION.toLowerCase(),
            [c.MAIN_URL_PROTOCOL_DIMENSION]: c.URL_PROTOCOL.toLowerCase(),
            [c.MAIN_USING_PARALLEL_DIMENSION]: c.USING_PARALLEL_TRACKER.toLowerCase()
          };
          document.referrer && -1 !== document.referrer.search(location.hostname) ? e.page_referrer = C(document
            .referrer) : document.referrer;
          e = z(F(e), "default")
        } else e = 0 < a && c.USE_PARALLEL_CUSTOM_DIMENSIONS ? {
            groups: c.GA4_NAME + a,
            cookie_expires: parseInt(c.COOKIE_TIMEOUT),
            page_location: b,
            page_title: d,
            [c.PARALLEL_AGENCY_DIMENSION]: c.AGENCY.toUpperCase(),
            [c.PARALLEL_SUBAGENCY_DIMENSION]: c.SUB_AGENCY.toUpperCase(),
            [c.PARALLEL_SITE_TOPIC_DIMENSION]: c.SITE_TOPIC.toLowerCase(),
            [c.PARALLEL_SITE_PLATFORM_DIMENSION]: c.SITE_PLATFORM.toLowerCase(),
            [c.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION]: c.SCRIPT_SOURCE.toLowerCase(),
            [c.PARALLEL_CODEVERSION_DIMENSION]: c.VERSION.toLowerCase(),
            [c.PARALLEL_URL_PROTOCOL_DIMENSION]: c.URL_PROTOCOL.toLowerCase(),
            [c.PARALLEL_USING_PARALLEL_DIMENSION]: c.USING_PARALLEL_TRACKER.toLowerCase()
          } : {
            groups: c.GA4_NAME + a,
            cookie_expires: parseInt(c.COOKIE_TIMEOUT),
            page_location: b,
            page_title: d
          }, document.referrer && -1 !== document.referrer.search(location.hostname) ?
          e.page_referrer = C(document.referrer) : document.referrer, e = z(F(e), "default");
        e = N(e);
        e = O(e);
        E("config", c.GWT_GA4ID[a], e)
      }
      y ? H({
        search_term: y
      }) : ""
    })();
    var S = 1;
    if (c.YOUTUBE) {
      G = document.createElement("script");
      G.src = "https://www.youtube.com/iframe_api";
      A = document.getElementsByTagName("script")[0];
      A.parentNode.insertBefore(G, A);
      var D = [],
        p = [],
        v = [],
        B = c.YT_MILESTONE,
        L = [];
      onYouTubeIframeAPIReady = function () {
        for (var a = 0; a < D.length; a++) p[a] = new YT.Player(D[a], {
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
          }
        })
      };
      onPlayerReady = function (a) {};
      onPlayerError = function (a) {
        q("video_error", {
          videotitle: void 0 !== a.target.playerInfo ? a.target.playerInfo.videoData.title : a.target
            .getVideoData().title
        })
      };
      onPlayerStateChange = function (a) {
        try {
          for (var b = 0, d = void 0 !== a.target.playerInfo ? a.target.playerInfo.videoData.video_id : a.target
              .getVideoData().video_id, e = 0; e < D.length; e++) D[e] == d && (b = e);
          var g = void 0 !== p[b].playerInfo ? Math.round(p[b].playerInfo.currentTime) : Math.round(p[b]
              .getCurrentTime()),
            h = void 0 !==
            p[b].playerInfo ? Math.round(p[b].playerInfo.duration) : Math.round(p[b].getDuration()),
            k = {
              video_current_time: g,
              video_duration: h,
              video_percent: (g / h * 100).toFixed(),
              video_provider: "youtube",
              video_title: void 0 !== p[b].playerInfo ? p[b].playerInfo.videoData.title : p[b].getVideoData().title,
              video_id: void 0 !== p[b].playerInfo ? p[b].playerInfo.videoData.video_id : p[b].getVideoData()
                .video_id,
              video_url: void 0 !== p[b].playerInfo ? p[b].playerInfo.videoUrl : p[b].getVideoUrl()
            };
          a.data == YT.PlayerState.PLAYING && 0 == k.video_percent ?
            (q("video_start", k), cCi = 0, B && (L.push([b, function (f) {
              for (f = 1; f <= 100 / B; f++) 4 === 100 / B && f === 100 / B ? v[f - 1] = {
                id: b,
                milestone: 95,
                triggered: !1
              } : 100 !== B * f ? v[f - 1] = {
                id: b,
                milestone: B * f,
                triggered: !1
              } : "";
              setInterval(function () {
                var n = void 0 !== p[b].playerInfo ? Math.round(p[b].playerInfo.currentTime) : Math.round(
                    p[b].getCurrentTime()),
                  l = void 0 !== p[b].playerInfo ? Math.round(p[b].playerInfo.duration) : Math.round(p[b]
                    .getDuration());
                n = {
                  video_current_time: n,
                  video_duration: l,
                  video_percent: (n / l * 100).toFixed(),
                  video_provider: "youtube",
                  video_title: void 0 !== p[b].playerInfo ? p[b].playerInfo.videoData.title : p[b]
                    .getVideoData().title,
                  video_id: void 0 !== p[b].playerInfo ? p[b].playerInfo.videoData.video_id : p[b]
                    .getVideoData().video_id,
                  video_url: void 0 !== p[b].playerInfo ? p[b].playerInfo.videoUrl : p[b].getVideoUrl()
                };
                n.video_percent <= v[v.length - 1] && cCi < v.length && n.video_percent >= v[cCi]
                  .milestone && !v[cCi].triggered && v[b].id === b && (v[cCi].triggered = !0, n
                    .video_percent = v[cCi].milestone, n.video_current_time = Math.round(n
                      .video_duration / v.length * (cCi +
                        1)), q("video_progress", n), cCi++)
              }, (void 0 !== p[b].playerInfo ? Math.round(p[b].playerInfo.duration) : Math.round(p[b]
                .getDuration())) / v.length)
            }]), L[L.length - 1][1](b))) : a.data == YT.PlayerState.PLAYING && q("video_play", k);
          a.data == YT.PlayerState.ENDED && q("video_complete", k);
          a.data == YT.PlayerState.PAUSED && q("video_pause", k)
        } catch (f) {}
      };
      youtube_parser = function (a) {
        if ((a = a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]*).*/)) && 11 == a[2].length)
          return a[2]
      };
      IsYouTube = function (a) {
        a = a.match(
          /(.*)(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*/
          );
        return null != a && 0 < a.length
      };
      YTUrlHandler = function (a) {
        return a = a.replace(/origin=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})&?/gi, "origin=" + document.location
            .protocol + "//" + document.location.host), stAdd = "", adFlag = !1, -1 == a.indexOf("https") && (a = a
            .replace("http", "https")), -1 == a.indexOf("?") && (stAdd = "?flag=1"), -1 == a.indexOf("enablejsapi") &&
          (stAdd += "&enablejsapi=1", adFlag = !0), -1 == a.indexOf("origin") && (stAdd += "&origin=" + document
            .location.protocol + "//" + document.location.host, adFlag = !0), 1 == adFlag ? a + stAdd : a
      };
      _initYouTubeTracker = function () {
        for (var a = 0, b = document.getElementsByTagName("iframe"), d = 0; d < b.length; d++) {
          var e = b[d].src;
          IsYouTube(e) && (b[d].src = YTUrlHandler(e), e = youtube_parser(e), D[a] = e, b[d].setAttribute("id", e),
            a++)
        }
      }
    }
    R() || (document.addEventListener ? document.addEventListener("DOMContentLoaded", Q) : document.attachEvent &&
      document.attachEvent("onreadystatechange", R))
  })();
  //# sourceMappingURL=Federated.js.map