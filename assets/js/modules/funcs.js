const saveData = (a, data) => {
    a.push(data[0]);
    localStorage.setItem('session', JSON.stringify(a));
document.getElementById("download-data").classList.remove("disabled");
}
const downloadFile = (content, filename, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  console.log("terminado")
}

export {saveData, downloadFile};
