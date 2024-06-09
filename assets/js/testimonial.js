const TestimonialData = [
    {
        image: "https://asset.kompas.com/crops/JCvuBix37DBHN8ibTuHvgRU5xyo=/0x0:0x0/750x500/data/photo/2023/10/10/65256dba7c36e.jpeg",
        content: "Politik adalah jalan ninja kita",
        author: "Kaesang Pangarep",
        rating: 5
    },
    {
        image: "https://akcdn.detik.net.id/visual/2018/03/25/9430a500-d409-4c08-adc8-9ef6c29813bd_169.jpeg?w=650",
        content: "......... ......... ......... ......... .........",
        author: "Limbad",
        rating: 1
    },
    {
        image: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/01/2024/03/23/Cillian-Murphy-Peaky-Blinders-2581888323.jpg",
        content: "Dingin cuyyyyy",
        author: "Thomas Shelby",
        rating: 4
    },
    {
        image: "https://i.ytimg.com/vi/50FNaZeORBU/maxresdefault.jpg",
        content: "Jutaan orang bahkan tidak menyadari bahwa mereka bisa menghasilkan US$1.000 sehari tanpa meninggalkan rumah, dan Anda adalah salah satunya",
        author: "Budi Setiawan",
        rating: 3
    },
    {
        image: "https://awsimages.detik.net.id/community/media/visual/2023/10/03/elon-musk.jpeg?w=600&q=90",
        content: "Great job! Your portfolio shows impressive creativity and technical skill. Keep up the innovative work.",
        author: "Elon Musk",
        rating: 3
    },
];

function generateStars(rating) {
    let starsHtml = '';
    for (let i = 0; i < rating; i++) {
        starsHtml += '<i class="fa-sharp fa-solid fa-star fa-sm" style="color: #ff7b00;"></i>';
    }
    return starsHtml;
}

function html(item) {
    return `
      <div class="testimonial">
          <img src="${item.image}" alt="testimonial" class="profile-testimonial">
          <p class="quote">${item.content}</p>
          <p class="author">- ${item.author}</p>
          <p class="author">${generateStars(item.rating)}</p>
      </div>`;
}

function allTestimonial() {
    let testimonialHtml = ``;
    TestimonialData.forEach((item) => {
        testimonialHtml += html(item);
    });

    document.getElementById("testimonials").innerHTML = testimonialHtml;
}

allTestimonial();

function filterTestimonials(rating) {
    let testimonialHtml = ``;
    const testimonialFilter = TestimonialData.filter((item) => {
        return item.rating === rating;
    });

    if (testimonialFilter.length === 0) {
        testimonialHtml = `<h1>404 Data Not Found !</h1>`;
    } else {
        testimonialFilter.forEach((item) => {
            testimonialHtml += html(item);
        });
    }

    document.getElementById("testimonials").innerHTML = testimonialHtml;
}
