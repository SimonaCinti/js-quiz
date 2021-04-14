saveCategory = (e) =>{
    let category = document.getElementById("category").value;
    console.log(category);
    JSON.stringify(localStorage.setItem('category', category));
}