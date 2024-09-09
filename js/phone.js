const loadPhone = async (searchText, isShowall) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhone(phones, isShowall)
}

const displayPhone = (phones, isShowall) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = ''
    console.log(phones.length);
    // if more than 12 phone 
    const showallContainer = document.getElementById('showall-container');
    if (phones.length > 12) {
        showallContainer.classList.remove('hidden')
    }
    else {
        showallContainer.classList.add('hidden')
    }
    // display only first 10 phone 
    if (!isShowall) {
        phones = phones.slice(0, 12)
    }




    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100  shadow-xl`
        phoneCard.innerHTML = `
            <figure>
                    <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                    <button onclick = "handleShowDetail('${phone.slug}')" class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(phoneCard)
    })
    toggleLoading(false)
}

const handelsearchbtn = (isShowall) => {
    toggleLoading(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowall)
}

const toggleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowall = () => {
    handelsearchbtn(true)
}



const handleShowDetail = async (id) => {
    console.log(id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img class=" justify-center mt-4" src="${phone.image}" alt="">
        <p><span class="text-2xl font-bold">Storage :</span> ${phone.mainFeatures?.storage}</p>
        <p><span class="text-2xl font-bold">cheapset :</span>${ phone.mainFeatures?.chipSet}</p>
        <p><span class="text-2xl font-bold">Memory :</span>${phone.mainFeatures?.memory}</p>
        <p><span class="text-2xl font-bold">ReleaseDate :</span>${phone.releaseDate}</p>
    `
    // show the modal
    show_detail_modal.showModal()
}


loadPhone()