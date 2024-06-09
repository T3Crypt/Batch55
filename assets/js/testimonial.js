// Membuat Promise menggunakan XMLHTTPRequest
const testimonial = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Membuka koneksi ke API
    xhr.open("GET", "https://api.npoint.io/7aada19d6a9708ecf81b", true);
    
    // Mengatur callback untuk onload
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject("Error Loaded Data");
      }
    };
  
    // Mengatur callback untuk onerror
    xhr.onerror = function () {
      reject("404 Not Found");
    };
  
    // Mengirim permintaan ke server
    xhr.send();
  });
  
  // Fungsi untuk menampilkan testimonial
  async function allTestimonial() {
    try {
      const response = await testimonial;
      let testimonialHtml = ``;
  
      response.forEach((item) => {
        testimonialHtml += `
          <div class="testimonial">
            <img src="${item.image}" alt="testimonial" class="profile-testimonial">
            <p class="quote">${item.content}</p>
            <p class="author">- ${item.author}</p>
            <div class="rating">${generateStars(item.rating)}</div>
          </div>`;
      });
  
      document.getElementById("testimonials").innerHTML = testimonialHtml;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Panggil fungsi untuk menampilkan testimonial
  allTestimonial();
  
  // Fungsi untuk memfilter testimonial berdasarkan rating
  async function filterTestimonials(rating) {
    try {
      const response = await testimonial;
      let testimonialHtml = ``;
  
      const dataFilter = response.filter((data) => data.rating === rating);
      if (dataFilter.length === 0) {
        testimonialHtml = `<h1> Data not found!</h1>`;
      } else {
        dataFilter.forEach((item) => {
          testimonialHtml += `
            <div class="testimonial">
              <img src="${item.image}" alt="testimonial" class="profile-testimonial">
              <p class="quote">${item.content}</p>
              <p class="author">- ${item.author}</p>
              <div class="rating">${generateStars(item.rating)}</div>
            </div>`;
        });
      }
  
      document.getElementById("testimonials").innerHTML = testimonialHtml;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Fungsi untuk menghasilkan bintang berdasarkan rating
  function generateStars(rating) {
    let starsHtml = '';
    for (let i = 0; i < rating; i++) {
      starsHtml += '<i class="fa-sharp fa-solid fa-star fa-sm" style="color: #ff7b00;"></i>';
    }
    return starsHtml;
  }
  