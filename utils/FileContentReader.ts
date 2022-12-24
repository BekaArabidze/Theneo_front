
export const fileContentReader = (fileInput: any): Promise<string> => new Promise((resolve, reject) => {

    const file = fileInput.target && fileInput.target.files?.[0]

    if (!file) {
        reject();
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result as string);
    };

    reader.readAsText(file);

})
