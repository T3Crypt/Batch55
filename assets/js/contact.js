function submitData() {
    const inputName = document.getElementById("inputName").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPhone = document.getElementById("inputPhone").value;
    const inputSubject = document.getElementById("inputSubject").value;
    const inputMessage = document.getElementById("inputMessage").value;

    // Kondisi
    if (inputName == "") {
        alert('Form nama harus diisi !');
    } else if (inputEmail == "") {
        alert('Form email harus diisi !');
    } else if (inputPhone == "") {
        alert('Form nomor telepon harus diisi !');
    } else if (inputSubject == "") {
        alert('Form subjek harus diisi !');
    } else if (inputMessage == "") {
        alert('Form pesan harus diisi !');
    } else {
        console.log(
            `Name : ${inputName}\nEmail : ${inputEmail}\nPhone : ${inputPhone}\nSubject : ${inputSubject}\nMessage : ${inputMessage}`
          );
        
        const myemail = "teguh@thx.my.id";
        let a = document.createElement("a");
        a.href = `mailto:${myemail}?subject=${inputSubject}&body=Halo, Nama saya ${inputName}, \n\n${inputMessage} \n\nHubungi saya dengan email ${inputEmail} 
        dan nomor telepon saya ${inputPhone}`;
        a.click();

    }




}