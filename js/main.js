(function () {
  "use strict";

  // Roles drawn on the career timeline. Dates are [year, month].
  // Month precision was not given for training (2021-2022), so that bar is approximate.
  var ROLES = [
    {
      id: "crowne", lane: 0, org: "Crowne Plaza", title: "Duty manager",
      label: "Crowne Plaza", start: [2019, 1], end: [2021, 8], dates: "January 2019 to August 2021",
      bullets: [
        "Managed front office operations, keeping service standards and customer satisfaction high.",
        "Analysed CRM reports and KPIs to track business performance.",
        "Oversaw inventory, procurement and purchase order processes."
      ],
      tools: []
    },
    {
      id: "fdm", lane: 1, org: "FDM Consulting Academy", title: "Data engineering training",
      label: "FDM training", start: [2021, 9], end: [2022, 2], dates: "2021 to 2022",
      bullets: [
        "Data engineering training programme at FDM Consulting Academy."
      ],
      tools: []
    },
    {
      id: "lloyds", lane: 0, org: "Lloyds Banking Group", title: "Data analyst, credit risk",
      label: "Lloyds", start: [2022, 3], end: [2023, 7], dates: "March 2022 to July 2023",
      bullets: [
        "Salesforce migration: defined requirements and transformation logic for lending and collateral customer journeys.",
        "Analysed business banking and SME customer and collateral data across legacy source systems.",
        "Produced field-level data mapping for the Salesforce integration.",
        "Gathered and validated data requirements, ensuring PII compliance and interface specifications.",
        "Worked with subject matter experts to document SME and business banking lending processes and data capture needs.",
        "Improved data quality through profiling, validation and cleansing."
      ],
      tools: []
    },
    {
      id: "newday", lane: 0, org: "NewDay", title: "Senior MI developer, operations MI",
      label: "NewDay", start: [2023, 7], end: [2025, 1], dates: "July 2023 to January 2025",
      intro: "NewDay serves about 4 million customers across instalment finance, buy now pay later and credit products.",
      bullets: [
        "Led the migration of reporting and ETL solutions from SQL Server to Snowflake.",
        "Built automated data pipelines using Python, Airflow and Astronomer.",
        "Delivered Credit and Fraud MI reporting to improve operational oversight.",
        "Developed telephony analytics, reducing customer service overhead by 10%.",
        "Automated CRA compliance reporting with Power BI and Excel.",
        "Created an EUD governance dashboard for application and data asset management."
      ],
      tools: ["SQL Server", "Snowflake", "Python", "Airflow", "Astronomer", "Power BI", "Excel"]
    },
    {
      id: "zoomcamp", lane: 1, org: "Personal project", title: "Data Engineering Zoomcamp",
      label: "Zoomcamp", start: [2025, 1], end: [2025, 3], dates: "January to March 2025",
      bullets: [
        "Transformed, integrated and loaded data on Google Cloud using Docker, Kestra and dbt to build the pipeline."
      ],
      tools: ["Google Cloud", "Docker", "Kestra", "dbt", "Looker"],
      link: { href: "https://github.com/Jbankx", text: "GitHub profile" }
    },
    {
      id: "amazon", lane: 0, org: "Accenture", client: "Amazon Ads Consulting", title: "Senior data analyst",
      label: "Amazon", start: [2025, 4], end: [2025, 12], dates: "April to December 2025",
      bullets: [
        "Developed performance reporting and interactive dashboards to monitor advertising KPIs, including ROAS and ACOS.",
        "Gave Advertising Consultants actionable insights to support campaign optimisation and sales growth.",
        "Analysed campaign performance across Sponsored Products, Sponsored Display and Sponsored TV.",
        "Evaluated bidding, keyword targeting and product targeting strategies to find optimisation opportunities.",
        "Used Amazon analytics tools to identify trends and measure performance.",
        "Supported advertiser growth through spend tracking, launch reporting and performance analysis."
      ],
      tools: []
    },
    {
      id: "now", lane: 0, org: "Accenture Marketing Operations", client: "LinkedIn, digital marketing",
      title: "Senior data analyst, digital marketing",
      label: "Accenture", start: [2026, 1], end: null, dates: "January 2026 to present", current: true,
      bullets: [
        "Manage campaign ads QA to keep reporting accurate and data intact across business dashboards.",
        "Develop automated planning and forecasting solutions that support business unit budget management.",
        "Build and maintain ETL workflows and data pipelines using Airflow and SQL.",
        "Deliver daily, weekly, monthly and quarterly performance dashboards.",
        "Give analytical insights and recommendations that support marketing decisions.",
        "Develop complex data models and advanced SQL for reporting and analytics.",
        "Gather requirements from stakeholders and turn them into scalable reporting solutions.",
        "Drive reporting automation and process improvements.",
        "Respond to broken dashboards and outdated datasets by tracing their primary drivers.",
        "Spot patterns in data anomalies and take corrective action to protect and improve revenue."
      ],
      tools: ["Airflow", "SQL"]
    }
  ];

  var lineage = document.getElementById("lineage");
  var detail = document.getElementById("detail");
  var now = new Date();
  var axisStart = 2019 * 12;                       // January 2019
  var axisEnd = now.getFullYear() * 12 + now.getMonth() + 1; // end of current month
  var span = axisEnd - axisStart;
  var buttons = {};

  function m(d) { return d[0] * 12 + (d[1] - 1); }
  function pct(v) { return (v / span * 100).toFixed(3) + "%"; }

  var lanes = [
    { name: "Employment", el: null },
    { name: "Training and projects", el: null }
  ];
  lanes.forEach(function (lane, i) {
    var wrap = document.createElement("div");
    wrap.className = "lane lane-" + i;
    var h = document.createElement("p");
    h.className = "lane-name";
    h.textContent = lane.name;
    var track = document.createElement("div");
    track.className = "track";
    wrap.appendChild(h);
    wrap.appendChild(track);
    lineage.appendChild(wrap);
    lane.el = track;
  });

  ROLES.forEach(function (r) {
    var s = m(r.start) - axisStart;
    var e = (r.end ? m(r.end) + 1 : axisEnd) - axisStart;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "seg" + (r.current ? " seg-now" : "") + (r.lane === 1 ? " seg-minor" : "");
    b.style.setProperty("--l", pct(s));
    b.style.setProperty("--w", pct(e - s));
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-label", r.title + ", " + r.org + ", " + r.dates);
    var t = document.createElement("span");
    t.className = "seg-label";
    t.textContent = r.label;
    b.appendChild(t);
    b.addEventListener("click", function () { select(r.id); });
    lanes[r.lane].el.appendChild(b);
    buttons[r.id] = b;
  });

  // Year axis under the employment lane
  var axis = document.createElement("div");
  axis.className = "axis";
  axis.setAttribute("aria-hidden", "true");
  for (var y = 2019; y <= now.getFullYear(); y++) {
    var tick = document.createElement("span");
    tick.style.setProperty("--l", pct(y * 12 - axisStart));
    tick.textContent = y;
    axis.appendChild(tick);
  }
  lineage.insertBefore(axis, lineage.children[1]);

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function select(id) {
    var r = ROLES.filter(function (x) { return x.id === id; })[0];
    Object.keys(buttons).forEach(function (k) {
      buttons[k].setAttribute("aria-pressed", k === id ? "true" : "false");
    });
    detail.textContent = "";
    detail.appendChild(el("h3", null, r.title));
    var org = r.org + (r.client ? " (client: " + r.client + ")" : "");
    detail.appendChild(el("p", "detail-meta", org + ". " + r.dates + "."));
    if (r.intro) detail.appendChild(el("p", "detail-intro", r.intro));
    var ul = el("ul");
    r.bullets.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    detail.appendChild(ul);
    if (r.tools.length) detail.appendChild(el("p", "detail-tools", "Tools: " + r.tools.join(", ") + "."));
    if (r.link) {
      var p = el("p");
      var a = el("a", null, r.link.text);
      a.href = r.link.href;
      a.rel = "noopener";
      p.appendChild(a);
      detail.appendChild(p);
    }
  }
  select("now");

  // Certifications (hidden until certs.js has entries)
  var certs = window.CERTIFICATIONS || [];
  if (certs.length) {
    var list = document.getElementById("cert-list");
    certs.forEach(function (c) {
      var li = el("li");
      var name;
      if (c.url) { name = el("a", null, c.name); name.href = c.url; name.rel = "noopener"; }
      else { name = el("strong", null, c.name); }
      li.appendChild(name);
      var meta = c.issuer + ", issued " + c.date + (c.expires ? ", expires " + c.expires : "");
      li.appendChild(el("span", "cert-meta", meta));
      list.appendChild(li);
    });
    document.getElementById("certs").hidden = false;
    var nav = document.querySelector(".top nav");
    var link = el("a", null, "Certifications");
    link.href = "#certs";
    nav.insertBefore(link, nav.children[3]);
  }

  // Email address assembled at runtime so it is not sitting in the HTML for scrapers
  var mail = document.getElementById("mail");
  var addr = ["junioralhassan92", "gmail.com"].join("@");
  mail.href = "mailto:" + addr;
  mail.title = addr;

  document.getElementById("year").textContent = now.getFullYear();
})();
