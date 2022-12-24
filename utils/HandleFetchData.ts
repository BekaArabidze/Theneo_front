const API_URL = "http://localhost:5000";

export const handleFetchData = async (formData: FormData) => {
    const res = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        body: formData,
    })

    return res
}