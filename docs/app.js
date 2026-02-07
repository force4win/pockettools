const app = {
    state: {
        activeTool: null,
    },
    tools: [
        {
            id: 'notes',
            name: 'Notas Rápidas',
            icon: 'fa-regular fa-note-sticky',
            init: () => app.toolsLogic.notes.init()
        },
        {
            id: 'counter',
            name: 'Contador',
            icon: 'fa-solid fa-stopwatch',
            init: () => app.toolsLogic.counter.init()
        },
        {
            id: 'password',
            name: 'Generador Pass',
            icon: 'fa-solid fa-key',
            init: () => app.toolsLogic.password.init()
        },
        {
            id: 'todo',
            name: 'Lista Tareas',
            icon: 'fa-solid fa-check-double',
            init: () => app.toolsLogic.todo.init()
        },
        {
            id: 'converter',
            name: 'Conversor',
            icon: 'fa-solid fa-arrow-right-arrow-left',
            init: () => app.toolsLogic.converter.init()
        },
        {
            id: 'fuel',
            name: 'Control Gasolina',
            icon: 'fa-solid fa-gas-pump',
            init: () => app.toolsLogic.fuel.init()
        }
    ],

    init() {
        this.cacheDOM();
        this.renderDashboard();
        this.bindEvents();
        this.loadLastState();
    },

    cacheDOM() {
        this.dom = {
            dashboard: document.getElementById('dashboard-view'),
            toolContainer: document.getElementById('tool-container'),
            toolContent: document.getElementById('tool-content'),
            toolTitle: document.getElementById('current-tool-title'),
            backBtn: document.getElementById('back-btn'),
            grid: document.getElementById('tools-grid')
        };
    },

    bindEvents() {
        this.dom.backBtn.addEventListener('click', () => this.showDashboard());
    },

    renderDashboard() {
        this.dom.grid.innerHTML = this.tools.map(tool => `
            <div class="tool-card" onclick="app.openTool('${tool.id}')">
                <i class="${tool.icon} tool-icon"></i>
                <div class="tool-name">${tool.name}</div>
            </div>
        `).join('');
    },

    openTool(toolId) {
        const tool = this.tools.find(t => t.id === toolId);
        if (!tool) return;

        this.state.activeTool = toolId;

        // UI Updates
        this.dom.dashboard.classList.add('hidden');
        this.dom.toolContainer.classList.remove('hidden');
        this.dom.toolContainer.classList.add('active');
        this.dom.toolTitle.textContent = tool.name;

        // Load Tool HTML and Init Logic
        this.renderToolInterface(toolId);

        // Save state
        localStorage.setItem('pt_last_active', toolId);
    },

    showDashboard() {
        this.state.activeTool = null;
        this.dom.toolContainer.classList.remove('active');
        this.dom.toolContainer.classList.add('hidden');
        this.dom.dashboard.classList.remove('hidden');
        localStorage.removeItem('pt_last_active');
    },

    loadLastState() {
        const lastTool = localStorage.getItem('pt_last_active');
        if (lastTool) {
            this.openTool(lastTool);
        }
    },

    renderToolInterface(toolId) {
        let content = '';
        switch (toolId) {
            case 'notes':
                content = `
                    <div class="input-group">
                        <textarea id="notes-area" class="glass-input" placeholder="Escribe tus ideas aquí..."></textarea>
                        <div class="status-indicator">
                            <span id="save-status">Guardado</span> <span class="saved-dot"></span>
                        </div>
                    </div>
                `;
                break;
            case 'counter':
                content = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                        <div class="counter-display" id="counter-value">0</div>
                        <div class="counter-controls">
                            <button class="counter-btn btn-minus" id="btn-dec"><i class="fa-solid fa-minus"></i></button>
                            <button class="counter-btn btn-reset" id="btn-reset"><i class="fa-solid fa-rotate-right"></i></button>
                            <button class="counter-btn btn-plus" id="btn-inc"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                `;
                break;
            case 'password':
                content = `
                    <div class="input-group">
                        <div class="counter-display" id="pass-display" style="font-size: 2rem; margin: 20px 0; word-break: break-all; min-height: 60px;">---</div>
                        <button class="primary-btn" id="generate-btn" style="margin-bottom: 24px;">
                            <i class="fa-solid fa-shuffle"></i> Generar Nueva
                        </button>
                        
                        <label>Longitud: <span id="len-val">12</span></label>
                        <input type="range" id="pass-length" min="6" max="32" value="12">
                        
                        <div style="margin-top: 16px; display: grid; gap: 12px;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input type="checkbox" id="use-caps" checked style="width: auto;"> Mayúsculas (A-Z)
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input type="checkbox" id="use-nums" checked style="width: auto;"> Números (0-9)
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input type="checkbox" id="use-syms" style="width: auto;"> Símbolos (!@#$)
                            </label>
                        </div>
                    </div>
                `;
                break;
            case 'todo':
                content = `
                    <div class="input-group" style="display: flex; gap: 8px;">
                        <input type="text" id="todo-input" placeholder="Nueva tarea...">
                        <button class="primary-btn" id="todo-add" style="width: auto;"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <ul id="todo-list" style="list-style: none; padding: 0;"></ul>
                `;
                break;
            case 'converter':
                content = `
                    <div class="input-group">
                        <label>Tipo</label>
                        <select id="conv-type">
                            <option value="length">Longitud (m/ft)</option>
                            <option value="weight">Peso (kg/lb)</option>
                            <option value="temp">Temperatura (C/F)</option>
                        </select>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center;">
                        <div class="input-group">
                            <label id="label-a">Metros</label>
                            <input type="number" id="input-a" placeholder="0">
                        </div>
                        <div style="text-align: center; font-size: 1.5rem; color: var(--text-muted); padding-top: 12px;">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        </div>
                        <div class="input-group">
                            <label id="label-b">Pies</label>
                            <input type="number" id="input-b" placeholder="0">
                        </div>
                    </div>
                `;
                break;
            case 'fuel':
                content = `
                    <div style="display: grid; gap: 16px;">
                        <input type="datetime-local" id="fuel-date" class="glass-input" step="1">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div class="input-group">
                                <label>Km Recorridos</label>
                                <input type="number" id="fuel-dist" placeholder="0">
                            </div>
                            <div class="input-group">
                                <label>Galones</label>
                                <input type="number" id="fuel-gal" placeholder="0">
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Costo Total ($)</label>
                            <input type="number" id="fuel-cost" placeholder="$">
                        </div>
                        <button class="primary-btn" id="fuel-add-btn">
                            <i class="fa-solid fa-plus"></i> Guardar Tanqueo
                        </button>
                    </div>

                    <div style="margin-top: 32px; flex: 1; display: flex; flex-direction: column;">
                        <h3 style="margin-bottom: 12px;">Historial</h3>
                        <div style="overflow-y: auto; flex: 1; padding-right: 4px;">
                            <table class="glass-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th id="th-km">Km</th>
                                        <th id="th-gal">Gal</th>
                                        <th id="th-cost">$$$</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="fuel-list"></tbody>
                            </table>
                        </div>
                    </div>
                `;
                break;
        }
        this.dom.toolContent.innerHTML = content;

        // Initialize logic after DOM injection
        const tool = this.tools.find(t => t.id === toolId);
        if (tool && tool.init) tool.init();
    },

    // Specific Logic for each tool
    toolsLogic: {
        notes: {
            init() {
                const area = document.getElementById('notes-area');
                const status = document.getElementById('save-status');

                // Load saved
                area.value = localStorage.getItem('pt_notes_content') || '';

                // Auto-save
                area.addEventListener('input', () => {
                    localStorage.setItem('pt_notes_content', area.value);
                    status.textContent = 'Guardando...';
                    setTimeout(() => status.textContent = 'Guardado', 500);
                });
            }
        },
        counter: {
            init() {
                const display = document.getElementById('counter-value');
                let count = parseInt(localStorage.getItem('pt_counter_val') || '0');

                const update = (val) => {
                    count = val;
                    display.innerText = count;
                    display.style.transform = 'scale(1.2)';
                    setTimeout(() => display.style.transform = 'scale(1)', 150);
                    localStorage.setItem('pt_counter_val', count);
                };

                update(count); // Init display

                document.getElementById('btn-dec').onclick = () => update(count - 1);
                document.getElementById('btn-inc').onclick = () => update(count + 1);
                document.getElementById('btn-reset').onclick = () => update(0);
            }
        },
        password: {
            init() {
                const display = document.getElementById('pass-display');
                const lengthSlider = document.getElementById('pass-length');
                const lenVal = document.getElementById('len-val');
                const btn = document.getElementById('generate-btn');

                const getOptions = () => ({
                    length: parseInt(lengthSlider.value),
                    caps: document.getElementById('use-caps').checked,
                    nums: document.getElementById('use-nums').checked,
                    syms: document.getElementById('use-syms').checked
                });

                const generate = () => {
                    const opts = getOptions();
                    let charSet = 'abcdefghijklmnopqrstuvwxyz';
                    if (opts.caps) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    if (opts.nums) charSet += '0123456789';
                    if (opts.syms) charSet += '!@#$%^&*()_+-=[]{}|;:,.<>?';

                    let pass = '';
                    for (let i = 0; i < opts.length; i++) {
                        pass += charSet.charAt(Math.floor(Math.random() * charSet.length));
                    }
                    display.textContent = pass;
                };

                lengthSlider.oninput = () => {
                    lenVal.textContent = lengthSlider.value;
                };

                btn.onclick = generate;
                generate(); // Generate one on load
            }
        },
        todo: {
            init() {
                const input = document.getElementById('todo-input');
                const addBtn = document.getElementById('todo-add');
                const list = document.getElementById('todo-list');

                let todos = JSON.parse(localStorage.getItem('pt_todos') || '[]');

                const render = () => {
                    list.innerHTML = todos.map((t, index) => `
                        <li style="background: rgba(255,255,255,0.05); padding: 12px; margin-bottom: 8px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                            <span style="text-decoration: ${t.done ? 'line-through' : 'none'}; opacity: ${t.done ? 0.5 : 1}; cursor: pointer;" onclick="app.toolsLogic.todo.toggle(${index})">
                                ${t.text}
                            </span>
                            <button onclick="app.toolsLogic.todo.remove(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer;">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    `).join('');
                };

                const add = () => {
                    if (!input.value.trim()) return;
                    todos.push({ text: input.value, done: false });
                    save();
                    input.value = '';
                    render();
                };

                const save = () => {
                    localStorage.setItem('pt_todos', JSON.stringify(todos));
                };

                // Expose helper methods to tool object
                this.toggle = (index) => {
                    todos[index].done = !todos[index].done;
                    save();
                    render();
                };

                this.remove = (index) => {
                    todos.splice(index, 1);
                    save();
                    render();
                };

                addBtn.onclick = add;
                input.onkeypress = (e) => { if (e.key === 'Enter') add(); };

                render();
            }
        },
        converter: {
            init() {
                const typeSelect = document.getElementById('conv-type');
                const boxA = document.getElementById('input-a');
                const boxB = document.getElementById('input-b');
                const lblA = document.getElementById('label-a');
                const lblB = document.getElementById('label-b');

                const types = {
                    length: { a: 'Metros', b: 'Pies', factor: 3.28084 },
                    weight: { a: 'Kg', b: 'Lb', factor: 2.20462 },
                    temp: { a: '°C', b: '°F', isTemp: true }
                };

                const updateLabels = () => {
                    const t = types[typeSelect.value];
                    lblA.textContent = t.a;
                    lblB.textContent = t.b;
                    boxA.value = '';
                    boxB.value = '';
                };

                const convert = (source) => {
                    const t = types[typeSelect.value];
                    const valA = parseFloat(boxA.value);
                    const valB = parseFloat(boxB.value);

                    if (source === 'a') {
                        if (isNaN(valA)) return boxB.value = '';
                        if (t.isTemp) {
                            boxB.value = (valA * 9 / 5 + 32).toFixed(2);
                        } else {
                            boxB.value = (valA * t.factor).toFixed(2);
                        }
                    } else {
                        if (isNaN(valB)) return boxA.value = '';
                        if (t.isTemp) {
                            boxA.value = ((valB - 32) * 5 / 9).toFixed(2);
                        } else {
                            boxA.value = (valB / t.factor).toFixed(2);
                        }
                    }
                };

                typeSelect.onchange = updateLabels;
                boxA.oninput = () => convert('a');
                boxB.oninput = () => convert('b');
            }
        },
        fuel: {
            init() {
                const dateInput = document.getElementById('fuel-date');
                const distInput = document.getElementById('fuel-dist');
                const galInput = document.getElementById('fuel-gal');
                const costInput = document.getElementById('fuel-cost');
                const addBtn = document.getElementById('fuel-add-btn');
                const list = document.getElementById('fuel-list');

                const thKm = document.getElementById('th-km');
                const thGal = document.getElementById('th-gal');
                const thCost = document.getElementById('th-cost');

                // Helper to get Bogota ISO string for input
                const setNowBogota = () => {
                    const now = new Date();
                    // Use sv-SE for YYYY-MM-DD HH:MM:SS format then replace space with T
                    const bogotaStr = now.toLocaleString('sv-SE', { timeZone: 'America/Bogota' }).replace(' ', 'T');
                    dateInput.value = bogotaStr;
                };

                // Set default date to now (Bogota)
                setNowBogota();

                let logs = JSON.parse(localStorage.getItem('pt_fuel_logs') || '[]');

                const render = () => {
                    // Sort by date desc
                    logs.sort((a, b) => new Date(b.date) - new Date(a.date));

                    let totalCost = 0;
                    let totalDist = 0;
                    let totalGal = 0;

                    list.innerHTML = logs.map((log, index) => {
                        totalCost += parseFloat(log.cost || 0);
                        totalDist += parseFloat(log.dist || 0);
                        totalGal += parseFloat(log.gal || 0);

                        const dateObj = new Date(log.date);

                        const dateStr = dateObj.toLocaleString('es-CO', {
                            timeZone: 'America/Bogota',
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });

                        return `
                        <tr>
                            <td style="font-size: 0.8rem;">${dateStr}</td>
                            <td>${log.dist}</td>
                            <td>${log.gal}</td>
                            <td>$${parseFloat(log.cost).toLocaleString()}</td>
                            <td style="text-align: right;">
                                <button class="delete-btn-sm" onclick="app.toolsLogic.fuel.remove(${index})">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                       `;
                    }).join('');

                    if (logs.length > 0) {
                        thKm.innerHTML = `Km<div style="font-size:0.8rem; color:var(--primary-color)">${totalDist.toLocaleString()}</div>`;
                        thGal.innerHTML = `Gal<div style="font-size:0.8rem; color:var(--primary-color)">${totalGal.toLocaleString()}</div>`;
                        thCost.innerHTML = `$$$<div style="font-size:0.8rem; color:var(--primary-color)">$${totalCost.toLocaleString()}</div>`;
                    } else {
                        thKm.textContent = 'Km';
                        thGal.textContent = 'Gal';
                        thCost.textContent = '$$$';
                        list.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">Sin registros</td></tr>';
                    }
                };

                const add = () => {
                    const date = dateInput.value;
                    const dist = distInput.value;
                    const gal = galInput.value;
                    const cost = costInput.value;

                    if (!date || !dist || !gal || !cost) {
                        alert('Por favor completa todos los campos');
                        return;
                    }

                    logs.push({
                        date,
                        dist: parseFloat(dist),
                        gal: parseFloat(gal),
                        cost: parseFloat(cost)
                    });

                    save();

                    // Clear inputs but refresh date to now
                    distInput.value = '';
                    galInput.value = '';
                    costInput.value = '';
                    setNowBogota();

                    render();
                };

                const save = () => {
                    localStorage.setItem('pt_fuel_logs', JSON.stringify(logs));
                };

                this.remove = (index) => {
                    if (confirm('¿Borrar registro?')) {
                        logs.splice(index, 1);
                        save();
                        render();
                    }
                };

                addBtn.onclick = add;
                render();
            }
        }
    }
};

// Expose app globally for inline onclick handlers
window.app = app;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

