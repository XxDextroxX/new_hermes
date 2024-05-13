

export function openUserReport(from: string, to: string, username: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/process/user-report/${username}?from=${from}&to=${to}`;
    window.open(url, '_blank');
}

export function getReportAnomalies(from?: string, to?: string) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/anomalies/build-report`;
    if (from && to) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/anomalies/build-report?from=${from}&to=${to}`;
    }
    window.open(url, '_blank');
}


