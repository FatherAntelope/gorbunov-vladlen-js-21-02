function fileConvertToBase64(fileImg) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileImg);
        reader.onload = () => resolve(reader.result.replace(/^.*,/, ''));
        reader.onerror = reject;
    });
}

export {fileConvertToBase64};