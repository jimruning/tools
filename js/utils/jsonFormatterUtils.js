export function analyzeJSON(obj, stats = { objects: 0, arrays: 0 }) {
    if (Array.isArray(obj)) {
        stats.arrays += 1;
        for (const item of obj) {
            analyzeJSON(item, stats);
        }
    } else if (obj !== null && typeof obj === 'object') {
        stats.objects += 1;
        for (const value of Object.values(obj)) {
            analyzeJSON(value, stats);
        }
    }
    return stats;
}

export function sortObjectKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => sortObjectKeys(item));
    }

    if (obj !== null && typeof obj === 'object') {
        const sorted = {};
        for (const key of Object.keys(obj).sort()) {
            sorted[key] = sortObjectKeys(obj[key]);
        }
        return sorted;
    }

    return obj;
}
