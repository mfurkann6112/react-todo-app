import { useState, useEffect } from 'react'
import './App.css'

function App() {
       // Todo Ürünlerim...
       // useState, useReducer, useEffeckt, useMemo bunlar birer hooks.  
       // UseState: amacı  Verileri tutmamızı sağlar.
       const [todoProduct, setTodoProduct] = useState(() => {
       const kayitliTodolar = localStorage.getItem("todoProduct");
       return kayitliTodolar ? JSON.parse(kayitliTodolar) : [];
  
  
    });

   const [newTodoText, setNewTodoText] = useState("");
   const [filterText, setFilterText] = useState("");
   const [warning, setWarning] = useState(null);  // {type: 'success' | 'danger' | 'warning', message: '...'}

   useEffect(() => { // Sayfa yüklendiğinde birşeyler yapmak istediğimizde kullanmamız gereken bir hooks.      
      localStorage.setItem("todoProduct", JSON.stringify(todoProduct));
   }, [todoProduct]); 


   // Uyarı mesajı....
   const showAlert = (type, message) => {
      setWarning({ type, message });
      setTimeout(() => {
         setWarning(null);
      }, 2500); // EKranda belirlenen mesajları belirli bir saniye sonra silinsin diye uyarı alır...
      
   };

   // Yeni Todo Ekleme...
   const todoEkle = (e) => {
      e.preventDefault();  // Sayfa yenilemesini engeller...
      const clearMetin = newTodoText.trim(); // trim ile sağdan ve soldan temizle...

      if (clearMetin === "") {
         showAlert("danger", "Lütfen bir Todo giriniz!");
         return;
      }

      const newProduct = {   // İd ve metin ile obje ekleme
         id: Date.now(),
         text: clearMetin,
      };

      setTodoProduct([...todoProduct, newProduct]);
      setNewTodoText("");
      showAlert("success", "Todo Başarıyla eklendi.");
   };

   // Todo Silme...
   const todoSil = (silinecekId) => {
   const newList = todoProduct.filter((todo) => todo.id !== silinecekId);
      setTodoProduct(newList);
      showAlert("success", "Todo silindi.");
   };

   // Tüm Todoları Temizleme...
   const tumunuTemizle = () => {
      if (todoProduct.length > 0) { // Ürünlerimin todoÜrünlerimin lengtini al 
         setTodoProduct([]);
         showAlert("success", "Tüm todolar temizlendi!");
      } else {
         showAlert("warning", "Temizlenecek todo bulunamadı.");
      }
   };
 
    // Arama kutusuna göre filtreleme...
     const filtrelenmisTodolar = todoProduct.filter((todo) =>
     todo.text.toLowerCase().includes(filterText.toLowerCase().trim())
   );



   return (
      <div className="bg-light min-vh-100 py-5">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-12 col-md-8 col-lg-6">
                  <div className="card border-0 shadow-sm rounded-4">
                     <div className="card-header bg-white border-bottom-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold text-dark mb-0">
                           <i className="fa-solid fa-list-check text-primary me-2"></i>
                           React Todo List
                        </h4>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                           {todoProduct.length} Görev
                        </span>
                     </div>

                     <div className="card-body px-4 pt-4">
                        <form onSubmit={todoEkle} className="mb-3">
                           <label className="form-label text-secondary small fw-medium">
                              Yeni Görev
                           </label>
                           <div className="input-group">
                              <span className="input-group-text bg-light border-end-0 text-muted">
                                 <i className="fa-solid fa-plus"></i>
                              </span>
                              <input
                                 type="text"
                                 className="form-control bg-light border-start-0 ps-0 shadow-none"
                                 placeholder="Ne yapılması gerekiyor?"
                                 value={newTodoText}
                                 onChange={(e) => setNewTodoText(e.target.value)}
                              />
                              <button type="submit" className="btn btn-primary px-3 fw-medium">
                                 Ekle
                              </button>
                           </div>
                        </form>

                        {warning && (
                           <div className={`alert alert-${warning.type} py-2 small`} role="alert">
                              {warning.message}
                           </div>
                        )}

                        <hr className="text-black-50 my-4 opacity-25" />

                        <div className="mb-3">
                           <div className="input-group">
                              <span className="input-group-text bg-light border-end-0 text-muted">
                                 <i className="fa-solid fa-magnifying-glass"></i>
                              </span>
                              <input
                                 type="text"
                                 className="form-control bg-light border-start-0 ps-0 shadow-none"
                                 placeholder="Görevlerde ara..."
                                 value={filterText}
                                 onChange={(e) => setFilterText(e.target.value)}
                              />
                           </div>
                        </div>

                        <ul className="list-group list-group-flush mb-4">
                           {filtrelenmisTodolar.length > 0 ? (
                              filtrelenmisTodolar.map((todo) => (
                                 <li
                                    key={todo.id}
                                    className="list-group-item d-flex justify-content-between align-items-center p-3 mb-2 border rounded-3"
                                 >
                                    <span className="text-dark">{todo.text}</span>
                                    <button
                                       onClick={() => todoSil(todo.id)}
                                       className="btn btn-link text-danger p-0 text-decoration-none"
                                       title="Sil"
                                    >
                                       <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                 </li>
                              ))
                           ) : (
                              <li className="list-group-item text-center text-muted small border-0 py-3">
                                 Gösterilecek görev bulunamadı.
                              </li>
                           )}
                        </ul>

                        <div className="d-grid">
                           <button
                              type="button"
                              onClick={tumunuTemizle}
                              className="btn btn-outline-danger btn-sm py-2 fw-medium"
                           >
                              <i className="fa-regular fa-trash-can me-1"></i> Tüm Todoları Temizle
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;