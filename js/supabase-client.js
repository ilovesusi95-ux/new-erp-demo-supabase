// ==================== Supabase 客户端初始化 ====================

const SUPABASE_URL = 'https://ogyzaldhglcbeymzuzkg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_k_B3x1nETcVc6sVaaJuVjQ_0DQAVMgj...';

// 初始化 Supabase 客户端
let supabaseClient = null;

try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('%c[Supabase] 客户端初始化成功', 'color: #22c55e');
} catch (error) {
    console.error('[Supabase] 初始化失败:', error);
}

// 暴露给全局，方便其他文件使用
window.supabase = supabaseClient;

// 帮助函数：检查 Supabase 连接状态
window.checkSupabaseConnection = async function() {
    if (!supabaseClient) {
        console.error('[Supabase] 客户端未初始化');
        return false;
    }
    
    try {
        const { data, error } = await supabaseClient.from('inventory').select('count').limit(1);
        if (error) {
            console.warn('[Supabase] 连接测试失败 (table may not exist yet):', error.message);
            return false;
        }
        console.log('%c[Supabase] 连接测试成功', 'color: #22c55e');
        return true;
    } catch (err) {
        console.error('[Supabase] 连接测试出错:', err);
        return false;
    }
};

console.log('%c[Supabase] supabase-client.js 加载完成', 'color: #3b82f6');