const rateLimit = (options = {}) => {
    const { interval = 60 * 1000, limit = 5 } = options;
    const tokens = new Map();

    return {
        check(ip) {
            const now = Date.now();
            const record = tokens.get(ip) || { count: 0, start: now };

            if (now - record.start > interval) {
                record.count = 0;
                record.start = now;
            }

            record.count++;
            tokens.set(ip, record);

            // Prune old entries periodically
            if (tokens.size > 10000) {
                for (const [key, val] of tokens) {
                    if (now - val.start > interval) tokens.delete(key);
                }
            }

            return record.count <= limit;
        },
    };
};

export const newsletterLimiter = rateLimit({ interval: 60 * 1000, limit: 3 });
export const affiliateLimiter = rateLimit({ interval: 60 * 1000, limit: 3 });
