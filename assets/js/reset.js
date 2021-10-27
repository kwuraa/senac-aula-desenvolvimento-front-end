function resetLocalStorageItem(itemChave) {
    localStorage.removeItem(itemChave);
}

    const local = window.location.pathname
    .split("/")
    .filter((el) => el.includes(".html"))
    .map((el) => el.split('.')[0])[0];

    if (local !== "login") {
        resetLocalStorageItem("formEmail");
    }



