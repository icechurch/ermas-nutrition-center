(function () {
  // Mobile menu
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('hidden', !open);
    document.getElementById('menu-open').classList.toggle('hidden', open);
    document.getElementById('menu-close').classList.toggle('hidden', !open);
    btn.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
  }
  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });

  // Open / closed status, always in store-local (Central) time
  // day: [openMinutes, closeMinutes]; 0 = Sunday
  var HOURS = { 0: null, 1: [600, 1080], 2: [600, 1080], 3: [600, 1080], 4: [600, 1080], 5: [600, 1080], 6: [570, 960] };
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function storeNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day: day, mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
  }
  function fmt(m) {
    var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + (mm ? ':' + String(mm).padStart(2, '0') : '') + ' ' + ap;
  }
  function nextOpening(day, mins) {
    for (var i = 0; i < 8; i++) {
      var d = (day + i) % 7, h = HOURS[d];
      if (h && (i > 0 || mins < h[0])) {
        var when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAY_NAMES[d];
        return 'Opens ' + when + ' at ' + fmt(h[0]);
      }
    }
    return '';
  }

  function updateStatus() {
    var now;
    try { now = storeNow(); } catch (e) { return; }
    var h = HOURS[now.day];
    var open = !!h && now.mins >= h[0] && now.mins < h[1];
    var text = open ? 'Open now · until ' + fmt(h[1]) : 'Closed now · ' + nextOpening(now.day, now.mins);

    var pill = document.getElementById('open-status');
    if (pill) {
      pill.children[0].className = 'h-2.5 w-2.5 rounded-full ' + (open ? 'bg-leaf-500 animate-pulse' : 'bg-apple-500');
      pill.children[1].textContent = text;
    }
    var badge = document.getElementById('hours-badge');
    if (badge) {
      badge.textContent = open ? 'Open now' : 'Closed';
      badge.className = 'rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ' +
        (open ? 'bg-leaf-100 text-leaf-800' : 'bg-apple-50 text-apple-700');
    }
    document.querySelectorAll('tr[data-days]').forEach(function (row) {
      var today = row.dataset.days.split(',').indexOf(String(now.day)) !== -1;
      row.classList.toggle('text-leaf-700', today);
      row.classList.toggle('font-bold', today);
      if (today) row.setAttribute('aria-current', 'date'); else row.removeAttribute('aria-current');
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  document.getElementById('year').textContent = new Date().getFullYear();
})();
