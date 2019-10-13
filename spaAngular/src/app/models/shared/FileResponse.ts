export interface FileResponse<Blob> {
    success: boolean;
    payload: Blob;
    error: string;
}
