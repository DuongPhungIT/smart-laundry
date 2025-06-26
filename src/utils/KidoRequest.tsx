export const ECODE = {
    SUCCESS: 0,
    FAIL: -1,
    UNKNOWN_EXCEPTION: -1000,
    NOT_EXISTS: -1001,
    EXISTED: -1002,
    INVALID_PARAMS: -1003,
    SESSION_INVALID: -1004,
    PERMISSION_DENIED: -1005,
    NOT_SUPPORT: -1008,
    METHOD_NOT_FOUND: -1010,
    ITEM_ACCESS_DENIED: -1012,
};

export const DOMAIN = "https://sb-shop.kido.vn/api/";

const codeMessage: Record<number, string> = {
    502: "Hệ thống đang thực hiện cập nhật. Bạn vui lòng chờ xíu nhé",
    403: "Không có quyền truy cập. Vui lòng liên hệ Team IT để được hỗ trợ",
    406: "Tài khoản của bạn chưa được cấp quyền vào Ngành này. Vui lòng liên hệ team IT để được hỗ trợ",
};

// Hàm build query string từ params object
function buildQuery(params: Record<string, any>) {
    if (!params) return "";
    const esc = encodeURIComponent;
    return (
        // eslint-disable-next-line prefer-template
        "?" +
        Object.entries(params)
            .map(([k, v]) => `${esc(k)}=${esc(v)}`)
            .join("&")
    );
}

export async function request(
    url: string,
    options?: any & { showError?: boolean; params?: Record<string, any> },
) {
    try {
        let uri = `${DOMAIN}${url}`;
        // Nếu có params, nối vào url
        if (options?.params) {
            uri += buildQuery(options.params);
        }
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer 999e6d40a0948df710fd26d3878613bb",
            ...(options?.headers || {}),
        };

        const resp = await fetch(uri, {
            ...options,
            headers,
        });

        if (!resp.ok) {
            const msg = codeMessage[resp.status] || resp.statusText;
            if (options?.showError !== false) {
                console.log(msg);
            }
            throw new Error(msg);
        }
        const data = await resp.json();
        if (data.code !== ECODE.SUCCESS) {
            if (options?.showError !== false) {
                console.log(data.message || "Có lỗi xảy ra");
            }
            return null;
        }
        return data;
    } catch (error: any) {
        if (options?.showError !== false) {
            console.log(error.message || "Lỗi mạng");
        }
        return null;
    }
}
