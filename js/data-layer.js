// ==================== 数据层 (Data Layer) ====================
// 统一管理所有模块的小账本
// 每个模块有自己的独立数据（小账本），数据层负责统一存储和提供操作方法

// 初始化全局 data 对象（所有小账本都在这里）
if (typeof window.data === 'undefined') {
    window.data = {
        products: [],
        inventory: [],
        salesOrders: [],
        certificates: [],           // 注册证模块的小账本
        manufacturers: [],          // 生产企业模块的小账本
        models: [],                 // 规格型号模块的小账本

        // 入库管理模块的两个独立小账本
        purchaseInboundOrders: [],  // 采购入库小账本
        otherInboundOrders: [],     // 其他入库小账本

        // 出库管理模块的小账本
        salesOutboundOrders: [],    // 销售出库小账本
        otherOutboundOrders: [],    // 其他出库小账本（预留）

        // 开票企业管理模块的小账本
        billingCompanies: [],       // 开票企业小账本

        // 客户管理模块的小账本
        customers: [],              // 客户小账本

        // 新增：销售人员管理小账本
        salespersons: [],           // 销售人员小账本

        // 新增：订货合同模块的小账本
        orderContracts: []          // 订货合同小账本
    };
}

function saveData() {
    localStorage.setItem('erp_demo_data', JSON.stringify(window.data));
}

function loadData() {
    const saved = localStorage.getItem('erp_demo_data');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // 合并数据，防止新加的字段被覆盖
            Object.keys(window.data).forEach(key => {
                if (parsed[key] && Array.isArray(parsed[key])) {
                    window.data[key] = parsed[key];
                }
            });
        } catch (e) {
            console.error('[DataLayer] 加载数据失败:', e);
        }
    }
}

// ==================== 库存相关公共方法 ====================

/**
 * 获取当前有库存的商品列表
 * 供销售出库等模块使用
 * 已改为默认强制重新计算，解决出库后库存不刷新的问题
 */
function getCurrentInventory(forceRecalculate = true) {
    // 默认总是重新计算（保证销售出库添加产品时看到的是最新库存）
    if (typeof window.calculateInventory === 'function') {
        return window.calculateInventory();
    }

    console.warn('[DataLayer] 无法获取库存数据，请确保已加载 inventory.js');
    return [];
}

// ==================== 常用操作封装（推荐新代码使用） ====================
window.DataLayer = {
    // 保存数据
    save: function() {
        saveData();
    },

    // 获取某个小账本的数据
    getLedger: function(name) {
        return window.data[name] || [];
    },

    // 添加一条记录到指定小账本
    addItem: function(ledgerName, item) {
        if (!window.data[ledgerName]) {
            window.data[ledgerName] = [];
        }
        window.data[ledgerName].push(item);
        saveData();
        return item;
    },

    // 更新某条记录
    updateItem: function(ledgerName, index, newItem) {
        if (window.data[ledgerName] && window.data[ledgerName][index]) {
            window.data[ledgerName][index] = { ...window.data[ledgerName][index], ...newItem };
            saveData();
        }
    },

    // 删除某条记录
    deleteItem: function(ledgerName, index) {
        if (window.data[ledgerName] && index >= 0) {
            window.data[ledgerName].splice(index, 1);
            saveData();
        }
    },

    // 获取完整数据（调试用）
    getAllData: function() {
        return window.data;
    },

    // 获取当前库存数据（供销售出库使用）
    getCurrentInventory: getCurrentInventory
};

// 为了兼容旧代码，保留全局的 saveData 和 loadData
function exposeGlobalFunctions() {
    window.saveData = saveData;
    window.loadData = loadData;
}
exposeGlobalFunctions();

console.log('%c[DataLayer] 数据层初始化完成（已封装常用操作，已修复库存缓存问题，已新增销售人员小账本、订货合同小账本）', 'color:#22c55e');