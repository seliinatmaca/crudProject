// console.log("bağlandı");

//localStorage ekleme
//ocalStorage.setItem("users", "selin-1");

//localstorage alma
//console.log(localStorage.getItem("users"));

//localstorage tablosu
const localStorageKey = "users_list_4";
//eğer içi dolu ise karışma yoksa boş obje olsun
let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

function clear() {
  localStorage.clear();
}

function addUser() {
  //html kodu içinde elemanları al
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (name == "") {
    alert("username boş olamaz..");
  } else if (email == "") {
    alert("username boş olamaz..");
  } else {
    const mevcutUser = users.find((user) => user.email === email);
    if (mevcutUser) {
      mevcutUser.name = name;
    } else {
      // mevcutta kullanıcı yoksa ekle
      users.push({ name, email });
    }

    // kullanıcıdan alınan verileri locale kaydet
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  }

  // eklenen kullanıcıları ekrana yazdır
  console.log(localStorage.getItem(localStorageKey));
}

function displayUsers() {
  //listelenecek divi tanımla
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    //itemler için li objesi oluştur
    const listItem = document.createElement("li");
    listItem.innerHTML = `
         Kullanıcı Adı : ${user.name}
         <br/>
         E-Posta Adresi : ${user.email}
         <br/>
         <br/>
         <button onclick ="editUser('${user.email}')">Düzenle</button>
         <button onclick ="deleteUser('${user.email}')">Sil</button>
         <br/>
         <br/>
         
         <div>-------------------------------------------------------</div>
          `;
    userList.appendChild(listItem);
  });
}
displayUsers();

//kullanıcı düzenleme fonksiyonu
function editUser(email) {
  //daha önceden kayıtlı email kontrol
  const userToEdit = users.find((user) => user.email == email);
  if (userToEdit) {
    document.getElementById("username").value = userToEdit.name;
    document.getElementById("uemail").value = userToEdit.email;
  }
}

//kullanıcı silme fonksiyonu
function deleteUser(email) {
  users = users.filter((user) => user.email !== email);
  localStorage.setItem(localStorageKey, JSON.stringify(users));
  displayUsers();
}

function temzile() {
  //local temizle
  localStorage.clear();
}
