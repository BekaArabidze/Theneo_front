const API_URL = "http://localhost:5000";

export const handleFetchData = async (formData: FormData) => {
    const res = await fetch(`${process.env.BACK_URL}/api/generate`, {
        method: 'POST',
        body: formData,
    })

    console.log(process.env)

    return res
}