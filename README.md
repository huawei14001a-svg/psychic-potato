<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">
<title>Verifure</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
/* ═══════════════ ПЕРЕМЕННЫЕ ═══════════════ */
:root {
  --bg:         #F2F2F7;
  --card:       #FFFFFF;
  --text:       #1C1C1E;
  --text2:      #8E8E93;
  --accent:     #007AFF;
  --red:        #FF3B30;
  --green:      #34C759;
  --orange:     #FF9500;
  --yellow:     #FFD700;
  --sep:        rgba(60,60,67,0.12);
  --nav-bg:     rgba(255,255,255,0.85);
  --shadow:     0 2px 16px rgba(0,0,0,0.06);
  --radius:     16px;
  --radius-s:   10px;
  --nav-h:      68px;
}
.dark-theme {
  --bg:         #000000;
  --card:       #1C1C1E;
  --text:       #FFFFFF;
  --text2:      #8E8E93;
  --sep:        rgba(255,255,255,0.10);
  --nav-bg:     rgba(28,28,30,0.90);
  --shadow:     0 2px 20px rgba(0,0,0,0.40);
}

/* ═══════════════ СБРОС ═══════════════ */
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
html,body { height:100%; overflow:hidden; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
  transition: background .3s, color .3s;
}

/* ═══════════════ ЛЕЙАУТ ═══════════════ */
#app { height:100vh; display:flex; flex-direction:column; overflow:hidden; }
#scroll-area {
  flex:1; overflow-y:auto; overflow-x:hidden;
  -webkit-overflow-scrolling:touch;
  padding-bottom: calc(var(--nav-h) + 12px);
  padding-top: 12px;
}
#scroll-area::-webkit-scrollbar { display:none; }

/* ═══════════════ НИЖНЯЯ НАВИГАЦИЯ ═══════════════ */
.bottom-nav {
  position:fixed; bottom:0; left:0; right:0;
  height: var(--nav-h);
  display:flex; align-items:flex-start; justify-content:space-around;
  background: var(--nav-bg);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 1px solid var(--sep);
  padding-top: 8px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  z-index: 100;
}
.nav-btn {
  display:flex; flex-direction:column; align-items:center; gap:3px;
  border:none; background:none; cursor:pointer;
  color: var(--text2);
  padding: 2px 16px 4px;
  border-radius: var(--radius-s);
  transition: color .2s;
  min-width: 60px;
}
.nav-btn.active { color: var(--accent); }
.nav-btn svg { width:24px; height:24px; fill:currentColor; }
.nav-label { font-size:10px; font-weight:500; letter-spacing:0.1px; }

/* ═══════════════ КАРТОЧКИ ═══════════════ */
.section { padding: 0 16px 12px; }
.card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow:hidden;
  margin-bottom: 12px;
  transition: background .3s;
}
.card-body { padding: 16px; }
.card-header {
  padding: 12px 16px 0;
  font-size: 13px;
  font-weight:600;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ═══════════════ ТИПОГРАФИКА ═══════════════ */
.title-xl  { font-size:28px; font-weight:700; letter-spacing:-0.5px; }
.title-lg  { font-size:22px; font-weight:700; letter-spacing:-0.3px; }
.title     { font-size:17px; font-weight:600; }
.subtitle  { font-size:15px; font-weight:500; }
.body      { font-size:15px; font-weight:400; }
.caption   { font-size:13px; font-weight:400; color:var(--text2); }
.caption2  { font-size:11px; font-weight:400; color:var(--text2); }

/* ═══════════════ ПРОГРЕСС-БАР ═══════════════ */
.progress-wrap { margin:4px 0 2px; }
.progress-track {
  height: 6px; background: var(--sep);
  border-radius: 3px; overflow:hidden;
}
.progress-fill {
  height:100%; border-radius:3px;
  transition: width .6s ease;
}
.progress-meta {
  display:flex; justify-content:space-between; margin-top:4px;
}

/* ═══════════════ ШАПКА ПАРЫ ═══════════════ */
.couple-card { padding: 20px 16px 18px; text-align:center; }
.couple-avatars {
  display:flex; align-items:center; justify-content:center; gap:12px;
  margin-bottom: 14px;
}
.avatar {
  width:58px; height:58px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:24px; font-weight:700;
  flex-shrink:0; position:relative;
}
.avatar-1 { background: linear-gradient(135deg,#007AFF,#5AC8FA); color:#fff; }
.avatar-2 { background: linear-gradient(135deg,#FF2D55,#FF6B9D); color:#fff; }
.heart-icon {
  font-size:22px;
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { transform:scale(1); }
  50%      { transform:scale(1.25); }
}
.couple-names { font-size:17px; font-weight:700; margin-bottom:4px; }
.couple-status {
  display:inline-flex; align-items:center; gap:6px;
  background: var(--bg); padding:4px 12px; border-radius:20px;
  font-size:13px; font-weight:600; margin-bottom:14px;
}
.days-badge {
  display:flex; align-items:center; gap:8px; justify-content:center;
}
.days-num { font-size:36px; font-weight:700; letter-spacing:-1px; }
.days-label { font-size:13px; color:var(--text2); text-align:left; line-height:1.3; }

/* ═══════════════ СТАТ СЕТКА ═══════════════ */
.stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--sep); border-radius:var(--radius); overflow:hidden; }
.stat-cell { background:var(--card); padding:14px 12px; }
.stat-val { font-size:22px; font-weight:700; line-height:1; margin-bottom:3px; }
.stat-key { font-size:12px; color:var(--text2); }

/* ═══════════════ УРОВНИ ═══════════════ */
.level-row {
  display:flex; align-items:center; gap:12px; padding:12px 16px;
  border-bottom:1px solid var(--sep);
  transition: background .15s;
}
.level-row:last-child { border-bottom:none; }
.level-emoji-box {
  width:40px; height:40px; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  font-size:20px; flex-shrink:0;
}
.level-info { flex:1; min-width:0; }
.level-name-text { font-weight:600; font-size:15px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.level-days-range { font-size:12px; color:var(--text2); margin-top:1px; }
.level-badge {
  font-size:11px; font-weight:600; padding:3px 8px; border-radius:8px;
  white-space:nowrap; flex-shrink:0;
}
.level-badge.achieved { background:#34C75918; color:#34C759; }
.level-badge.current  { background:#007AFF18; color:#007AFF; }
.level-badge.locked   { background:var(--sep); color:var(--text2); }

/* ═══════════════ ПРЕДУПРЕЖДЕНИЕ РАЗВОДА ═══════════════ */
.divorce-warning {
  margin:0 16px 12px;
  border-radius:var(--radius);
  overflow:hidden;
}
.divorce-warning .dw-header {
  padding:14px 16px 10px;
  display:flex; align-items:center; gap:10px;
}
.divorce-warning .dw-icon { font-size:26px; }
.divorce-warning .dw-title { font-weight:700; font-size:16px; }
.divorce-warning .dw-sub { font-size:13px; opacity:.85; margin-top:1px; }
.divorce-warning .dw-body { padding:0 16px 14px; }

/* ═══════════════ БЕРЕМЕННОСТЬ ═══════════════ */
.preg-card {
  background:linear-gradient(135deg,#FF2D5518,#FF6B9D18);
  border:1px solid #FF2D5530;
}
.dark-theme .preg-card { background:linear-gradient(135deg,#FF2D5530,#FF6B9D25); }
.preg-days-row {
  display:flex; align-items:center; gap:10px;
  margin-bottom:10px;
}
.preg-day-num { font-size:38px; font-weight:800; letter-spacing:-1px; }
.preg-day-total { font-size:22px; color:var(--text2); margin-left:-4px; }

/* ═══════════════ ГРАФ / CHART ═══════════════ */
.chart-wrap { padding:12px 16px 16px; }
canvas { border-radius:8px; }

/* ═══════════════ КНОПКИ ═══════════════ */
.btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  width:100%; padding:13px; border-radius:var(--radius-s);
  border:none; cursor:pointer; font-size:16px; font-weight:600;
  transition: opacity .15s, transform .1s;
}
.btn:active { opacity:.7; transform:scale(.98); }
.btn-primary { background:var(--accent); color:#fff; }
.btn-danger  { background:var(--red);    color:#fff; }
.btn-soft    { background:var(--bg);     color:var(--accent); }

/* ═══════════════ ЗАГРУЗКА ═══════════════ */
#loading-screen {
  position:fixed; inset:0; background:var(--bg);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:16px; z-index:999;
  transition: opacity .4s;
}
.spinner {
  width:40px; height:40px; border-radius:50%;
  border:3px solid var(--sep);
  border-top-color:var(--accent);
  animation: spin .8s linear infinite;
}
@keyframes spin { to { transform:rotate(360deg); } }
.load-logo { font-size:42px; margin-bottom:4px; }
.load-text { font-size:17px; font-weight:600; }
.load-sub  { font-size:13px; color:var(--text2); }

/* ═══════════════ НЕТ БРАКА ═══════════════ */
#no-marriage-screen {
  display:none; padding:40px 24px;
  text-align:center; flex-direction:column;
  align-items:center; gap:16px;
}
#no-marriage-screen.show { display:flex; }

/* ═══════════════ ТАБЫ ═══════════════ */
.tab-pane { display:none; animation: fadeIn .25s ease; }
.tab-pane.active { display:block; }
@keyframes fadeIn { from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:none;} }

/* ═══════════════ ЛЮБОВЬ-БАР ═══════════════ */
.love-bar-track { height:10px; background:var(--sep); border-radius:5px; overflow:hidden; margin:4px 0; }
.love-bar-fill  { height:100%; border-radius:5px; background:linear-gradient(90deg,#FF3B30,#FF2D55,#FF6B9D); transition:width .6s ease; }

/* ═══════════════ SEPARATOR ═══════════════ */
.sep { height:1px; background:var(--sep); margin:0 16px; }

/* ═══════════════ INLINE-ROW ═══════════════ */
.row { display:flex; align-items:center; justify-content:space-between; padding:11px 16px; }
.row-icon { font-size:20px; width:36px; height:36px; display:flex; align-items:center; justify-content:center;
  background:var(--bg); border-radius:10px; margin-right:10px; flex-shrink:0; }
.row-label { flex:1; font-size:15px; }
.row-value { font-size:15px; font-weight:600; color:var(--text2); }
.row-divider { border-bottom:1px solid var(--sep); }

/* ═══════════════ CHILDREN ═══════════════ */
.children-list { padding:0 16px 12px; display:flex; flex-wrap:wrap; gap:10px; }
.child-item {
  display:flex; flex-direction:column; align-items:center; gap:4px;
  background:var(--card); border-radius:var(--radius-s); padding:12px 14px;
  box-shadow:var(--shadow); min-width:80px; text-align:center;
}
.child-emoji { font-size:30px; }
.child-num  { font-size:12px; color:var(--text2); }

/* ═══════════════ EMPTY STATE ═══════════════ */
.empty-state { padding:30px 16px; text-align:center; color:var(--text2); }
.empty-icon { font-size:44px; margin-bottom:10px; }

/* ═══════════════ АНИМАЦИЯ КАРТОЧКИ ═══════════════ */
.card { animation: slideUp .3s ease; }
@keyframes slideUp { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:none;} }

/* ═══════════════ ПУЛЬС УРОВНЯ ═══════════════ */
.level-glow { animation: glow 2.5s ease-in-out infinite; }
@keyframes glow {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,122,255,0); }
  50%      { box-shadow: 0 0 0 8px rgba(0,122,255,0.12); }
}
</style>
</head>
<body>

<!-- ╔══════════ ЗАГРУЗКА ══════════╗ -->
<div id="loading-screen">
  <div class="load-logo">💍</div>
  <div class="spinner"></div>
  <div class="load-text">Verifure</div>
  <div class="load-sub">Загрузка данных...</div>
</div>

<!-- ╔══════════ ГЛАВНЫЙ КОНТЕЙНЕР ══════════╗ -->
<div id="app" style="display:none;">

  <!-- Нет брака -->
  <div id="no-marriage-screen">
    <div style="font-size:64px">💍</div>
    <div class="title-xl">Verifure</div>
    <div style="color:var(--text2);font-size:15px;max-width:260px;line-height:1.6">
      Вы ещё не состоите в браке. Создайте пару с помощью бота!
    </div>
    <div class="card" style="width:100%;margin-top:8px;">
      <div class="card-header" style="padding:14px 16px 4px;">Как создать пару</div>
      <div class="row row-divider"><span class="row-icon">1️⃣</span><span class="row-label">Партнёр пишет боту <b>/start</b></span></div>
      <div class="row row-divider"><span class="row-icon">2️⃣</span><span class="row-label">Вы пишете <b>/marry @username</b></span></div>
      <div class="row row-divider"><span class="row-icon">3️⃣</span><span class="row-label">Партнёр принимает предложение</span></div>
      <div class="row"><span class="row-icon">🎉</span><span class="row-label">Брак заключён!</span></div>
    </div>
  </div>

  <!-- Основной экран -->
  <div id="main-screen" style="display:none;flex:1;flex-direction:column;height:100%;overflow:hidden;">

    <!-- Скролл-область -->
    <div id="scroll-area">

      <!-- ══════ ТАБ: ГЛАВНАЯ ══════ -->
      <div id="tab-home" class="tab-pane active">

        <!-- Карточка пары -->
        <div class="section">
          <div class="card">
            <div class="couple-card" id="couple-card">
              <div class="couple-avatars">
                <div class="avatar avatar-1" id="av1">?</div>
                <div class="heart-icon">❤️</div>
                <div class="avatar avatar-2" id="av2">?</div>
              </div>
              <div class="couple-names" id="couple-names">— ❤️ —</div>
              <div class="couple-status level-glow" id="couple-status">
                <span id="level-emoji">💙</span>
                <span id="level-name">Загрузка...</span>
              </div>
              <div class="days-badge">
                <div class="days-num" id="days-count">0</div>
                <div class="days-label"><b>дней</b><br>в браке</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Прогресс уровня -->
        <div class="section">
          <div class="card">
            <div class="card-header">Прогресс уровня</div>
            <div class="card-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="body" id="current-level-short">—</span>
                <span class="caption" id="next-level-short">—</span>
              </div>
              <div class="progress-wrap">
                <div class="progress-track">
                  <div class="progress-fill" id="level-bar" style="width:0%;background:var(--accent);"></div>
                </div>
                <div class="progress-meta">
                  <span class="caption2" id="level-pct-label">0%</span>
                  <span class="caption2" id="days-to-next">—</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Уровень любви -->
        <div class="section">
          <div class="card">
            <div class="card-header">Уровень любви</div>
            <div class="card-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="title">❤️ Любовь</span>
                <span class="title" id="love-pct" style="color:#FF2D55;">100%</span>
              </div>
              <div class="love-bar-track">
                <div class="love-bar-fill" id="love-bar" style="width:100%;"></div>
              </div>
              <div class="caption" id="love-status" style="margin-top:6px;">Отношения в отличном состоянии 💕</div>
            </div>
          </div>
        </div>

        <!-- Активность -->
        <div class="section">
          <div class="card">
            <div class="card-header">Активность пары</div>
            <div style="background:var(--sep);height:1px;margin-top:8px;"></div>
            <div class="row row-divider">
              <div style="display:flex;align-items:center;"><span class="row-icon">💬</span><span class="row-label">Всего сообщений</span></div>
              <span class="row-value" id="stat-total">0</span>
            </div>
            <div class="row row-divider">
              <div style="display:flex;align-items:center;"><span class="row-icon">🔥</span><span class="row-label">Серия активности</span></div>
              <span class="row-value" id="stat-streak">0 дней</span>
            </div>
            <div class="row row-divider">
              <div style="display:flex;align-items:center;"><span class="row-icon">📅</span><span class="row-label">Среднее в день</span></div>
              <span class="row-value" id="stat-avg">0</span>
            </div>
            <div class="row">
              <div style="display:flex;align-items:center;"><span class="row-icon">📆</span><span class="row-label">Сегодня</span></div>
              <span class="row-value" id="stat-today">0</span>
            </div>
          </div>
        </div>

        <!-- Дата создания -->
        <div class="section">
          <div class="card">
            <div class="row">
              <div style="display:flex;align-items:center;"><span class="row-icon">📅</span><span class="row-label">Дата создания пары</span></div>
              <span class="row-value" id="marriage-date">—</span>
            </div>
          </div>
        </div>

      </div><!-- /tab-home -->

      <!-- ══════ ТАБ: ОТНОШЕНИЯ ══════ -->
      <div id="tab-relations" class="tab-pane">

        <!-- Предупреждение развода (скрыто по умолчанию) -->
        <div id="divorce-warning-block" class="divorce-warning" style="display:none;"></div>

        <!-- Все уровни -->
        <div class="section" style="padding-top:4px;">
          <div class="card-header" style="padding:4px 0 8px;font-size:13px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;">
            Система уровней брака
          </div>
          <div class="card" id="levels-list"></div>
        </div>

        <!-- История -->
        <div class="section">
          <div class="card">
            <div class="card-header">О системе активности</div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:10px;">
                <div style="display:flex;gap:10px;align-items:flex-start;">
                  <span style="font-size:20px;">📩</span>
                  <div><div class="subtitle">Пишите боту</div><div class="caption">Каждое сообщение боту засчитывается в активность пары</div></div>
                </div>
                <div style="display:flex;gap:10px;align-items:flex-start;">
                  <span style="font-size:20px;">⚠️</span>
                  <div><div class="subtitle">Молчание опасно</div><div class="caption">3 дня = предупреждение · 5 дней = риск · 7 дней = угроза разрыва</div></div>
                </div>
                <div style="display:flex;gap:10px;align-items:flex-start;">
                  <span style="font-size:20px;">🔄</span>
                  <div><div class="subtitle">Восстановление</div><div class="caption">Если снова начать писать, уровень любви восстанавливается</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /tab-relations -->

      <!-- ══════ ТАБ: СТАТИСТИКА ══════ -->
      <div id="tab-stats" class="tab-pane">

        <div class="section" style="padding-top:4px;">
          <div class="card">
            <div class="card-header">Активность за 7 дней</div>
            <div class="chart-wrap">
              <canvas id="weekChart" height="160" style="width:100%;display:block;"></canvas>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="card">
            <div class="card-header">Активность за 30 дней</div>
            <div class="chart-wrap">
              <canvas id="monthChart" height="140" style="width:100%;display:block;"></canvas>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="card">
            <div class="card-header">Вклад в переписку</div>
            <div id="user-breakdown" class="card-body" style="display:flex;flex-direction:column;gap:12px;"></div>
          </div>
        </div>

        <div class="section">
          <div class="stat-grid card">
            <div class="stat-cell">
              <div class="stat-val" id="s-total">0</div>
              <div class="stat-key">💬 Всего сообщений</div>
            </div>
            <div class="stat-cell">
              <div class="stat-val" id="s-streak">0</div>
              <div class="stat-key">🔥 Дней серии</div>
            </div>
            <div class="stat-cell">
              <div class="stat-val" id="s-avg">0</div>
              <div class="stat-key">📈 В среднем/день</div>
            </div>
            <div class="stat-cell">
              <div class="stat-val" id="s-week">0</div>
              <div class="stat-key">📅 За неделю</div>
            </div>
          </div>
        </div>

      </div><!-- /tab-stats -->

      <!-- ══════ ТАБ: СЕМЬЯ ══════ -->
      <div id="tab-family" class="tab-pane">

        <!-- Беременность (если есть) -->
        <div id="pregnancy-section" style="display:none;" class="section" style="padding-top:4px;">
          <div class="card preg-card">
            <div class="card-body">
              <div style="font-size:13px;font-weight:700;color:#FF2D55;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">
                🤰 Ожидание пополнения семьи
              </div>
              <div class="preg-days-row">
                <div class="preg-day-num" id="preg-day">0</div>
                <div class="preg-day-total" id="preg-total">/30</div>
                <div style="margin-left:8px;color:var(--text2);font-size:14px;">дней</div>
              </div>
              <div class="progress-track" style="height:10px;margin:4px 0 8px;">
                <div class="progress-fill" id="preg-bar" style="width:0%;background:linear-gradient(90deg,#FF6B9D,#FF2D55);"></div>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span class="caption">Прогресс</span>
                <span class="caption" id="preg-pct" style="color:#FF2D55;font-weight:600;">0%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Шанс ребёнка -->
        <div class="section" id="chance-section">
          <div class="card">
            <div class="card-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <span class="title">🎲 Шанс пополнения</span>
                <span class="title-lg" id="preg-chance" style="color:var(--accent);">0%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" id="chance-bar" style="width:0%;background:linear-gradient(90deg,#34C759,#30D158);"></div>
              </div>
              <div id="chance-conditions" style="margin-top:12px;display:flex;flex-direction:column;gap:8px;"></div>
            </div>
          </div>
        </div>

        <!-- Бонусы к шансу -->
        <div class="section">
          <div class="card">
            <div class="card-header">Как увеличить шанс</div>
            <div class="row row-divider"><div style="display:flex;align-items:center;"><span class="row-icon">💬</span><span class="row-label">+1% за каждые 1000 сообщений</span></div></div>
            <div class="row row-divider"><div style="display:flex;align-items:center;"><span class="row-icon">🔥</span><span class="row-label">+5% за серию 30 дней</span></div></div>
            <div class="row row-divider"><div style="display:flex;align-items:center;"><span class="row-icon">🥇</span><span class="row-label">+10% за Золотую свадьбу</span></div></div>
            <div class="row"><div style="display:flex;align-items:center;"><span class="row-icon">💎</span><span class="row-label">+20% за Бриллиантовую свадьбу</span></div></div>
          </div>
        </div>

        <!-- Дети -->
        <div id="children-section">
          <div class="section">
            <div class="card-header" style="padding:0 0 8px;font-size:13px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;">
              Дети
            </div>
          </div>
          <div id="children-list" class="children-list"></div>
          <div id="no-children" class="empty-state" style="display:none;">
            <div class="empty-icon">👶</div>
            <div class="caption">Здесь появятся ваши дети</div>
          </div>
        </div>

        <!-- После рождения -->
        <div class="section" style="margin-top:4px;">
          <div class="card" style="background:linear-gradient(135deg,#34C75910,#30D15810);border:1px solid #34C75930;">
            <div class="card-body">
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <span style="font-size:28px;">🎁</span>
                <div>
                  <div class="subtitle" style="margin-bottom:4px;">Подарок при рождении</div>
                  <div class="caption">При рождении малыша вы получите уникальный подарок через @Verifure или официального бота, если у вас нет Telegram Premium.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /tab-family -->

    </div><!-- /scroll-area -->

    <!-- ══════ НИЖНЯЯ НАВИГАЦИЯ ══════ -->
    <nav class="bottom-nav">
      <button class="nav-btn active" data-tab="home" onclick="switchTab('home', this)">
        <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span class="nav-label">Главная</span>
      </button>
      <button class="nav-btn" data-tab="relations" onclick="switchTab('relations', this)">
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <span class="nav-label">Отношения</span>
      </button>
      <button class="nav-btn" data-tab="stats" onclick="switchTab('stats', this)">
        <svg viewBox="0 0 24 24"><path d="M5 9.2h3V19H5V9.2M10.6 5h2.8v14h-2.8V5M16.2 13h2.8v6h-2.8v-6z"/></svg>
        <span class="nav-label">Статистика</span>
      </button>
      <button class="nav-btn" data-tab="family" onclick="switchTab('family', this)">
        <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        <span class="nav-label">Семья</span>
      </button>
    </nav>

  </div><!-- /main-screen -->
</div><!-- /app -->

<script>
// ════════════════════════════════════════════
// TELEGRAM WEBAPP INIT
// ════════════════════════════════════════════
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  if (tg.enableClosingConfirmation) tg.enableClosingConfirmation();
  if (tg.colorScheme === 'dark') document.body.classList.add('dark-theme');
  tg.onEvent('themeChanged', () => {
    document.body.classList.toggle('dark-theme', tg.colorScheme === 'dark');
  });
}

// ════════════════════════════════════════════
// ПОЛУЧЕНИЕ ID ПОЛЬЗОВАТЕЛЯ
// ════════════════════════════════════════════
const urlParams  = new URLSearchParams(window.location.search);
const USER_ID    = tg?.initDataUnsafe?.user?.id
                || parseInt(urlParams.get('user_id'))
                || null;

// ════════════════════════════════════════════
// СОСТОЯНИЕ
// ════════════════════════════════════════════
let STATE = { user: null, marriage: null, levels: [] };
let currentTab   = 'home';
let chartsDrawn  = false;
let activeChartData = null;

// ════════════════════════════════════════════
// ЗАГРУЗКА ДАННЫХ
// ════════════════════════════════════════════
async function loadData() {
  if (!USER_ID) {
    hideLoading();
    showNoMarriage();
    return;
  }
  try {
    const [userData, levelsData] = await Promise.all([
      fetch(`/api/user/${USER_ID}`).then(r => r.json()),
      fetch('/api/levels').then(r => r.json())
    ]);

    STATE.user     = userData.user;
    STATE.marriage = userData.marriage;
    STATE.levels   = levelsData;

    hideLoading();
    if (!STATE.marriage) {
      showNoMarriage();
    } else {
      showMainScreen();
      renderAll();
    }
  } catch(e) {
    console.error('loadData error:', e);
    hideLoading();
    showNoMarriage();
  }
}

function hideLoading() {
  const el = document.getElementById('loading-screen');
  el.style.opacity = '0';
  setTimeout(() => { el.style.display = 'none'; }, 400);
  document.getElementById('app').style.display = 'block';
}
function showNoMarriage() {
  document.getElementById('no-marriage-screen').classList.add('show');
}
function showMainScreen() {
  document.getElementById('main-screen').style.display = 'flex';
}

// ════════════════════════════════════════════
// РЕНДЕР ВСЕГО
// ════════════════════════════════════════════
function renderAll() {
  renderHome();
  renderRelations();
  renderFamily();
  activeChartData = STATE.marriage;
  if (currentTab === 'stats') renderStats();
}

// ════════════════════════════════════════════
// ТАБ: ГЛАВНАЯ
// ════════════════════════════════════════════
function renderHome() {
  const m = STATE.marriage;
  if (!m) return;
  const { user, partner, days, level, stats, createdAt } = m;

  // Аватары
  const u1Name = STATE.user?.first_name || 'Я';
  const u2Name = partner?.firstName || '?';
  setText('av1', u1Name.charAt(0).toUpperCase());
  setText('av2', u2Name.charAt(0).toUpperCase());
  setText('couple-names', `${u1Name} ❤️ ${u2Name}`);
  setText('days-count', days);

  // Уровень
  setText('level-emoji', level.emoji);
  setText('level-name', level.name);
  const statusEl = document.getElementById('couple-status');
  if (statusEl) statusEl.style.color = level.color;

  // Прогресс уровня
  setText('current-level-short', `${level.emoji} ${level.name}`);
  const nextName = level.next ? `${level.next.emoji} ${level.next.name}` : 'Максимум';
  setText('next-level-short', nextName);
  setBar('level-bar', level.progress, level.color);
  setText('level-pct-label', `${level.progress}%`);
  setText('days-to-next', level.daysToNext > 0 ? `ещё ${level.daysToNext} дней` : '🏆 Достигнут');

  // Любовь
  if (stats) {
    const ll = stats.loveLevel;
    setText('love-pct', `${ll}%`);
    setBar('love-bar', ll);
    const loveStatuses = {
      100: 'Отношения в идеальном состоянии 💕',
      80:  'Отношения прочные и тёплые 💙',
      60:  'Отношения нуждаются во внимании ⚠️',
      40:  'Отношения слабеют 🔴',
      0:   'Критическая ситуация! 🚨'
    };
    let loveText = loveStatuses[0];
    for (const [k, v] of Object.entries(loveStatuses)) {
      if (ll >= parseInt(k)) loveText = v;
    }
    setText('love-status', loveText);

    // Активность
    setText('stat-total',  (stats.totalMessages || 0).toLocaleString('ru'));
    setText('stat-streak', `${stats.streak || 0} дней`);
    setText('stat-avg',    `${stats.avgPerDay || 0}/день`);
    setText('stat-today',  `${stats.todayMessages || 0} сообщ.`);
  }

  // Дата брака
  if (createdAt) {
    const d = new Date(createdAt);
    setText('marriage-date', d.toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' }));
  }
}

// ════════════════════════════════════════════
// ТАБ: ОТНОШЕНИЯ
// ════════════════════════════════════════════
function renderRelations() {
  const m = STATE.marriage;
  if (!m) return;

  // Предупреждение развода
  const dwBlock = document.getElementById('divorce-warning-block');
  if (m.divorceRisk) {
    const dr     = m.divorceRisk;
    const colors = { critical:'#FF3B30', high:'#FF9500', medium:'#FFD700' };
    const msgs   = {
      critical: 'Отношения разрушаются',
      high:     'Отношения слабеют',
      medium:   'Требуется внимание'
    };
    const c = colors[dr.stage] || '#FF9500';
    dwBlock.style.display = 'block';
    dwBlock.style.background = `${c}18`;
    dwBlock.style.border     = `1px solid ${c}40`;
    dwBlock.innerHTML = `
      <div class="dw-header">
        <div class="dw-icon">${dr.stage === 'critical' ? '🚨' : dr.stage === 'high' ? '🔴' : '⚠️'}</div>
        <div>
          <div class="dw-title" style="color:${c}">${msgs[dr.stage]}</div>
          <div class="dw-sub" style="color:${c}">Партнёр не активен: ${dr.inactiveDays} дней</div>
        </div>
      </div>
      <div class="dw-body">
        <div class="progress-track">
          <div class="progress-fill" style="width:${dr.progress}%;background:${c};"></div>
        </div>
        <div class="progress-meta">
          <span class="caption2">Прогресс разрушения</span>
          <span class="caption2" style="color:${c};font-weight:600;">${dr.progress}%</span>
        </div>
      </div>
    `;
  } else {
    dwBlock.style.display = 'none';
  }

  // Уровни
  const levelsList = document.getElementById('levels-list');
  if (!levelsList || !STATE.levels.length) return;
  levelsList.innerHTML = '';

  STATE.levels.forEach((lvl, i) => {
    const isCurrent = lvl.minDays <= m.days && (!lvl.maxDays || m.days < lvl.maxDays);
    const isAchieved = m.days >= lvl.minDays;
    const isLocked   = m.days < lvl.minDays;

    let badgeClass = isLocked ? 'locked' : (isCurrent ? 'current' : 'achieved');
    let badgeText  = isLocked ? `через ${lvl.minDays - m.days} дн.` : (isCurrent ? 'Текущий' : 'Достигнут ✓');

    let daysAchieved = '';
    if (isAchieved && !isCurrent) {
      const d = new Date(STATE.marriage.createdAt);
      d.setDate(d.getDate() + lvl.minDays);
      daysAchieved = d.toLocaleDateString('ru-RU', { day:'numeric', month:'short' });
    }

    const row = document.createElement('div');
    row.className = 'level-row';
    if (isCurrent) row.style.background = `${lvl.color}12`;
    row.innerHTML = `
      <div class="level-emoji-box" style="background:${lvl.color}20;">${lvl.emoji}</div>
      <div class="level-info">
        <div class="level-name-text" style="${isCurrent ? `color:${lvl.color};` : isLocked ? 'opacity:.5;' : ''}">${lvl.name}</div>
        <div class="level-days-range">${lvl.daysRange} · ${lvl.bonus}</div>
        ${daysAchieved ? `<div class="caption2" style="margin-top:1px;color:${lvl.color};">Достигнут ${daysAchieved}</div>` : ''}
        ${isCurrent && lvl.maxDays ? `
          <div class="progress-track" style="height:4px;margin-top:5px;">
            <div class="progress-fill" style="width:${m.level.progress}%;background:${lvl.color};"></div>
          </div>` : ''}
      </div>
      <div class="level-badge ${badgeClass}">${badgeText}</div>
    `;
    levelsList.appendChild(row);
  });
}

// ════════════════════════════════════════════
// ТАБ: СТАТИСТИКА
// ════════════════════════════════════════════
function renderStats() {
  const m = STATE.marriage;
  if (!m) return;

  // Мини-карточки
  setText('s-total',  (m.stats?.totalMessages || 0).toLocaleString('ru'));
  setText('s-streak', m.stats?.streak || 0);
  setText('s-avg',    m.stats?.avgPerDay || 0);
  setText('s-week',   m.stats?.weekMessages || 0);

  // График за 7 дней
  drawBarChart('weekChart', m.weeklyData || [], 7, '#007AFF');

  // График за 30 дней
  drawBarChart('monthChart', m.monthlyData || [], 30, '#34C759');

  // Вклад пользователей
  const bkEl = document.getElementById('user-breakdown');
  bkEl.innerHTML = '';
  const byUser = m.byUser || [];
  const total  = byUser.reduce((s, u) => s + (u.total || 0), 0);

  if (!byUser.length) {
    bkEl.innerHTML = '<div class="caption" style="text-align:center;">Нет данных</div>';
  } else {
    byUser.forEach((u, i) => {
      const pct   = total > 0 ? Math.round((u.total / total) * 100) : 0;
      const color = i === 0 ? '#007AFF' : '#FF2D55';
      const name  = u.username ? `@${u.username}` : u.first_name;
      bkEl.innerHTML += `
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span class="body" style="font-weight:600;">${name}</span>
            <span class="body" style="color:${color};font-weight:700;">${pct}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%;background:${color};"></div>
          </div>
          <div class="caption" style="margin-top:3px;">${(u.total || 0).toLocaleString('ru')} сообщений</div>
        </div>
      `;
    });
  }

  chartsDrawn = true;
}

// ════════════════════════════════════════════
// РИСОВАНИЕ ГРАФИКОВ (Canvas)
// ════════════════════════════════════════════
function drawBarChart(canvasId, data, daysBack, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const W      = canvas.offsetWidth || 300;
  const H      = parseInt(canvas.height) || 160;
  canvas.width = W * window.devicePixelRatio;
  canvas.height= H * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const isDark = document.body.classList.contains('dark-theme');
  const bg     = isDark ? '#1C1C1E' : '#FFFFFF';
  const grid   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const lblClr = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Заполняем дни
  const days = [];
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    days.push(d.toISOString().split('T')[0]);
  }

  const vals = days.map(date => {
    const found = data.find(d => d.log_date === date);
    return found ? (found.total || 0) : 0;
  });

  const maxVal = Math.max(...vals, 1);
  const pad    = { top:10, right:8, bottom:24, left:8 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const barW   = Math.max(2, (chartW / daysBack) * 0.65);
  const gap    = chartW / daysBack;

  // Grid lines
  for (let g = 0; g <= 3; g++) {
    const y = pad.top + chartH - (g / 3) * chartH;
    ctx.strokeStyle = grid;
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
  }

  // Bars
  vals.forEach((val, i) => {
    const barH = Math.max(2, (val / maxVal) * chartH);
    const x    = pad.left + i * gap + (gap - barW) / 2;
    const y    = pad.top + chartH - barH;

    const grad = ctx.createLinearGradient(x, y, x, y + barH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '60');
    ctx.fillStyle    = val > 0 ? grad : grid;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
    ctx.fill();
  });

  // X labels (показываем каждые N дней)
  const labelEvery = daysBack <= 7 ? 1 : Math.ceil(daysBack / 6);
  ctx.fillStyle = lblClr;
  ctx.font      = `${10 * (window.devicePixelRatio > 1 ? 1 : 1)}px -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  days.forEach((date, i) => {
    if (i % labelEvery !== 0 && i !== days.length - 1) return;
    const d   = new Date(date);
    const lbl = `${d.getDate()}.${d.getMonth() + 1}`;
    const x   = pad.left + i * gap + gap / 2;
    ctx.fillText(lbl, x, H - 6);
  });
}

// ════════════════════════════════════════════
// ТАБ: СЕМЬЯ
// ════════════════════════════════════════════
function renderFamily() {
  const m = STATE.marriage;
  if (!m) return;

  // Беременность
  const pregSection = document.getElementById('pregnancy-section');
  if (m.pregnancy) {
    pregSection.style.display = 'block';
    setText('preg-day',   m.pregnancy.daysElapsed);
    setText('preg-total', `/${m.pregnancy.daysTotal} дней`);
    const pct = m.pregnancy.progress || 0;
    setBar('preg-bar', pct);
    setText('preg-pct',   `${pct}%`);
  } else {
    pregSection.style.display = 'none';
  }

  // Шанс беременности
  const chance    = m.pregnancyChance || 0;
  const chanceBar = document.getElementById('chance-bar');
  if (chanceBar) { chanceBar.style.width = `${chance}%`; }
  setText('preg-chance', `${chance}%`);

  // Условия
  const condEl = document.getElementById('chance-conditions');
  if (condEl) {
    const conditions = [
      { ok: m.days >= 180,              text: `180 дней брака (${m.days < 180 ? 'ещё ' + (180 - m.days) + ' дн.' : 'выполнено'})` },
      { ok: (m.stats?.loveLevel || 0) >= 50, text: `Уровень любви ≥ 50% (${m.stats?.loveLevel || 0}%)` },
      { ok: (m.stats?.totalMessages || 0) >= 1000, text: `1000+ сообщений (${(m.stats?.totalMessages || 0).toLocaleString('ru')})` },
      { ok: (m.stats?.streak || 0) >= 7, text: `Серия 7+ дней (${m.stats?.streak || 0} дн.)` }
    ];
    condEl.innerHTML = conditions.map(c => `
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="color:${c.ok ? '#34C759' : '#FF3B30'};font-size:16px;">${c.ok ? '✅' : '❌'}</span>
        <span class="caption" style="color:${c.ok ? 'var(--text)' : 'var(--text2)'}">${c.text}</span>
      </div>
    `).join('');
  }

  // Дети
  const children = m.children || [];
  const childList = document.getElementById('children-list');
  const noChild   = document.getElementById('no-children');

  if (children.length === 0) {
    if (childList) childList.innerHTML = '';
    if (noChild)   noChild.style.display = 'block';
  } else {
    if (noChild) noChild.style.display = 'none';
    if (childList) {
      childList.innerHTML = children.map((c, i) => `
        <div class="child-item">
          <div class="child-emoji">👶</div>
          <div class="subtitle" style="font-weight:700;">#${c.birth_number || i + 1}</div>
          <div class="child-num">${new Date(c.born_at).toLocaleDateString('ru-RU', { day:'numeric', month:'short' })}</div>
        </div>
      `).join('');
    }
  }
}

// ════════════════════════════════════════════
// ПЕРЕКЛЮЧЕНИЕ ТАБОВ
// ════════════════════════════════════════════
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tab}`)?.classList.add('active');
  if (btn) btn.classList.add('active');
  currentTab = tab;
  document.getElementById('scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });

  if (tab === 'stats' && !chartsDrawn && STATE.marriage) {
    setTimeout(() => renderStats(), 100);
  }
}

// ════════════════════════════════════════════
// УТИЛИТЫ
// ════════════════════════════════════════════
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setBar(id, pct, color) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  if (color) el.style.background = color;
}

// ════════════════════════════════════════════
// АВТО-ОБНОВЛЕНИЕ КАЖДЫЕ 60 СЕК
// ════════════════════════════════════════════
setInterval(async () => {
  if (!USER_ID || !STATE.marriage) return;
  try {
    const data = await fetch(`/api/user/${USER_ID}`).then(r => r.json());
    if (data.marriage) {
      STATE.marriage = data.marriage;
      renderAll();
      if (currentTab === 'stats') { chartsDrawn = false; renderStats(); }
    }
  } catch(e) {}
}, 60000);

// Логировать активность
if (USER_ID) {
  fetch('/api/log-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramId: USER_ID })
  }).catch(() => {});
}

// ════════════════════════════════════════════
// СТАРТ
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', loadData);
window.addEventListener('resize', () => {
  if (currentTab === 'stats' && STATE.marriage) {
    chartsDrawn = false;
    renderStats();
  }
});
</script>
</body>
</html>
