// ==================== 系统启动文件 ====================

function showSection(section) {
    // 隐藏所有 section
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    
    // 显示目标 section
    const target = document.getElementById(section);
    if (target) target.classList.remove('hidden');

    // 移除所有 nav 激活状态
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('nav-active'));
    
    // 激活对应 nav（如果存在）
    const nav = document.getElementById('nav-' + section);
    if (nav) nav.classList.add('nav-active');

    // ==================== 自动调用对应模块的渲染函数 ====================
    
    if (section === 'certificates' && typeof window.renderCertificates === 'function') {
        window.renderCertificates();
    }
    if (section === 'manufacturers' && typeof window.renderManufacturers === 'function') {
        window.renderManufacturers();
    }
    if (section === 'models' && typeof window.renderModels === 'function') {
        window.renderModels();
    }
    if (section === 'billing-companies' && typeof window.renderBillingCompanies === 'function') {
        window.renderBillingCompanies();
    }
    if (section === 'customers' && typeof window.renderCustomers === 'function') {
        window.renderCustomers();
    }

    if (section === 'salespersons' && typeof window.renderSalespersons === 'function') {
        window.renderSalespersons();
    }

    if (section === 'test-module' && typeof window.renderTestModule === 'function') {
        window.renderTestModule();
    }

    if (section === 'purchase-inbound' && typeof window.renderPurchaseInbound === 'function') {
        window.renderPurchaseInbound();
    }
    if (section === 'other-inbound' && typeof window.renderOtherInbound === 'function') {
        window.renderOtherInbound();
    }

    if (section === 'outbound' && typeof window.renderOutbound === 'function') {
        window.renderOutbound();
    }
    if (section === 'sales-outbound' && typeof window.renderSalesOutbound === 'function') {
        window.renderSalesOutbound();
    }
    if (section === 'other-outbound' && typeof window.renderOtherOutbound === 'function') {
        window.renderOtherOutbound();
    }

    if (section === 'inventory' && typeof window.renderInventory === 'function') {
        window.renderInventory();
    }

    if (section === 'order-contract' && typeof window.renderOrderContract === 'function') {
        window.renderOrderContract();
    }
}

// 出库管理页面（两个大卡片）
function renderOutbound() {
    const container = document.getElementById('outbound');
    if (!container) return;

    container.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">出库管理</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onclick="showSection('sales-outbound')" class="bg-white border border-dashed border-sky-300 hover:border-sky-500 rounded-2xl p-8 cursor-pointer flex flex-col items-center justify-center transition-colors">
                <div class="text-5xl mb-4">🛍️</div>
                <div class="text-xl font-semibold text-sky-600">销售出库</div>
                <div class="text-sm text-slate-500 mt-2">创建销售出库单据</div>
            </div>
            <div onclick="showSection('other-outbound')" class="bg-white border border-dashed border-slate-300 hover:border-slate-500 rounded-2xl p-8 cursor-pointer flex flex-col items-center justify-center transition-colors">
                <div class="text-5xl mb-4">📦</div>
                <div class="text-xl font-semibold">其他出库</div>
                <div class="text-sm text-slate-500 mt-2">创建其他出库单据</div>
            </div>
        </div>
    `;
}

function initERP() {
    if (typeof loadData === 'function') {
        loadData();
    }

    console.log('%c[new-erp-demo] 系经初始化完成', 'color:#0ea5e9');
    showSection('inventory');   // 修改为 inventory，因为 products 模块已删除
}

window.onload = initERP;