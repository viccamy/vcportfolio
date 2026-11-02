const themeToggle = document.getElementById('theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let explicitTheme = null;
try { explicitTheme = localStorage.getItem('vc-theme'); } catch {}
function applyTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo noturno');
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Modo claro' : 'Modo noturno';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#101f19' : '#e5e8db';
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener('click', () => {
  explicitTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(explicitTheme);
  try { localStorage.setItem('vc-theme', explicitTheme); } catch {}
});
systemTheme.addEventListener('change', event => {
  if (explicitTheme !== 'dark' && explicitTheme !== 'light') applyTheme(event.matches ? 'dark' : 'light');
});

const cases = {
  automacao: { company: 'OBITEC / UFCG · ABR 2026 — ATUAL', title: 'Mais fluidez na gestão de anuidades.', tags: 'Google Apps Script · Google Sheets · Gmail · Drive · Regex', sections: [
    ['O desafio', 'O processo de cobrança de anuidades de patentes era manual e lento. Era necessário filtrar informações e preparar comunicações repetitivas.'],
    ['Minha contribuição', 'Desenvolvi uma automação com Google Apps Script e Regex, integrando Sheets, Gmail e Drive para filtrar os dados e gerar rascunhos de e-mails em massa.'],
    ['O resultado', 'A intervenção humana passou a se concentrar na revisão e no envio dos e-mails, com ganho expressivo de tempo no fluxo.'],
    ['Sobre esta apresentação', 'Caso descrito a partir da minha experiência profissional. O fluxo visual é uma representação do processo, sem exposição de dados internos.']
  ]},
  dashboards: { company: 'NITT / UFCG · OUT 2025 — MAR 2026', title: 'Da informação dispersa à visão gerencial.', tags: 'Looker Studio · Google Sheets · Google Apps Script · KPIs', sections: [
    ['O desafio', 'Modernizar a operação, organizar grandes volumes de informações e facilitar a leitura de indicadores para apoiar a tomada de decisão.'],
    ['Minha contribuição', 'Estruturei e modelei dados no Google Sheets, construí dashboards gerenciais interativos no Looker Studio e implementei scripts para automatizar fluxos de trabalho.'],
    ['O resultado', 'Relatórios visuais para acompanhar KPIs e rotinas operacionais com menos trabalho manual. A organização das informações tornou mais acessível a visão gerencial da operação.'],
    ['Sobre esta apresentação', 'O gráfico da capa é ilustrativo: não é uma captura do dashboard entregue e não apresenta indicadores ou valores reais da instituição.']
  ]},
  operacoes: { company: 'MB / MERCADO BITCOIN · ABR 2024 — JUN 2025', title: 'Precisão nos dados. Cuidado na operação.', tags: 'Blockchain · Dados transacionais · Operações · Resolução de problemas', sections: [
    ['O contexto', 'Uma operação de ativos digitais exige atenção às informações transacionais, aos prazos e às solicitações dos clientes.'],
    ['Minha contribuição', 'Analisei e verifiquei informações transacionais em blockchains para apoiar a resolução de problemas. Também atuei na organização de notas fiscais, no controle de pagamentos de campanhas e em solicitações de Renda Fixa Digital e Renda Variável Digital.'],
    ['O aprendizado', 'Mais de um ano de experiência conectando análise de informações, organização operacional e foco na satisfação do cliente.'],
    ['Sobre esta apresentação', 'Este caso apresenta meu escopo de atuação profissional. A ilustração é conceitual e não contém transações ou dados de clientes.']
  ]}
};
const dialog = document.getElementById('case-dialog');
let trigger;
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const data = cases[button.dataset.case];
  trigger = button;
  document.getElementById('case-company').textContent = data.company;
  document.getElementById('case-title').textContent = data.title;
  const body = document.getElementById('case-body');
  body.replaceChildren();
  const tags = document.createElement('p'); tags.className = 'case-tags'; tags.textContent = data.tags; body.append(tags);
  data.sections.forEach(([title, text]) => { const h = document.createElement('h3'); h.textContent = title; const p = document.createElement('p'); p.textContent = text; body.append(h, p); });
  dialog.showModal(); document.body.style.overflow = 'hidden';
}));
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if(event.target === dialog){const r = dialog.getBoundingClientRect();if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();} });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; trigger?.focus(); });
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('vitorialima.contato@outlook.com'); status.textContent = 'E-mail copiado! Vamos conversar.'; }
  catch { status.textContent = 'Copie o endereço: vitorialima.contato@outlook.com'; }
});
document.getElementById('year').textContent = new Date().getFullYear();
