export const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
};

export function convertToAMPM(time) {
    const date = new Date(`2000-01-01T${time}`);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
}

export function timeNow() {
    const time = new Date();
    const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
    const timeString = time.toLocaleTimeString('en-US', timeOptions);

    return timeString;
}


export function dateNow() {
    const dateNow = new Date().toISOString().split('T')[0]

    return dateNow;
}


export const dataURItoBlob = (dataURI) => {
    // Convert base64 data URI to Blob
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
};

export function formatPrice(price) {
    return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
